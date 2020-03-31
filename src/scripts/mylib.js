import {sify} from 'chinese-conv';
import pinyin from 'pinyin';

module.exports = {
  LevenshteinDistance(str01, str02) {
    str01 = [].concat.apply([], pinyin(sify(str01)));
    str02 = [].concat.apply([], pinyin(sify(str02)));
    let dif = [];
    for(let i = 0; i < str01.length + 1; i++) {
      dif.push(new Array(str02.length + 1));
      dif[i][0] = i;
    }
    for(let i = 0; i < str02.length + 1; i++) {
      dif[0][i] = i;
    }
    for(let i = 0; i < str01.length; i++) {
      for(let j = 0; j < str02.length; j++) {
        if(str01[i] === str02[j]) {
          dif[i + 1][j + 1] = dif[i][j];
        } else {
          dif[i + 1][j + 1] = Math.min(dif[i][j], dif[i + 1][j], dif[i][j + 1]) + 1;
        }
      }
    }
    return 1 - (dif[str01.length][str02.length] / Math.max(str01.length, str02.length));
  },
  setMarkers(rawData, latitude, longitude) {
    let datas = [];
    let ids = Object.keys(rawData);
    ids.map((id) => {
      let lat1 = latitude;
      let lng1 = longitude;
      let lat2 = rawData[id].coordinates.latitude;
      let lng2 = rawData[id].coordinates.longitude;
      if (distance(lat1, lng1, lat2, lng2) <= 1) { // 顯示以定位為中心半徑1km內的店家
        datas.push(rawData[id]);
      }
    });
    return datas;
  }
};
function distance(lat1, lng1, lat2, lng2) {
  const EARTH_RADIUS = 6378.137; // 地球平均半徑 
  let radLat1 = deg2rad(lat1);
  let radLat2 = deg2rad(lat2);
  let radlng1 = deg2rad(lng1);
  let radlng2 = deg2rad(lng2)
  let a = radLat1 - radLat2;
  let b = radlng1 - radlng2; 
  let s = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = Math.round(s * 10000) / 10000;
  return s;
};

function deg2rad(deg) {
  return deg * Math.PI / 180;
};