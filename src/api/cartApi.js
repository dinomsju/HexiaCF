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
const updateCartByID = async (_uid, _idProduct) => {
  try {
    let updateCart = await axios.post(
      `${BASE_URL}/api/removeProductbyCart`,
      {
        _uid,
        _idProduct,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return updateCart;
  } catch (error) {
    console.log('loi remove-------> ', error);
    return 'error';
  }
};
const updateAllCart = async (_uid) => {
  try {
    let updateCart = await axios.post(`${BASE_URL}/api/removeCart/${_uid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return updateCart;
  } catch (error) {
    console.log('loi remove-------> ', error);
    return 'error';
  }
};

const addOrderById = async (_uid, products) => {
  let getApi = await axios.post(`${BASE_URL}/api/order`, {
    _uid,
    products,
  });
};

export {
  getCartByUser,
  getUserByPhone,
  addCartByID,
  updateCartByID,
  updateAllCart,
  addOrderById,
};
