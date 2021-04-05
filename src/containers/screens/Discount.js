import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {Block, Text, Button} from '../../components';
import Header from '../Header/HeaderPayment';
import {getDiscount} from '../../api/discountApi';
import moment from 'moment';

const Discount = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const getApi = await getDiscount();
    console.log(getApi.data.Discount);
    setData(getApi.data.Discount);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Phiếu ưu đãi của bạn" />
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

export default Discount;
