import {BASE_URL, BASE_URL_1} from './BASE_URL';
import axios from 'axios';


const getCartByUser = async (id) => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/findCart?_uid=${id}`,
    );
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getUserByPhone = async (phone) => {
  try {
    let getData = await axios.get(
      `${BASE_URL}/api/authUser/${phone}`,
    );
    return getData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export {getCartByUser, getUserByPhone};
