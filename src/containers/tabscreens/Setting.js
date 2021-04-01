import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {COLORS, icons} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {Modal} from 'react-native-paper';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getUserByPhone, updateUserByPhone} from '../../api/productApi';
import {Block, Text, Button} from '../../components';
export default function Setting() {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  };

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
  };
  const updateUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let editUser = await updateUserByPhone(phone, name, address);
    hideModal();
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('@auth');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    await AsyncStorage.removeItem('SDT');
    navigation.replace('Login');
  };

  const listItems = [
    {
      Icon: 'documents-outline',
      title: 'Quản lý đơn hàng',
      onPress: () => {
        navigation.navigate('OrderManage');
      },
    },
    {
      Icon: 'gift-outline',
      title: 'Mã khuyến mãi',
      onPress: () => {
        navigation.navigate('OrderManage');
      },
    },
    {
      Icon: 'wallet-outline',
      title: 'Thanh toán',
      onPress: () => {
        navigation.navigate('OrderManage');
      },
    },
    {
      Icon: 'ios-map-outline',
      title: 'Địa chỉ',
      onPress: () => {
        navigation.navigate('OrderManage');
      },
    },
    {
      Icon: 'log-out-outline',
      title: 'Đăng xuất',
      onPress: () => logOut(),
    },
  ];

  const renderButton = () =>
    listItems.map((value, index) => (
      <Button
        key={index}
        height={62.5}
        row
        alignCenter
        space={'between'}
        style={{
          borderBottomWidth: index == listItems.length - 1 ? 0 : 0.4,
          borderColor: '#808e95',
        }}
        onPress={value.onPress}>
        <Block row alignCenter>
          <Icon size={23} name={value.Icon} />
          <Text size={15} marginLeft={20}>
            {value.title}
          </Text>
        </Block>
        <AntIcon name="right" size={15} />
      </Button>
    ));

  return (
    <Block style={styles.container}>
      <Block
        style={{
          marginTop: 28,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Icon name="person-circle-sharp" color={COLORS.black} size={70} />
        <Block style={{paddingHorizontal: 10}}>
          <Text style={{paddingBottom: 10, fontSize: 14, fontWeight: 'bold'}}>
            {user?.name === null ? 'Ẩn danh' : user?.name}
          </Text>
          <Block
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.edit}>Chỉnh sửa tài khoản</Text>
            </TouchableOpacity>

            <Icon
              style={[styles.edit, styles.p]}
              name="chevron-forward"
              color={COLORS.black}
              size={20}
            />
          </Block>
        </Block>
      </Block>
      <Block marginHorizontal={10}>{renderButton()}</Block>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <TextInput
          style={styles.textInput}
          placeholder="Họ và tên"
          value={name}
          maxLength={20}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Địa chỉ"
          value={address}
          maxLength={50}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity style={styles.login} onPress={() => updateUser()}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 20,
              fontStyle: 'normal',
            }}>
            LƯU THAY ĐỔI
          </Text>
        </TouchableOpacity>
      </Modal>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.darkgray,
  },
  edit: {
    color: COLORS.textGray,
    fontSize: 14,
  },
  p: {
    padding: 5,
  },
  pl: {
    paddingLeft: 15,
  },
  textInput: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.lightGray3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  login: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.darkk,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
});
