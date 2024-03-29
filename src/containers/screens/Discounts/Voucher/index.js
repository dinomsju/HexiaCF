import React, { useEffect, useState } from 'react';
import { Button, Block } from '../../../../components';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getUserByPhone } from '../../../../api/productApi';
import { addVoucher } from '../../../../api/discountApi';
import { getOrderByIdOrder, getOrderByUserId } from '../../../../api/orderApi';
import { FAB } from 'react-native-paper';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';
import { getDiscount } from '../../../../api/discountApi';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../../../constants/constants';
import { COLORS } from '../../../../constants';
import { Modal } from 'react-native-paper';
const Voucher = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [_id, set_id] = useState();
  const [cost, setCost] = useState();
  const [visible, setVisible] = React.useState(false);
  const showModal = (_id, cost) => {
    set_id(_id)
    setCost(cost)
    setVisible(true)
  };
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
    getData();
  }, []);

  const getData = async () => {
    const getApi = await getDiscount();
    // console.log(getApi.data.Discount);
    setData(getApi.data.Discount);
  };
  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
  };
  const addVoucherByID = async () => {
    // console.log('id voucher ne', _id);
    // console.log('id user ne', user._id);

    if (user.point < cost) {
      toastAndroid('Bạn không đủ Point');
    } else {
      let addCart = await addVoucher(user._id, _id);
      // console.log('addCart ------->>>> ', addCart.data.msg);
      addCart.data.msg === 'Bạn đã đổi voucher này rồi' ? toastAndroid(addCart.data.msg) : toastAndroid('Đổi khuyến mãi thành công!');
      hideModal()
      onRefresh();
    }
    // console.log('id voucher ne', _id);
    // console.log('id user ne', user._id);
    // console.log('cost ne', cost);
    // let addCart = await addVoucher(user._id, _id);
  };

  const onRefresh = async () => {
    await getUser();
  };
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
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                margin: 5,
                borderRadius: 10,
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#eee',
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: '#ffffff',
              }}
              onPress={() => showModal(item._id, item.cost)}>
              <View style={{ width: WIDTH / 2 + 25 }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  numberOfLines={2}>
                  Giảm {item.percent}% với {item.title}
                </Text>
                <Text
                  style={{
                    color: COLORS.blue,
                    fontSize: 14,
                    marginTop: 1,
                    marginLeft: 3,
                  }}>
                  Ngày hết hạn: {moment(item.dateEnd).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#FFE0B2',
                    width: WIDTH / 6,
                    height: WIDTH / 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: '#EF6C00',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {item.cost}
                  </Text>
                </View>

                <View
                  style={{
                    // backgroundColor: '#fad390',
                    // width: WIDTH / 6,
                    // height: WIDTH / 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      color: COLORS.orange,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    POINT
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        style={styles.fab}
        label={'POINT: ' + user?.point}
        color={COLORS.white}
      />
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Image
          style={{
            width: WIDTH / 2,
            height: WIDTH / 1.7,
          }}
          source={require('../../../../constants/icons/logo.png')}
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
            BẠN CÓ MUỐN ĐỔI KHÔNG ?
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
            <TouchableOpacity onPress={() => addVoucherByID()}>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.orange,
  },
});
export default Voucher;
