import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getCategory = async () => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/categories`,
      // `http://10.82.166.162:3000/api/category/getall`,
    );
    return getData;
  } catch (error) {
    console.log('hello Error', error);
    return null;
  }
};
export {getCategory};
