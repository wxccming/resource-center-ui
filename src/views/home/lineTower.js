let powerLine
let lineTower
function testLineTower(map,testData, flag = false) {
    // debugger
    if (!lineTower) {
        lineTower = new liGlobe.LineTower(map)
    }
    if (powerLine) {
        removeLineTower(map)
    }
    testData[0].tiles = flag
    lineTower.add({
        data: testData
    })
    console.log('杆塔信息',testData);
    // lineTower.removeByLineId(1270)//根据线路id删除线路资源
    // lineTower.removeAll()//删除所有
    // lineTower.destroy() //摧毁lineTower对象的所有三维资源，如果页面无线路树功能需要调用清除资源
    //绘制气泡div
    const powerLineManager = liGlobe.PowerLineManager(map);
    let bubbles = []
    console.log('杆塔ID',testData[0].lineId);
    testData[0].towerList.forEach((item) => {
        let htmlString = `
                <div class='bubbleBuffer'>
                  <div class='custombubble user-select'>
                    <div>${item.towerName}<div/>
                    <div class="bubbleBtn">
                        <div onclick="clicktest('${testData[0].lineId}','${testData[0].lineName}','${item.towerNum}','${item.towerName}','InspectionPhotos')">巡检照片</div>
                        <div onclick="clicktest('${testData[0].lineId}','${testData[0].lineName}','${item.towerNum}','${item.towerName}','defect')">缺陷</div>
                        <div onclick="clicktest('${testData[0].lineId}','${testData[0].lineName}','${item.towerNum}','${item.towerName}','workingCondition')">工况摸拟</div>
                        <div onclick="clicktest('${testData[0].lineId}','${testData[0].lineName}','${item.towerNum}','${item.towerName}','flightPath')">航迹摸拟</div>
                    </div>
                  </div>
                </div>`;
        bubbles.push({
            ttName: testData[0].lineName,
            //自定义气泡，设置要绑定的html字符串，响应事件样式也需要自己设置
            htmlTemplate: htmlString,
            x: item.lon,
            y: item.lat,
            z: item.towerTop || 0,
        });
    })
    powerLine = liGlobe.PowerLine.create(map, {
        bubbles,
    });
    powerLineManager.add(powerLine);
    powerLine.active = true; //说明：系统同时加载多条线路，系统只会显示其中指定的一条或多条active=true的气泡
    // powerLineManager.remove(powerLine)
    // window.clicktest = (lineId,lineName,twId, type)=>{
    //     console.log(lineId,lineName,twId, type);
    // }
}

function removeLineTower(map) {
    const powerLineManager = liGlobe.PowerLineManager(map);
    powerLineManager.remove(powerLine)
    if (lineTower) {
        lineTower.removeAll()
    }
}
function resetLine(){
    lineTower = undefined
}

export {
    testLineTower,
    removeLineTower,
    resetLine
}
