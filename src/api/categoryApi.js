import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getCategory = async () => {
  try {
    let getData = await axios.get(
      `${BASE_URL_1}/api/category/getall`,
      // `http://10.82.166.162:3000/api/category/getall`,
    );
    console.log(getData.data);
    return getData;
  } catch (error) {
    console.log('hello Error', error);
    return null;
  }
};
export {getCategory};
