import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {getUserByPhone} from '../../../../api/productApi';
import {getOrderByIdOrder, getOrderByUserId} from '../../../../api/orderApi';
import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
import moment from 'moment';
import {getDiscount} from '../../../../api/discountApi';
const Voucher = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getApi = await getDiscount();
    // console.log(getApi.data.Discount);
    setData(getApi.data.Discount);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return (
            <Button
              margin={10}
              radius={10}
              row
              space={'between'}
              justifyCenter
              alignCenter
              backgroundColor={'#eee'}
              padding={20}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Block>
                <Text size={15} marginVertical={5} bold>
                  Giảm {item.percent}% với {item.title}
                </Text>
                <Text color={'#29b6f6'} size={15} marginVertical={5}>
                  Ngày hết hạn: {moment(item.dateEnd).format('DD/MM/YYYY')}
                </Text>
              </Block>
            </Button>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Voucher;
