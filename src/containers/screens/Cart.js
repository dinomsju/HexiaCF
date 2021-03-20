import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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
import {getUserByPhone, getCartByUser} from '../../api/cartApi';
import Item from '../views/ItemCart';

import auth from '@react-native-firebase/auth';
export default function Cart() {
  const [dataCart, setDataCart] = useState();
  const [number, setNumber] = useState(0);
  const [money, setMoney] = useState(127000 + '');
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  getUser = async () => {
    const userAuth = auth().currentUser;
    const phone = userAuth.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    getDataCart(getApi.data._id);
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
  if (dataCart === undefined) {
    return (
      <View>
        <Header title="GIỎ HÀNG" />
        <Text style={styles.alertWarning}>chưa có giỏ hàng!</Text>
      </View>
    );
  }
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
          <TouchableOpacity>
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

            <Item item={item} />
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
