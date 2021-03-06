import {BASE_URL} from './BASE_URL';
import axios from 'axios';

const getProduct = async () => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/product/getall`);
    console.log('hello', getData?.data?.items);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getProductByCat = async (id) => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/product/get/category/id/${id}`,
    );
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export {getProduct, getProductByCat};
