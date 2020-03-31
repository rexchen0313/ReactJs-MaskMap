import React from "react";
import ReactDOM from "react-dom";
import api from './api/base';
import { LevenshteinDistance, setMarkers } from './scripts/mylib';
import SideBar from './components/SideBar';
import MaskMap from './components/MaskMap';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: {},
      datas: [],
      list: [],
      search: '',
      // 定位中心，預設台北火車站附近
      latitude: 25.0468121, // 緯度
      longitude: 121.51646, // 經度
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.setMapCenter = this.setMapCenter.bind(this);
  }

  async componentDidMount() {
    const maskDatas = await api.reloadMaskDatas(); // 口罩地圖api的即時資料 
    const maskModel = await api.getMaskModel(); // 整理(統一格式、補缺值)後的資料(如店名、住址、電話與經緯度) 
    let notRecorded = [];
    let list = [];
    let rawData = {};
    let datas = [];

    maskDatas.map((maskData) => {
      let id = "TW" + maskData.properties.id;
      let name = typeof maskModel[id] !== 'undefined' ? maskModel[id].name : maskData.properties.name;
      let phone = typeof maskModel[id] !== 'undefined' ? maskModel[id].phone : maskData.properties.phone;
      let address = typeof maskModel[id] !== 'undefined' ? maskModel[id].address : maskData.properties.address;
      let note = maskData.properties.note !== '-' ? maskData.properties.note : '';
      let longitude = typeof maskModel[id] !== 'undefined' ? maskModel[id].coordinates.longitude : maskData.geometry.coordinates[0];
      let latitude = typeof maskModel[id] !== 'undefined' ? maskModel[id].coordinates.latitude : maskData.geometry.coordinates[1];

      rawData[id] = {
        'id': maskData.properties.id,
        'name': name,
        'phone': phone,
        'address': address,
        'mask': {
          'adult': maskData.properties.mask_adult,
          'child': maskData.properties.mask_child,
        },
        'note': note,
        'coordinates': {
          'longitude': longitude,
          'latitude': latitude,
        },
        "updated": maskData.properties.updated,
      }
      if(typeof maskModel[id] === 'undefined') {notRecorded.push(maskData.properties.id);}
    });

    let ids = Object.keys(rawData);
    ids.map((id) => {
      if (rawData[id].address.substring(0, 3) === '台北市'){
        datas.push(rawData[id]);
      }
    });

    this.setState({
      rawData,
      datas,
    });
    console.log('尚未整理資料:', notRecorded);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    document.getElementById("list").scrollTop = 0; // 使 scroll 回到最上方
    let search = e.target[0].value;
    if (search !== "") {
      let rawData = this.state.rawData;
      let ids = Object.keys(rawData);
      let result = [];
      let temp = [];
      ids.map((id) => { // 使用 Levenshtein Distance 評估搜尋字串與地址相關度
        let target = rawData[id].address;
        if (target !== "") {
          temp.push({
            "id":　id,
            "score": LevenshteinDistance(search, target),
          });
        }
      });
      temp = temp.sort(function (a, b) { // 依相關度高至低排列
        return a.score < b.score ? 1 : -1;
      });
      temp.map((data) => {  
        result.push(rawData[data.id]);
      });

      this.setState({
        datas: result.splice(0, 100), // 只輸出相關度最高的前100個選項
      })
    };
  }
  setMapCenter(id) {
    let rawData = this.state.rawData;
    this.setState({
      longitude: rawData['TW' + id].coordinates.longitude,
      latitude: rawData['TW' + id].coordinates.latitude
    });
  }

  render() {
    const { rawData, datas, latitude, longitude } = this.state;
    let centerPosition = [latitude, longitude];
    let list = setMarkers(rawData, latitude, longitude);
    return (
      <div>
        <SideBar handleOnSubmit={this.handleOnSubmit} setMapCenter={this.setMapCenter} datas={datas} style={{width:'350px', height:'100vh',float: 'left'}}/>
        <MaskMap center={centerPosition} zoom={16} list={list} style={{width: 'calc(100% - 350px)', float: 'right'}}/>
      </div>
    );
  }
}
const App = document.getElementById("app");
ReactDOM.render(<Main />, App);