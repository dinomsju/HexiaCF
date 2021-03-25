import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getProduct = async () => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/products`);
    // console.log('hello', getData?.data?.items);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getProductByCat = async (id) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/product/cate/${id}`);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getUserByPhone = async (phone) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/authUser/${phone}`);
    // console.log('getUserByPhone', getData.data);
    return getData;
  } catch (error) {
    console.log('getUserByPhone Error', error);
    return null;
  }
};

const getBanner = async () => {
  try {
    let getBanner = await axios.get(`${BASE_URL}/api/banner`);
    return getBanner;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export {getProduct, getProductByCat, getUserByPhone, getBanner};
