import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getDiscount = async () => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/discounts`);
    return getData;
  } catch (error) {
    console.log('hello Error', error);
    return null;
  }
};
export {getDiscount};
