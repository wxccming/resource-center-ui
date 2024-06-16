// import * as liGlobe from "../lib";
import { getTestData } from "./realTimePathTestData";
import { creatWebSocket, closeWebSocket } from "@/utils/websocket";
function testRealTimePath(map) {
  let realTimePath = new liGlobe.RealTimePath(map, {
    // defaultView: {//默认初始视角
    //     // position: [119.02055955096634, 33.11658003273969, 821319.9589410495]
    // }
    clickEvent: ((item) => {
      let taskIdMsg = {
          nowTaskId: item.taskId,
          historyTaskId: ''
      }
      creatWebSocket(taskIdMsg)
      // console.log('无人机任务id',item)//返回值为飞机信息
  }),
      timeout: 2 * 30 * 1000
  });
  // window.realTimePath = realTimePath//用于控制台测试
  //模拟websocket推送
  // getTestData().then((data)=>{
  //     realTimePath.start(data)
  //     //realTimePath.destroy()//移除所有飞机和监听事件
  // })
  let testInterval = setInterval(() => {
    getTestData().then((data) => {
      console.log('无人机数据',JSON.stringify(data))
      if (!data){
        clearInterval(testInterval);
        return;
      } 
      if (data.length !== 0) {
        realTimePath.start(data);
      } else {
        clearInterval(testInterval);
      }
    });
    // console.log(realTimePath.getRealTimeData())
  }, 3000);
}
export { testRealTimePath };
