import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import Header from '../Header/HeaderCart';
import FooterCart from '../Footer/FooterCart';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {COLORS, icons} from '../../constants';
import {
  getUserByPhone,
  getCartByUser,
  updateCartByID,
  updateAllCart,
} from '../../api/cartApi';
import Item from '../views/ItemCart';
import auth from '@react-native-firebase/auth';

export default function Cart() {
  const [dataCart, setDataCart] = useState();
  const [number, setNumber] = useState(0);
  const [money, setMoney] = useState(127000 + '');
  const [user, setUser] = useState();
  const [_idUser, set_idUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  getUser = async () => {
    const userAuth = auth().currentUser;
    const phone = userAuth.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    getDataCart(getApi.data._id);
    set_idUser(getApi.data._id);
  };
  getDataCart = async (userID) => {
    let getApiCart = await getCartByUser(userID);

    setNumber(getApiCart?.data?.cart?.products?.length);

    setDataCart(getApiCart?.data?.cart?.products);
  };
  let sl = dataCart?.map((dataCart, index) => {
    return dataCart.quality * dataCart?._idProduct.price;
  });

  let totalA = sl?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  removeCart = async (_idProduct) => {
    let removeCartBy_id = await updateCartByID(_idUser, _idProduct);
    console.log('userrrrrr ------->>>> ', removeCartBy_id);

    toastAndroid('Xóa thành công!');
    onRefresh(_idUser);
    // console.log('test thôi nè ---- > ', _idProduct);
    // console.log('id user  ---- > ', _idUser);
  };
  removeAllCart = async () => {
    let removeCartAll = await updateAllCart(_idUser);
    console.log('userrrrrr ------->>>> ', removeCartAll);

    toastAndroid('Xóa thành công!');
    onRefresh(_idUser);
    // console.log('test thôi nè ---- > ', _idProduct);
    // console.log('id user  ---- > ', _idUser);
  };
  onRefresh = async (_idUser) => {
    await getDataCart(_idUser);
  };
  if (dataCart === undefined) {
    return (
      <View>
        <Header title="GIỎ HÀNG" />
        <Text style={styles.alertWarning}>Chưa có sản phẩm nào😢</Text>
      </View>
    );
  }
  const toastAndroid = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
  };

  return (
    <View style={styles.container}>
      <Header title="GIỎ HÀNG" />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Các món đã chọn
          </Text>
          <TouchableOpacity onPress={() => removeAllCart()}>
            <Text style={{color: COLORS.blue}}>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={1}
          data={dataCart}
          renderItem={({item}) => (
            // onPress={() =>
            //   navigation.navigate('DetailsCategory', {data: item})
            // }

            <Item item={item} onPress={() => removeCart(item._idProduct._id)} />
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
      <FooterCart title={`${number} món trong giỏ hàng`} price={`${totalA}đ`} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alertWarning: {
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc',
    padding: 10,
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8a6d3b',
    fontSize: 20,
  },
});
