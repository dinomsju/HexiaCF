import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  ScrollView,
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
    console.log('data voucher --------->>> ', getApi.data.Voucher);
  };

  // useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <FlatList
          data={dataDiscount}
          keyExtractor={(item) => item._idDiscount._id}
          renderItem={({item}) => {
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
                }}>
                <View style={{width: WIDTH / 2 + 25}}>
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
                      {item?._idDiscount?.cost}
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
