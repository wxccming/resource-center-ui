import {getOnLineUav} from "@/api";

const timestampToTime = (timestamp, type) => {
    if (!timestamp || timestamp === null) {
        return ""
    }
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-'
    let M =
        (date.getMonth() + 1 < 10 ?
            '0' + (date.getMonth() + 1) :
            date.getMonth() + 1) + '-'
    let D =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
    let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    let returnStr = ""
    switch (type) {
        case "day":
            returnStr = (Y + M + D);
            break;
        default:
            returnStr = (Y + M + D + h + m + s);
    }
    return returnStr
};
let testTime = new Date("2022-01-04 10:06:39").getTime()
let testObj = {
    "deviceCode": "LYGGY001-1",
    "jd": "117.36402325723367",
    "wd": "34.11583869177316",
    "flightDuration": "0.63",
    "alt": "113.19999694824219",
    "rtk": "0414",
    "cradleAngle": "60.00",
    "uavDirection": "东南方向",
    "speed": "23.80",
    "power": "33",
    "isBlack": "0",
    "taskId": "adfadf2342412a213",
    "createTime": "2022-01-04 10:06:39",
    "isOnline": null
}
let testData = {
    "success": "true",
    "errorCode": "0000",
    "msg": null,
    "data": []
}
//i可以决定模拟的飞机数量
/*for (let i = 0; i < 1; i++) {
    testData.data.push({
        "deviceCode": testObj.deviceCode + i,
        "jd": parseFloat(testObj.jd) + 0.00001 * i,
        "wd": parseFloat(testObj.wd) + 0.00001 * i,
        "flightDuration": "0.63",
        "alt": parseFloat(testObj.alt),
        "rtk": "0414",
        "cradleAngle": "60.00",
        "uavDirection": "东南方向",
        "speed": "23.80",
        "power": "33",
        "isBlack": "0",
        "taskId": "adfadf2342412a213",
        "createTime": timestampToTime(testTime + 10000 * i),
        "isOnline": null
    })
    testTime = (testTime + 10000 * i)
}*/
async function getTestData() {
    let data = []
    let res = await getOnLineUav()
    let onLineUAVList = res.data
    if(onLineUAVList.length == 0){
        return
    }
    onLineUAVList.forEach((element, index) => {
        let newData = {
            "deviceCode": element.flightController,
            "jd": parseFloat(element.lng),
            "wd": parseFloat(element.lat),
            "alt": parseFloat(element.alt) + 1,
            "taskId": element.taskId,
            "createTime": timestampToTime(new Date(element.createTime).getTime() + 10000),
        }
        data.push(newData)
    })
    // console.log('无人机数据',data);
    return data
}
export {
    getTestData
}
