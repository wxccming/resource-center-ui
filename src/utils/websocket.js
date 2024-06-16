// import {useWebsocketStore} from '@/store/modules/websocket'
import store from "@/store";
import storage from "@/utils/storage";

/**
 * websocket
 */
const USERINFO = storage.get("userMsg");
let loginName = USERINFO ? USERINFO.loginName : "";
// debugger
let wsUrl = `ws://${window.wsUrl}/flyMonitor/webSocket/web/${USERINFO.userId}`;
// let wsUrl = `ws://192.168.10.100:10030/flyMonitor/webSocket/web/${USERINFO.userId}`;
let websocket; // 用于存储实例化后websocket
let isConnect = false; // 连接标识 避免重复连接
let rec; // 断线重连后，延迟5秒重新创建WebSocket连接  rec用来存储延迟请求的代码
let heartTime; // 心跳计时器
let sendTaskIdMsg = null;

function creatWebSocket(taskIdMsg) {
  return
  sendTaskIdMsg = taskIdMsg;
  storage.remove("WEBSOCKET_DATA");
  console.log("websocket==================");
  // 判断当前浏览器是否支持WebSocket
  if ("WebSocket" in window) {
    console.log("当前浏览器 windows");
  } else if ("MozWebSocket" in window) {
    console.log("当前浏览器 windows");
  } else {
    console.log("当前浏览器 Not support websocket");
  }
  if (!websocket) {
    try {
      initWebSocket(); // 初始化websocket连接
    } catch (e) {
      console.log("尝试创建连接失败");
      reConnect(); // 如果无法连接上 webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
    }
  } else {
    if (sendTaskIdMsg) websocketsend(sendTaskIdMsg);
  }
}

// 初始化websocket
function initWebSocket() {
  // wsUrl = wsUrl.replace("https", "ws").replace("http", "ws");
  // console.log('wsUrl',wsUrl)
  websocket = new WebSocket(wsUrl);
  console.log("websocket:", websocket);

  websocket.onopen = function (e) {
    websocketOpen(e);
    console.log("websocket.onopen======taskIdMsg", sendTaskIdMsg);
    if (sendTaskIdMsg) websocketsend(sendTaskIdMsg);
  };

  // 接收
  websocket.onmessage = function (e) {
    websocketonmessage(e);
  };

  // 连接发生错误
  websocket.onerror = function () {
    console.log("WebSocket连接发生错误");
    // isConnect = false; // 连接断开修改标识
    // reConnect(); // 连接错误 需要重连
  };

  websocket.onclose = function (e) {
    websocketclose(e);
  };
}

// 定义重连函数
let reConnect = () => {
  console.log("尝试重新连接");
  if (isConnect) return; // 如果已经连上就不在重连了
  rec && clearTimeout(rec);
  rec = setTimeout(function () {
    // 延迟5秒重连  避免过多次过频繁请求重连
    creatWebSocket(sendTaskIdMsg);
  }, 5000);
};

// 心跳检测
function heartbeat() {
  heartTime && clearInterval(heartTime);
  // console.log('开启心跳******')
  heartTime = setInterval(function () {
    // 这里发送一个心跳，后端收到后，返回一个心跳消息，
    if (websocket.readyState === 1) {
      // 如果连接正常
      // websocketsend('发送维持连接消息！')
      // console.log('发送维持连接消息！')
    } else {
      // 否则重连
      isConnect = false; // 连接断开修改标识
      reConnect(); // 连接错误 需要重连
    }
  }, 30 * 1000);
}

// 接收消息之后 重置心跳
function resetHeart() {
  // 清除时间
  clearInterval(heartTime);
  // 重启心跳
  heartbeat();
}
// 创建连接
function websocketOpen(e) {
  console.log("连接成功");
  heartbeat(); // 心跳检测重置
}
// 数据接收
function websocketonmessage(e) {
  resetHeart();
  if (!e.data.includes("连接成功")) {
    console.log("*******websocket接收消息*******");
    let data = JSON.parse(e.data);
    // let data = e.data
    console.log(data);
    // store.dispatch('websocket/setWebsocket', data)
    // store.state.websocket.websocketData = data;
    store.commit("websocket/setWebsocketData", data);
    // console.log(store);
    // console.log(store.state.websocket.websocketData);
  }
}
// 关闭
function websocketclose(e) {
  console.log(e);
  isConnect = false; // 断开后修改标识
  storage.remove("WEBSOCKET_DATA");
  console.log("connection closed (" + e.code + ")");
}

// 数据发送
function websocketsend(data) {
  console.log("发送的数据", data, JSON.stringify(data));
  websocket.send(JSON.stringify(data));
}

// 实际调用的方法==============

// 关闭
let closeWebSocket = () => {
  if (websocket) websocket.close();
};

export { creatWebSocket, closeWebSocket };
