import {
  getLineLayer,
  removeLayer,
  addMarker,
  defined,
  jumpTo,
} from "@/utils/SGMap";
import { getAssetsImages } from "@/utils/assetsImages";

let aniid; //动画id

let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  ],
};
class UAVHistoryPath {
  // speed: number; // 摸拟速度
  // ind: number; //坐标索引
  // roadInd: number; //路片段索引
  // prevPoint: any;
  // prevPoingInfo: any;
  // chunk: []; // 动画线段
  // layeridx: number; // 当前图层id
  // startPointMarker: any;
  // endPointMarker: any;
  // histroyMovePointMarker: any;

  constructor(map) {
    window.map = map;
    this.speed = 60; //模拟速度
    this.ind = 0; //坐标索引
    this.roadInd = 0; //路片段索引
    this.prevPoingInfo = null; //上一个路片段
    this.prevPoint = null; // 上一个坐标点
    this.chunk = []; // 动画线段
    this.layeridx = 0; // 当前图层id
    this.startPointMarker = null;
    this.endPointMarker = null;
    this.histroyMovePointMarker = null;
  }

  add(coordinates = [], imageUrl, histroyMarker, callbackFun) {
    let _this = this;
    if (defined(this.startPointMarker)) {
      this.remove();
    }
    this.histroyMovePointMarker =
      histroyMarker ||
      addMarker(
        window.map,
        {
          className: "uav-move",
        },
        coordinates[0]
      );
    this.startPointMarker = addMarker(
      window.map,
      {
        className: "uav-start",
      },
      coordinates[0]
    );
    this.endPointMarker = addMarker(
      window.map,
      {
        className: "uav-end",
      },
      coordinates[coordinates.length - 1]
    );
    let styleOpt = {
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#28F",
        "line-width": 6,
        "line-pattern": "histroy_path_png",
      },
    };
    let data = JSON.parse(JSON.stringify(geojson));
    data.features[0].geometry.coordinates = coordinates;
    /*// 以路线居中视图
        var bounds = coordinates.reduce(function (bounds, coord) {
            return bounds.extend(coord);
        }, new map.LngLatBounds(coordinates[0], coordinates[0]));

        window.map.fitBounds(bounds, {
            padding: 30
        });*/
    let map = window.map;
    if (window.map.hasImage("histroy_path_png")) {
      getLineLayer(window.map, "histroy_path", styleOpt).setData(data);
      map.addLayer({
        id: "line-animation-0",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#FA0",
          "line-width": 6,
          "line-opacity": 0.9,
        },
      });
      if (histroyMarker) return;
      _this.chunkLine(window.map, coordinates);
    } else {
      window.map.loadImage(getAssetsImages(imageUrl), function (error, image) {
        // console.log(image,error);
        setTimeout(() => {
          window.map.addImage("histroy_path_png", image);
          getLineLayer(window.map, "histroy_path", styleOpt).setData(data);
          map.addLayer({
            id: "line-animation-0",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#FA0",
              "line-width": 6,
              "line-opacity": 0.9,
            },
          });
          if (histroyMarker) return;
          _this.chunkLine(window.map, coordinates);
        }, 100);
      });
    }
    jumpTo(window.map, {
      position: coordinates[0],
      zoom: 20,
    });
  }

  remove() {
    if (defined(this.startPointMarker)) {
      window.cancelAnimationFrame(aniid);
      removeLayer(window.map, "line-animation-0");
      // removeLayer(window.map, "line-animation");
      removeLayer(window.map, "histroy_path_line");
      this.chunk = [];
      this.layeridx = 0;
      this.startPointMarker.remove();
      this.endPointMarker.remove();
      this.histroyMovePointMarker.remove();
      this.startPointMarker = null;
      this.endPointMarker = null;
      this.histroyMovePointMarker = null;
    }
  }

  chunkLine(map, aryInfo) {
    // console.log("chunkLine---aryInfo",aryInfo)
    var chunk;
    if (this.roadInd < aryInfo.length) {
      if (this.roadInd != 0) {
        chunk = turf.lineChunk(
          turf.lineString([this.prevPoingInfo, aryInfo[this.roadInd]]),
          this.speed / 60 / 3600 || 0.01,
          {
            units: "kilometers",
          }
        );
        this.prevPoingInfo = aryInfo[this.roadInd];

        // 开始执行动画
        this.ind = 0;
        this.roadInd++;
        this.moveAction(map, chunk.features, aryInfo);
      } else {
        this.prevPoingInfo = aryInfo[this.roadInd];
        this.roadInd++;
        this.chunkLine(map, aryInfo);
      }
    }
  }

  moveAction(map, chunkInfo, aryInfo) {
    // console.log('moveAction',this.ind,chunkInfo,aryInfo)
    let that = this;
    // now = Date.now();
    // elapsed = now - then;
    // if (elapsed > fpsInterval) {

    //   then = now - (elapsed % fpsInterval);
    // 设置坐标位置
    if (this.ind < chunkInfo.length) {
      var currentPoint = chunkInfo[this.ind].geometry.coordinates[1];

      geojson.features[0].geometry.coordinates.push(currentPoint);
      if (this.prevPoint) {
        var bearing = turf.bearing(this.prevPoint, turf.point(currentPoint));

        // bearing && this.histroyMovePointMarker.setLngLat(currentPoint).setRotate((bearing - 90))
        if (bearing) {
          this.histroyMovePointMarker.setLngLat(currentPoint);
          this.histroyMovePointMarker._rotation = bearing - 90;
          this.histroyMovePointMarker._update();
        }
      }
      this.prevPoint = turf.point(currentPoint);
      window.map.getSource("line-animation-0").setData(geojson);
      this.ind++;
      aniid = requestAnimationFrame(
        this.moveAction.bind(this, map, chunkInfo, aryInfo)
      );
    } else {
      cancelAnimationFrame(aniid);
      this.chunkLine(map, aryInfo);
    }
  }
}

let uavhistroyPath;

function getUAVHistoryPathManager(map) {
  if (!defined(uavhistroyPath)) {
    uavhistroyPath = new UAVHistoryPath(map);
  }
  return uavhistroyPath;
}

export { getUAVHistoryPathManager };
