import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getOrderByUserId = async (userId) => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/findOrderbyUser/id/${userId}`,
    );
    return getData;
  } catch (error) {
    console.log('getOrderByUserId Error', error);
    return null;
  }
};

const getOrderByIdOrder = async (id) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/findOder/id/${id}`);
    return getData;
  } catch (error) {
    console.log('getOrderByUserId Error', error);
    return null;
  }
};
export {getOrderByUserId, getOrderByIdOrder};
