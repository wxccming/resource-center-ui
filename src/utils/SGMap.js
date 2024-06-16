export function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.SGMap) {
      // console.log('has--window.SGMap',window.SGMap)
      resolve(window.SGMap);
    }
    window.initSGMap = () => {
      // console.log('has--window.initSGMap',window.initSGMap,window.SGMap)
      resolve(window.SGMap);
    };
  });
}

export function defined(value) {
  return value !== undefined && value !== null;
}
/**
 *
 * @param {*} lnglatarr  多边形二维数组
 * @returns
 */
export function getPolygonCenter(lnglatarr) {
  let total = lnglatarr.length;
  let X = 0,
    Y = 0,
    Z = 0;
  lnglatarr.forEach(function (lnglat) {
    let lng = (lnglat[0] * Math.PI) / 180;
    let lat = (lnglat[1] * Math.PI) / 180;
    let x, y, z;
    x = Math.cos(lat) * Math.cos(lng);
    y = Math.cos(lat) * Math.sin(lng);
    z = Math.sin(lat);
    X += x;
    Y += y;
    Z += z;
  });
  X = X / total;
  Y = Y / total;
  Z = Z / total;

  let Lng = Math.atan2(Y, X);
  let Hyp = Math.sqrt(X * X + Y * Y);
  let Lat = Math.atan2(Z, Hyp);
  // return { lng: Lng * 180 / Math.PI, lat: Lat * 180 / Math.PI };
  return [(Lng * 180) / Math.PI, (Lat * 180) / Math.PI];
}
export function getPolygonLayer(
  map,
  data,
  opt = {
    paint: {},
  },
  featureCollection = {},
  isShow = true,
  callback
) {
  // id = id + "_polygon";
  // map=window.map
  console.log("getPolygonLayer--", map, featureCollection);
  // window.map.on("load", function (e) {
  // console.log('load--地图加载完成')
  let lineLayer = window.map.addLayer({
    id: data.id,
    type: "fill",
    source: {
      type: "geojson",
      data: featureCollection,
      //     {
      //     'type': 'FeatureCollection',
      //     'features': []
      // }
    },
    paint: opt.paint || {},
  });
  // debugger
  // 为线图层添加点击事件
  window.map.on("click", data.id, (e) => {
    // console.log("e--",e, data);
    callback && callback(data);
  });
  // return
  // map.getSource(id).setData(featureCollection)
  console.log("isShow", isShow);
  // debugger
  if (isShow) {
    window.map.setPaintProperty(data.id, "fill-opacity", 0.5);
  } else {
    window.map.setPaintProperty(data.id, "fill-opacity", 0);
  }
  // console.log('getPolygonLayer--',id,isShow,featureCollection)
  // })
}

export function getLineLayer(map, id, opt) {
  map ? "" : (map = window.map);
  id = id + "_line";
  let layer = map.getLayer(id);
  if (!defined(layer)) {
    layer = map.addLayer({
      id: id,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      layout: opt.layout || {},
      paint: opt.paint || {},
    });
  }
  return map.getSource(id);
}

export function getSymbolLayer(
  map,
  id,
  opt = {
    paint: {},
  }
) {
  let layer = map.getLayer(id);
  if (!defined(layer)) {
    layer = map.addLayer({
      id: id,
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      layout: opt.layout || {},
      paint: opt.paint,
    });
  }
  return map.getSource(id);
}

export function removeLayer(map, id) {
  map.getLayer(id) && map.removeLayer(id) && map.removeSource(id);
}

// 电子地图和影像地图切换
export function changeLayer(map) {
  let layer = map.getLayer("satellite512");
  if (defined(layer)) {
    map.getLayer("satellite512") &&
      map.removeLayer("satellite512") &&
      map.removeSource("satellite512");
  } else {
    map.addLayer(
      {
        id: "satellite512",
        source: {
          type: "raster",
          url: "aegis://aegis.Satellite512",
          tileSize: window.devicePixelRatio >= 2 ? 256 : 512,
        },
        type: "raster",
        minzoom: 0,
        maxzoom: 20,
      },
      "Railway/1"
    );
  }
}

export function addMarker(map, opt, pos, fun) {
  // 构建Marker点
  let movePointDOM = document.createElement("div");
  movePointDOM.onclick = fun ?? null;
  movePointDOM.innerHTML = opt.innerHTML ?? "";
  movePointDOM.className = opt.className;
  let movePointMarker = new SGMap.Marker(movePointDOM);
  movePointMarker.setLngLat(pos).addTo(map);
  return movePointMarker;
}
export function jumpTo(map, obj) {
  map.jumpTo({
    center: obj.position,
    zoom: obj.zoom || 17,
  });
}
// 添加线图层
export function addLine(map, arr, id, color) {
  // 画线（通过map实例身上的 addLayer 方法）
  if (!map.getLayer("power-line")) {
    map.addLayer({
      id: id,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                // lineString类型的几何对象为2层数组，MultiLineString类型为3层数组
                coordinates: arr,
              },
            },
          ],
        },
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: color
        ? {
            "line-color": color,
            "line-width": 2,
          }
        : {
            "line-color": "#ed6498",
            "line-width": 2,
          },
    });
  }
}
// 添加圆点标记
export function addCircle(data, callback) {
  if (!map.getLayer(data.id)) {
    // 画小圆点（通过map实例身上的 addLayer 方法）
    map.addLayer({
      id: data.id,
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: data.point,
              },
            },
          ],
        },
      },
      paint:
        data.color && data.color[0]
          ? {
              "circle-radius": 8,
              "circle-color": data.color[0],
              "circle-opacity": 0.4,
              "circle-stroke-color": data.color[1],
              "circle-stroke-width": 3,
            }
          : {
              "circle-radius": 8,
              "circle-color": "#fff",
              "circle-opacity": 1,
              "circle-stroke-color": "#4aabf7",
              "circle-stroke-width": 3,
            },
    });
    // 设置小圆点数据
    map.getSource(data.id).setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: data.point,
          },
          properties: {
            name: "测试点",
          },
        },
      ],
    });
    window.map.on("click", data.id, (e) => {
      // console.log("e--",e, data);
      callback && callback(data);
    });
  }
}
