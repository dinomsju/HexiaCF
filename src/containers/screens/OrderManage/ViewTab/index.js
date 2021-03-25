import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {getUserByPhone} from '../../../../api/productApi';
import {getOrderByIdOrder, getOrderByUserId} from '../../../../api/orderApi';
import {ActivityIndicator, FlatList} from 'react-native';
import moment from 'moment';

const ViewTab = ({status}) => {
  const navigation = useNavigation();
  // const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [order, setOrder] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    getOrderByUserID();
  });

  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user?.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    // setUser(getApi?.data);
    setUserId(getApi?.data?._id);
  };

  const getOrderByUserID = async () => {
    const getApi = await getOrderByUserId(userId);
    if (getApi) {
      setOrder(
        getApi?.data?.Order?.filter((value) => {
          return value.status === status;
        }),
      );
    }
    setLoading(false);
  };

  return loading ? (
    <Block flex={1} alignCenter paddingTop={20}>
      <ActivityIndicator color={'#29b6f6'} />
    </Block>
  ) : (
    <FlatList
      data={order}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id.toString()}
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
                Mã đơn: {item._id}
              </Text>
              <Text color={'#29b6f6'} size={15} marginVertical={5}>
                Ngày tạo: {moment(item.createAt).format('DD/MM/YYYY hh:mm')}
              </Text>
            </Block>
          </Button>
        );
      }}
    />
  );
};

export default ViewTab;
