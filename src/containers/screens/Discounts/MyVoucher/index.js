import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../../../Header/HeaderPayment';
import {Alert, FlatList, Image, SafeAreaView, ScrollView} from 'react-native';
import {getOrderById, cancelOrderById} from '../../../../api/cartApi';
import Item from '../../../views/ItemPayment';

const MyVoucher = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text>vvbvbvbvbvbvbvbvbvbvbvb</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyVoucher;
