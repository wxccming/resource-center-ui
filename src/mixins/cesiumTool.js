export default {
    methods: {
        // 经纬度转屏幕坐标
        screenCoordinates(lon, lat) {
            let scratch = new Cesium.Cartesian2();

            let position = Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat));

            //cartesianToCanvasCoordinates 转换三维空间坐标到canvas坐标（窗口坐标）
            return this.viewer.scene.cartesianToCanvasCoordinates(position, scratch);
        },
        // 计算塔距中心点
        calculationLocation(data) {

            let list = [];

            for (let i = 0; i < data.length - 1; i++) {

                let oneLon = data[i].lon;
                let oneLat = data[i].lat;

                let twoLon = data[i + 1].lon;
                let twoLat = data[i + 1].lat;

                let lonList = [oneLon, twoLon].sort();
                let latList = [oneLat, twoLat].sort();

                let coreLon = Number(lonList[0]) + (lonList[1] - lonList[0]) / 2;
                let coreLat = Number(latList[0]) + (latList[1] - latList[0]) / 2;

                list.push({coreLon, coreLat, ...data[i + 1]});

            }

            return list;
        },
        // 绘制文字
        drawLabel(data) {
            if (!data) return this.$message.error({message: '绘制文字，参数错误'});

            let {lon, lat, text, id} = data;

            this.viewer.entities.add({
                id: 'Label' + id,
                name: 'Label',
                code: 'Label' + id,
                position: Cesium.Cartesian3.fromDegrees(lon, lat),
                label: {
                    text,
                    font: '18px monospace',
                    style: Cesium.LabelStyle.FILL,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                    pixelOffset: new Cesium.Cartesian2(0, 10),   //偏移量
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300)
                }
            });
        },
        // 绘制点
        drawPoint(data) {

            if (!data) return this.$message.error({message: '绘制点，参数错误'});

            let {lon, lat, text, id, color = Cesium.Color.SKYBLUE} = data;

            this.viewer.entities.add({
                id: 'Point' + id,
                name: 'Point',
                code: id,
                position: Cesium.Cartesian3.fromDegrees(lon, lat),
                label: {
                    text,
                    font: '16px monospace',
                    style: Cesium.LabelStyle.FILL,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                    pixelOffset: new Cesium.Cartesian2(0, -20),   //偏移量
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(301, 1500)
                },
                point: {
                    color,
                    pixelSize: 10,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 1,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY
                }
            });

        },
        // 绘制线
        drawLine(data) { // 绘制线

            if (!data) return this.$message.error({message: '绘制线，参数错误'});

            let {list, color = 'RED', width = 3} = data;

            let dataArray = list.map(item => [item.lon, item.lat]).flat(Infinity);

            this.viewer.entities.add({
                name: 'Line',
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray(dataArray),
                    width,
                    material: Cesium.Color[color]
                }
            });

        },
        // 飞到某个经纬度上
        flyTo({lon, lat, h = 500}) {
            this.viewer.scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(lon, lat, h),
            });
        }
    }
}
