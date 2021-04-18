import React, { useEffect, useState } from 'react';
import { Button, Block, Text } from '../../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../../../Header/HeaderPayment';
import { Alert, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';
import { getOrderById, cancelOrderById } from '../../../../api/cartApi';
import Item from '../../../views/ItemPayment';
import { getDiscount } from '../../../../api/discountApi';

const DetailOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route?.params;
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [value, setValue] = useState('0');
  const [discount, setDiscount] = useState();
  const [voucher, setVoucher] = useState()

  useEffect(() => {
    getOrder();
    getDiscounts();
  }, []);

  const getOrder = async () => {
    const getApi = await getOrderById(item?._id);
    setData(getApi.data.Order);
  };

  const getDiscounts = async () => {
    const getApi = await getDiscount()
    setDiscount(getApi.data.Discount)
  }

  const renderDelivery = (delivery) => {
    if (delivery === 1) {
      return (
        <Block row alignCenter>
          <RadioButton value="0" />
          <Text>Nhận hàng tại quán</Text>
        </Block>
      );
    } else {
      return (
        <Block row alignCenter>
          <RadioButton value="0" />
          <Text>Giao hàng tận nơi</Text>
        </Block>
      );
    }
  };

  let sl = data?.map((datas) => {
    let sll = datas?.products?.map((item) => {
      return item?.quality * item?._idProduct?.price;
    });
    return sll;
  });

  let totalA = sl?.map((item) => {
    return item?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );
  });

  const cancelOrder = async () => {
    const cancel = await cancelOrderById(item?._id);
    if (cancel) {
      setTimeout(() => {
        Alert.alert('Thành công', 'Huỷ đơn hàng thành công');
        navigation.goBack();
      }, 300);
    } else {
      Alert.alert('Oops!', 'Huỷ đơn hàng thất bại');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="CHI TIẾT ĐƠN HÀNG" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((item) => {
          const voucher = discount?.find(voucher => {
            return voucher._id == item.voucher
          })
          return (
            <Block>
              <Block
                row
                marginHorizontal={10}
                marginVertical={5}
                space={'between'}>
                <Text bold size={14}>
                  ĐỊA CHỈ NHẬN HÀNG
                </Text>
              </Block>
              <Block backgroundColor={'#fff'}>
                <Block marginHorizontal={10}>
                  <RadioButton.Group
                    onValueChange={(newValue) => setValue(newValue)}
                    value={value}>
                    {renderDelivery(item?.delivery)}
                  </RadioButton.Group>
                  <Block paddingLeft={5} paddingBottom={5}>
                    <Text bold size={15}>
                      {item?._uid?.name}
                    </Text>
                    <Text color={'#848484'}>
                      Sđt: 0{item?._uid?.phone?.slice(3)}
                    </Text>
                    <Text color={'#848484'}>
                      Địa chỉ: {item?._uid?.address}
                    </Text>
                  </Block>
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
                  data={item?.products}
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
                  source={require('../../../../constants/icons/icMoney.png')}
                  style={{ width: 35, height: 35 }}
                />
                <Text marginLeft={10} size={16}>
                  Thanh toán tiền mặt khi nhận hàng
                </Text>
              </Block>
              <Block backgroundColor={'white'} marginTop={10} padding={10}>
                <Block>
                  <Block
                    style={{
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      borderColor: '#CDD0D9',
                    }}>
                    <Text bold size={18}>
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
                    <Text bold>Tổng tạm tính:</Text>
                    <Text color={'#EA8025'}>{totalA}đ</Text>
                  </Block>

                  <Block>
                    <Block
                      padding={5}
                      row
                      space={'between'}
                      style={{
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#CDD0D9',
                      }}>
                      <Text bold>Mã giảm giá:</Text>
                      <Text color={'red'} bold>{voucher?.code ? voucher?.code : 'Không có'}</Text>
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
                      <Text bold>Giảm:</Text>
                      <Text color={'red'}>{voucher?.percent ? voucher?.percent : 0}%</Text>
                    </Block>
                    <Block padding={5} row space={'between'} alignCenter>
                      <Text bold size={16}>Thành tiền</Text>
                      <Text color={'#EA8025'} bold size={15}>
                        {voucher?.percent ? totalA - (totalA * (voucher?.percent / 100)) : totalA}đ
                  </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
              {item?.status === 0 ? (
                <Button
                  marginBottom={5}
                  marginTop={10}
                  radius={8}
                  padding={10}
                  backgroundColor={'black'}
                  marginHorizontal={20}
                  alignCenter
                  justifyCenter
                  onPress={() => cancelOrder()}>
                  <Text color={'white'} bold size={20}>
                    HUỶ ĐƠN HÀNG
                  </Text>
                </Button>
              ) : null}
            </Block>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailOrder;
