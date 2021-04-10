import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getOrderById, cancelOrderById} from '../../../../api/cartApi';
import Item from '../../../views/ItemPayment';
import auth from '@react-native-firebase/auth';
import {getDiscountByUser} from '../../../../api/discountApi';
import {FAB} from 'react-native-paper';
import moment from 'moment';
import {COLORS} from '../../../../constants';
import {getUserByPhone, updateUserByPhone} from '../../../../api/productApi';
import {WIDTH} from '../../../../constants/constants';
const MyVoucher = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [dataDiscount, setDataDiscount] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
    getDiscountUser();
  }, []);

  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
  };

  const getDiscountUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    const getApi = await getDiscountByUser(phone);
    setDataDiscount(getApi.data.Voucher);
  };

  // useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <FlatList
          data={dataDiscount}
          keyExtractor={(item) => item._idDiscount._id}
          renderItem={({item}) => {
            console.log('itemmmmmmmmmmmmmmm ', item);
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
                    Giảm {item._idDiscount.percent}% với{' '}
                    {item._idDiscount.title}
                  </Text>
                  <Text color={'#29b6f6'} size={15} marginVertical={5}>
                    Ngày hết hạn:{' '}
                    {moment(item._idDiscount.dateEnd).format('DD/MM/YYYY')}
                  </Text>
                </Block>
              </Button>
            );
          }}
        />
      </ScrollView>
      <FAB
        style={styles.fab}
        label={'POINT: ' + user?.point}
        color={COLORS.white}
      />
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
export default MyVoucher;
