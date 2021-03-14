import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, ScrollView} from 'react-native';
import {Block, Text, Button} from '../../components';
import Header from '../Header/HeaderPayment';
import {RadioButton} from 'react-native-paper';
//example
import {getProduct} from '../../api/productApi';
import Item from '../views/ItemPayment';

const Payment = () => {
  const [value, setValue] = useState('Giao hàng tận nơi');
  const [product, setProduct] = useState([
    {
      title: 'Cà phê sữa đá',
      soLuong: 1,
      imageUrl:
        'https://product.hstatic.net/1000075078/product/cfsd_615a3cb2b1e342d2b1986bfeb6572070_master.jpg',
    },
    {
      title: 'Trà bưởi mật ong',
      soLuong: 1,
      imageUrl:
        'https://product.hstatic.net/1000075078/product/cfsd_615a3cb2b1e342d2b1986bfeb6572070_master.jpg',
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="THANH TOÁN" />
      <ScrollView>
        <Block row marginHorizontal={10} marginVertical={5} space={'between'}>
          <Text bold size={14}>
            ĐỊA CHỈ NHẬN HÀNG
          </Text>
          <Button>
            <Text color={'#2400FF'}>Thay đổi</Text>
          </Button>
        </Block>
        <Block backgroundColor={'#fff'}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}>
            <Block row alignCenter>
              <RadioButton value="Giao hàng tận nơi" />
              <Text>Giao hàng tận nơi</Text>
            </Block>
            <Block row alignCenter>
              <RadioButton value="Nhận hàng tại quán" />
              <Text>Nhận hàng tại quán</Text>
            </Block>
          </RadioButton.Group>
          <Block marginHorizontal={10}>
            <Text bold size={15}>
              Nguyễn Duy Tân
            </Text>
            <Text color={'#848484'}>0375112018</Text>
            <Text color={'#848484'}>
              107/2 Hoàng Hoa Thám, Phường 6, Quận Bình Thạnh, TP. Hồ Chí Minh
            </Text>
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
            data={product}
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
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
