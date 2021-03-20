import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';

const getCartByUser = async (id) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/findCart?_uid=${id}`);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getUserByPhone = async (phone) => {
  try {
    let getData = await axios.get(`${BASE_URL}/api/authUser/${phone}`);
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const addCartByID = async (_uid, _idProduct, quality) => {
  try {
    let addCart = await axios.post(
      `${BASE_URL}/api/cart`,
      {
        _uid,
        _idProduct,
        quality,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return addCart;
  } catch (error) {
    console.log('loi add cart-------> ', error);
    return 'error';
  }
};
export {getCartByUser, getUserByPhone, addCartByID};
