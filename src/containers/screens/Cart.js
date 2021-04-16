import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
  Image,
  RefreshControl,
} from 'react-native';
import Header from '../Header/HeaderCart';
import FooterCart from '../Footer/FooterCart';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import { COLORS, icons } from '../../constants';
import {
  getUserByPhone,
  getCartByUser,
  updateCartByID,
  updateAllCart,
} from '../../api/cartApi';
import Item from '../views/ItemCart';
import auth from '@react-native-firebase/auth';
import { Modal } from 'react-native-paper';
export default function Cart() {
  const navigation = useNavigation();
  const [dataCart, setDataCart] = useState();
  const [number, setNumber] = useState(0);
  const [money, setMoney] = useState(127000 + '');
  const [user, setUser] = useState();
  const [_idUser, set_idUser] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  };


  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userAuth = auth().currentUser;
    const phone = userAuth.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    getDataCart(getApi.data._id);
    set_idUser(getApi.data._id);
  };
  const getDataCart = async (userID) => {
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
  const removeCart = async (_idProduct) => {
    let removeCartBy_id = await updateCartByID(_idUser, _idProduct);
    // console.log('userrrrrr ------->>>> ', removeCartBy_id);

    toastAndroid('Xóa thành công!');
    onRefresh();
    // console.log('test thôi nè ---- > ', _idProduct);
    // console.log('id user  ---- > ', _idUser);
  };
  const removeAllCart = async () => {
    let removeCartAll = await updateAllCart(_idUser);
    // console.log('userrrrrr ------->>>> ', removeCartAll);

    toastAndroid('Xóa thành công!');
    hideModal()
    onRefresh();
    // console.log('test thôi nè ---- > ', _idProduct);
    // console.log('id user  ---- > ', _idUser);
  };
  const onRefresh = async () => {
    const userAuth = auth().currentUser;
    const phone = userAuth.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    await getDataCart(getApi.data._id);

  };
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));

  }

  const onRefreshData = React.useCallback(() => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    wait(1000).then(() => setRefreshing(false));
    onRefresh()
  }, []);

  if (dataCart === undefined) {
    return (
      <View>
        <Header title="GIỎ HÀNG" />
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshData}
          />
        }>
          <Text style={styles.alertWarning}>Chưa có sản phẩm nào😢</Text>
        </ScrollView>
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
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshData}
        />
      }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Các món đã chọn
          </Text>
          <TouchableOpacity onPress={showModal}>
            <Text style={{ color: COLORS.blue }}>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={1}
          data={dataCart}
          renderItem={({ item }) => (
            // onPress={() =>
            //   navigation.navigate('DetailsCategory', {data: item})
            // }

            <Item item={item} onPress={() => removeCart(item._idProduct._id)} />
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
      <FooterCart
        title={`${number} món trong giỏ hàng`}
        price={`${totalA}đ`}
        onPress={() => navigation.navigate('Payment', { dataCart })}
      />
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Image
          style={{
            width: WIDTH / 2,
            height: WIDTH / 1.7,
          }}
          source={require('../../constants/icons/logo.png')}
          resizeMode="center"
        />
        <View>
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              fontSize: 16,
              fontStyle: 'normal',
            }}>
            BẠN CÓ MUỐN XÓA KHÔNG ?
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={hideModal}>
              <Text
                style={{
                  color: COLORS.textOrange,
                  fontWeight: 'bold',
                  fontSize: 14,
                  fontStyle: 'normal',
                }}>
                Huỷ
            </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeAllCart()}>
              <Text
                style={{
                  color: COLORS.textOrange,
                  fontWeight: 'bold',
                  fontSize: 14,
                  fontStyle: 'normal',
                }}>
                Đồng ý
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
