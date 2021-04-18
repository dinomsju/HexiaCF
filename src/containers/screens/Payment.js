import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Block, Text, Button } from '../../components';
import Header from '../Header/HeaderPayment';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
//example
import { getProduct, getUserByPhone } from '../../api/productApi';
import { getDiscountByUser } from '../../api/discountApi';
import Item from '../views/ItemPayment';
import Footer from '../Footer/FooterPayment';
import auth from '@react-native-firebase/auth';
import { addOrderById, updateAllCart, getCartByUser } from '../../api/cartApi';
import { Modal } from 'react-native-paper';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import { COLORS, icons } from '../../constants';
import moment from 'moment';
import LottieView from 'lottie-react-native';
const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { dataCart } = route.params;
  const [value, setValue] = useState('0');
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [products, setProducts] = useState({});

  const [_idVoucher, set_idVoucher] = useState();
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataDiscount, setDataDiscount] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    getDiscountUser()
    setVisible(true)
  };
  const hideModal = (_id, percentZ) => {
    set_idVoucher(_id);
    setPercent(percentZ);
    setVisible(false);
    // console.log('_id  -------->> ', _idVoucher);
    // console.log('percent  -------->> ', percent);
  };
  const hideModal1 = () => {

    setPercent(0);
    setVisible(false);

  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 5,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: WIDTH * 1.4
  };


  useEffect(() => {
    getUser();

  }, []);

  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
    setUserId(getApi.data._id);
  };

  const removeAllCart = async () => {
    let removeCartAll = await updateAllCart(userId);
  };

  const addOrder = async () => {

    // const addOrder = await addOrderById(userId, value, _idVoucher, dataCart);
    const addOrder = await addOrderById(userId, value, _idVoucher, dataCart);
    // console.log('addOrder -------------------->>>> ', addOrder);
    removeAllCart();

    navigation.push('Home');
    setPercent(0);
  };

  let sl = dataCart?.map((dataCart, index) => {
    return dataCart.quality * dataCart?._idProduct.price;
  });

  let totalA = sl?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  const getDiscountUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    const getApi = await getDiscountByUser(phone);
    setDataDiscount(getApi.data.Voucher);
    setIsLoading(false)
    console.log(' dataDiscount --------->>> ', dataDiscount.length);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="THANH TOÁN" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block row marginHorizontal={10} marginVertical={5} space={'between'}>
          <Text bold size={14}>
            ĐỊA CHỈ NHẬN HÀNG
          </Text>
          <Button onPress={() => navigation.navigate('EditLocation')}>
            <Text color={'#2400FF'}>Thay đổi</Text>
          </Button>
        </Block>
        <Block backgroundColor={'#fff'}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}>
            <Block row alignCenter>
              <RadioButton value="0" />
              <Text>Giao hàng tận nơi</Text>
            </Block>
            <Block row alignCenter>
              <RadioButton value="1" />
              <Text>Nhận hàng tại quán</Text>
            </Block>
          </RadioButton.Group>
          <Block marginHorizontal={10} paddingBottom={5}>
            <Text bold size={15}>
              {user?.name}
            </Text>
            <Text color={'#848484'}>Sđt: 0{user?.phone.slice(3)}</Text>
            <Text color={'#848484'}>Địa chỉ: {user?.address}</Text>
          </Block>
        </Block>
        <Block marginHorizontal={10} marginVertical={5}>
          <Text bold size={14}>
            DANH SÁCH SẢN PHẨM
          </Text>
        </Block>
        <Block backgroundColor={'white'} paddingHorizontal={10}>
          <FlatList
            numColumns={1}
            data={dataCart}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.title}
          />
        </Block>
        <Block marginHorizontal={10} marginVertical={5}>
          <Text bold size={14}>
            PHƯƠNG THỨC THANH TOÁN
          </Text>
        </Block>
        <Block
          row
          backgroundColor={'white'}
          paddingHorizontal={10}
          padding={15}
          alignCenter>
          <Image
            source={require('../../constants/icons/icMoney.png')}
            style={{ width: 35, height: 35 }}
          />
          <Text marginLeft={10} size={16}>
            Thanh toán tiền mặt khi nhận hàng
          </Text>
        </Block>
        <Block backgroundColor={'white'} marginTop={10} padding={10}>
          <Block
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#CDD0D9',
            }}>
            <Text bold size={16}>
              Tổng cộng
            </Text>
          </Block>
          <Block
            padding={5}
            row
            space={'between'}
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#CDD0D9',
            }}>
            <Text>Tổng tạm tính:</Text>
            <Text color={'#EA8025'}>{totalA}đ</Text>
          </Block>
          <Button
            padding={5}
            row
            space={'between'}
            alignCenter
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#CDD0D9',
            }}
            onPress={showModal}>
            <Block>
              <Text bold color={'#EA8025'}>
                Khuyến mãi
              </Text>
              <Text>Bấm vào để chọn khuyến mãi</Text>
            </Block>
            <Icon name="right" size={18} />
          </Button>
          <Block
            padding={5}
            row
            space={'between'}
            style={{
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: '#CDD0D9',
            }}>
            <Text>Giảm:</Text>
            <Text color={'#EA8025'}>{percent}%</Text>
          </Block>
          <Block padding={5} row space={'between'}>
            <Text bold>Thành tiền</Text>
            <Text color={'#EA8025'} bold>
              {percent === 0 ? totalA : totalA - ((totalA * percent) / 100)}đ
            </Text>
          </Block>
        </Block>
      </ScrollView>
      <Footer
        title={` ${dataCart.length} món trong giỏ hàng`}
        price={`${percent === 0 ? totalA : totalA - ((totalA * percent) / 100)}đ`}
        onPress={() => addOrder()}
      />

      <Modal visible={visible} onDismiss={hideModal1} contentContainerStyle={containerStyle}>
        <Image
          style={{
            width: WIDTH / 3,
            height: WIDTH / 2,
          }}
          source={require('../../constants/icons/logo.png')}
          resizeMode="center"
        />
        <Text
          style={{
            color: COLORS.black,
            fontWeight: 'bold',
            fontSize: 16,
            fontStyle: 'normal',
          }}>
          KHUYẾN MÃI HIỆN CÓ
          </Text>
        {isLoading ?
          <LottieView
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={require('../../../assets/8707-loading.json')}
            autoPlay
            loop
          /> :
          dataDiscount.length == 0 ? <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.textOrange }}>BẠN CHƯA CÓ KHUYẾN MÃI !</Text></View>
            :
            <FlatList
              data={dataDiscount}
              keyExtractor={(item) => item._idDiscount._id}
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
                    }} onPress={() => hideModal(item._idDiscount._id, item._idDiscount.percent)}>
                    {/* <View
                  style={{
                    backgroundColor: '#def0d6',
                    width: WIDTH / 7,
                    height: WIDTH / 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: '#4a8a29',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {item?._idDiscount?.cost}
                  </Text>
                </View> */}

                    <View style={{ width: WIDTH / 2 + 50 }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                        numberOfLines={2}>
                        Giảm {item?._idDiscount?.percent}% với{' '}
                        {item?._idDiscount?.title}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.blue,
                          fontSize: 14,
                          marginTop: 1,
                          marginLeft: 3,
                        }}>
                        Ngày hết hạn:{' '}
                        {moment(item?._idDiscount?.dateEnd).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />}

      </Modal>
    </SafeAreaView>
  );
};

export default Payment;
