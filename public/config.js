window.mapLogin = false;
// 地图初始加载
// .login("0413d18de7a2340798eee491de19508a", "8f0b81588c7c34c18b4db50f602d223d")
// SGMap.tokenTask
//   .login("6dcecc592b233f2abfda68477f739ab4", "35fcab2c88503c669974e53ce9eef70e")
//   .then(function () {
//     // 初始化插件
//     SGMap.plugin(["SGMap.DistrictTask"]).then(function () {
//       window.mapLogin = true;
//     })
//   });
window.wsUrl = `10.10.100.193:10200`;
// window.mapdyUrl = "http://192.168.20.68/map/"
window.mapdyUrl = "http://192.168.10.9/map"
// window.pointCloud = `http://192.168.10.173:11886/mapUrl/pointcloudFile/pointcloud/linedata/cesium/cesium/tileset.json`;
window.pointCloud = `http://pluto/pluto/cesium/tileset.json`;
window.warnCoord = [
    {
        id: 1,
        pointType: 'defect',
        lng: 102.86705775557455,
        lat: 27.024693468465635,
        alt: 906.3816621540382,
        warnName: "边坡1",
        warnType: "渗漏",
        idea: "请尽快维修",
        thisImg:"1_1_8.png",
        thisImgTime:"2024-02-04",
        historyImg:"1_2_8.png",
        historyImgTime:"2024-01-04"
    },
    {
        id: 2,
        pointType: 'defect',
        lng: 102.86731421591864,
        lat: 27.02518234312414,
        alt: 870.4189148801395,
        warnName: "边坡2",
        warnType: "崩塌",
        idea: "请尽快查看",
        thisImg:"1_2_2.jpg",
        thisImgTime:"2024-02-04",
        historyImg:"1_1_2.jpg",
        historyImgTime:"2024-01-04"
    },
    {
        id: 3,
        pointType: 'defect',
        lng: 102.86871634547151,
        lat: 27.023527156791687,
        alt: 850.4692735805282,
        warnName: "边坡3",
        warnType: "异物",
        idea: "请尽快查看",
        thisImg:"1_2_3.jpg",
        thisImgTime:"2024-03-04",
        historyImg:"1_1_3.jpg",
        historyImgTime:"2024-02-01"
    },
    {
        id: 4,
        pointType: 'defect',
        lng: 102.86790306786477,
        lat: 27.024229418388654,
        alt: 871.0718126395747,
        warnName: "边坡4",
        warnType: "形变",
        idea: "请尽快查看",
        thisImg:"1_2_4.jpg",
        thisImgTime:"2024-03-01",
        historyImg:"1_1_4.jpg",
        historyImgTime:"2024-02-14"
    },
    {
        id: 5,
        pointType: 'defect',
        lng: 102.87039568630858,
        lat: 27.04070408821747,
        alt: 835.4141137510517,
        warnName: "构筑物1",
        warnType: "裂缝",
        idea: "请尽快查看",
        thisImg:"1_2_6.png",
        thisImgTime:"2024-03-02",
        historyImg:"1_1_6.png",
        historyImgTime:"2024-02-05"
    },
    {
        id: 6,
        pointType: 'defect',
        lng: 102.87034721738645,
        lat: 27.021832955501466,
        alt: 812.1489076104624,
        warnName: "构筑物2",
        warnType: "渗漏",
        idea: "请尽快查看",
        thisImg:"1_2_1.png",
        thisImgTime:"2024-02-24",
        historyImg:"1_1_1.png",
        historyImgTime:"2024-01-14"
    },
    {
        id: 7,
        pointType: 'defect',
        lng: 102.86327957130936,
        lat: 27.033594739584842,
        alt: 833.6596932931071,
        warnName: "构筑物3",
        warnType: "异物",
        idea: "请尽快查看",
        thisImg:"1_2_4.jpg",
        thisImgTime:"2024-02-14",
        historyImg:"1_1_4.jpg",
        historyImgTime:"2024-01-16"
    },
];
window.machineCoord = {
    name: '机巢',
    pointType: 'machine',
    icon: "./mapIcon/machine.png",
    lng: 102.871468,
    lat: 27.042833,
    alt: 835.5716675444892,
    scale: 0.7,
    "equipmentNo": "QY-DJ001", //-- 机巢编号
    "airdromeManufacturers": "大疆", //-- 生产厂家
    "equipmentStatus": "正常", //--机巢状态
    "area": "102.871468，27.042833", //--机巢位置
    "buyTime": "大疆机场", // 机巢类型
    // "maintainTime": "2023-12-05",  //--设备维护时间
    // "registrant": "张风",// -- 登记人
    "executeTime": "2023-12-01 15:00:00",// --上次执行时间
    "uavType": "多旋翼无人机", //--无人机类型
    "uavModel": "大疆经纬 M30T", //--无人机型号
    "uavManufacturers": "QY-DJ001-01", //-- 生产厂家
    "uavStatus": "正常", //-- 设备状态
    // "uavSn": "4GCCK5MR0B0CU0",// -- 无人机SN码
    // "flightControlSerial": "QY-DJ001-01" //-- 飞控编号
}
window.showCoord = {
    "position": [
    102.9173142073559,
    27.0319139672304,
    3651.835676989608
],
    "pitch": -29.09506899015584,
    "heading": 272.08104379568795,
    "roll": 359.9954653088278
}
window.trackPoly="./geojson/polyline.geojson"
