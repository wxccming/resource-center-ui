// import {AirRow,AirMapRow,FeatureCollection} from '@/api/Airspace/AirMap/types'
import {
  getLineLayer,
  getPolygonCenter,
  getPolygonLayer,
  getSymbolLayer,
  removeLayer,
} from "@/utils/SGMap";

class SGLayer {
  /**
   *  绘制非适航区范围
   * @param {AirRow} data
   *
   */
  addNoFlyzone(data, isShow, callback) {
    data.forEach((element) => {
      getPolygonLayer(
        window.map,
        element,
        {
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.5,
          },
        },
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [JSON.parse(element.mapCoord)], //三层数组[[0,0],[0,0]]
              },
            },
          ],
        },
        isShow,
        (data) => {
          callback && callback(data);
        }
      );
    });
    // debugger
    console.log("window.map", window.map);
    // debugger

    // .setData(featureCollection)
  }

  /**
   *  非适航区域显隐
   * @param {boolean} isShow
   *
   */
  showNoFlyzoneLayer(isShow) {
    console.log("window.map.setPaintProperty--", window.map.setPaintProperty);
    if (isShow) {
      window.map.setPaintProperty("noFlyzone_polygon", "fill-opacity", 0.5);
    } else {
      window.map.setPaintProperty("noFlyzone_polygon", "fill-opacity", 0);
    }
  }
}

export default new SGLayer();
