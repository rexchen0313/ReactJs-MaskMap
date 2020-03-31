import axios from 'axios';
import maskDatas from '../model/maskModel.json';

module.exports = {
  async reloadMaskDatas() {
    let { data: response } = await axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
    return response.features;
  },
  async getMaskModel() {
    let data = await maskDatas;
    return data;
  },
};