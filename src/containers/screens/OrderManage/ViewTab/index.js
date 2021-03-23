import React, {useEffect, useState} from 'react';
import {Button, Block, Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {getUserByPhone} from '../../../../api/productApi';
import {getOrderByUserId} from '../../../../api/orderApi';

const ViewTab = ({status}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [data, setData] = useState([]);

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

  const getOrderByUserID = async () => {
    const getApi = await getOrderByUserId(userId);
    console.log(getApi.data);
  };

  return (
    <Block>
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
        <Block width={'75%'}>
          <Text
            size={18}
            color="blue"
            style={{fontWeight: 'bold'}}
            marginVertical={5}>
            Hello World
          </Text>
        </Block>
      </Button>
    </Block>
  );
};

export default ViewTab;
