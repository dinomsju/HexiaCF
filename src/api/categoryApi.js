import {BASE_URL} from './BASE_URL';
import axios from 'axios';

const getCategory = async () => {
  try {
    let getData = await axios.get(
      `http://hexia-coffee.herokuapp.com/api/category/getall`,
      // `http://10.82.166.162:3000/api/category/getall`,
    );
    // console.log('get thanh cong', getData.data.items);
    return getData;
  } catch (error) {
    console.log('hello Error', error);
    return null;
  }
};
export {getCategory};
