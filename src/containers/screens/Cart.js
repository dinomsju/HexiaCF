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
export default function Cart() {
  const [userID, setUserID] = useState();
  const [dataCart, setDataCart] = useState();
  const [number, setNumber] = useState(3);
  const [money, setMoney] = useState(127000 + '');
  const format = money.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  useEffect(() => {
    getDataUser();
    getDataCart();
  }, []);

  const getDataUser = async () => {
    let getApiUser = await getUserByPhone('906288042');
    setUserID(getApiUser?.data?._id);
  };

  const getDataCart = async () => {
    let getApiCart = await getCartByUser(userID);
    setDataCart(getApiCart?.data?.cart?.products);
  };

  console.log('setUserID1 -------------> ', userID);
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
            // <TouchableOpacity
            // // onPress={() =>
            // //   navigation.navigate('DetailsCategory', {data: item})
            // // }
            // >
            //   <Item item={item} />
            // </TouchableOpacity>
            <Item item={item} />
          )}
          keyExtractor={(item) => item.title}
        />
      </ScrollView>
      <FooterCart title={`${number} món trong giỏ hàng`} price={`${format}đ`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
