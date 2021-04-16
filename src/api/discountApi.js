import { BASE_URL, BASE_URL_1 } from './BASE_URL';
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
const getDiscountByUser = async (phone) => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/findDiscountbyUser/${phone}`,
    );
    return getData;
  } catch (error) {
    console.log('hello Error', error);
    return null;
  }
};

const addVoucher = async (_uid, _id) => {
  let getApi = await axios.post(`${BASE_URL}/api/exchangeVoucher`, {
    _uid,
    _id,
  });
  return getApi;
};

export { getDiscount, getDiscountByUser, addVoucher };
