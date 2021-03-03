import {BASE_URL} from './BASE_URL';
import axios from 'axios';

const getProduct = async () => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/product/getall`);
    console.log('hello', getData.data.items);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getProductById = async (id) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/product/get/id/${id}`);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export {getProduct, getProductById};
