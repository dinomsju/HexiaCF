import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert, FlatList, Image, SafeAreaView, ScrollView} from 'react-native';
import {getOrderById, cancelOrderById} from '../../../../api/cartApi';
import Item from '../../../views/ItemPayment';
import auth from '@react-native-firebase/auth';
import {getDiscountByUser} from '../../../../api/discountApi';
const MyVoucher = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dataDiscount, setDataDiscount] = useState([]);

  useEffect(() => {
    getDiscountUser();
  }, []);

  const getDiscountUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    const getApi = await getDiscountByUser(phone);
    setDataDiscount(getApi.data.Voucher[0]);
  };
  // useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text>{dataDiscount._id}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyVoucher;
