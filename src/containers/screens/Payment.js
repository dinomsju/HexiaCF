import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, Image, SafeAreaView, ScrollView} from 'react-native';
import {Block, Text, Button} from '../../components';
import Header from '../Header/HeaderPayment';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
//example
import {getProduct, getUserByPhone} from '../../api/productApi';
import Item from '../views/ItemPayment';
import Footer from '../Footer/FooterPayment';
import auth from '@react-native-firebase/auth';
import {addOrderById, updateAllCart, getCartByUser} from '../../api/cartApi';

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {dataCart} = route.params;
  const [value, setValue] = useState('0');
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [products, setProducts] = useState({});

  useEffect(() => {
    getUser();
  });

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
    const addOrder = await addOrderById(userId, value, dataCart);
    console.log('addOrder', addOrder);
    removeAllCart();
    navigation.push('Home');
  };

  let sl = dataCart?.map((dataCart, index) => {
    return dataCart.quality * dataCart?._idProduct.price;
  });

  let totalA = sl?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  return (
    <SafeAreaView style={{flex: 1}}>
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
          <Block marginHorizontal={10}>
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
            renderItem={({item}) => <Item item={item} />}
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
            style={{width: 35, height: 35}}
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
            onPress={() => navigation.navigate('Discount')}>
            <Block>
              <Text bold color={'#EA8025'}>
                Khuyến mãi
              </Text>
              <Text>Bấm vào để chọn khuyến mãi</Text>
            </Block>
            <Icon name="right" size={18} />
          </Button>
          <Block padding={5} row space={'between'}>
            <Text bold>Thành tiền</Text>
            <Text color={'#EA8025'} bold>
              {totalA}đ
            </Text>
          </Block>
        </Block>
      </ScrollView>
      <Footer
        title={` 1 món trong giỏ hàng`}
        price={`${totalA}đ`}
        onPress={() => addOrder()}
      />
    </SafeAreaView>
  );
};

export default Payment;
