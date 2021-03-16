
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import { COLORS, icons } from '../../constants';
import SignUp from '../../api/userApi';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import { Modal } from 'react-native-paper';
export default function Login() {
  const navigation = useNavigation();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

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
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+84' + phoneNumber,
    );
    setConfirm(confirmation);
    console.log('------> ' + confirmation);
  }

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+84906288042')}
  //     />
  //   );
  // }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      setVisible(true);
    } catch (error) {
      console.log('Invalid code.', error);
    }
  }
  check = async () => {
    console.log('phone ------->   ', phone);
    console.log('name ------->   ', name);
    console.log('address ------->   ', address);
    
    let SignUpFetch = await SignUp(
      phone, name, address
    )
    console.log('userrrrrr ------->>>> ' + SignUpFetch)
    navigation.push('Home');
  }
  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          }}
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 30,
          fontStyle: 'normal',
        }}>
        ĐĂNG NHẬP
      </Text>
      <View style={styles.textInput}>
        <Text style={{ marginRight: 10 }}>+84</Text>
        <TextInput
          style={{ width: WIDTH - 120, height: WIDTH / 7.4 }}
          placeholder="Phone"
          value={phone}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          maxLength={11}
          onChangeText={(text1) => setPhone(text1)}
        />
      </View>
      {/* <View style={{marginVertical: 10}}>
        <TextInput
          style={styles.textInput}
          placeholder="code"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
      </View>
      <Button title="Confirm Code" onPress={() => confirmCode()} /> */}

      <TouchableOpacity
        style={styles.login}
        onPress={() => signInWithPhoneNumber(phone)}>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'normal',
          }}>
          GỬI CODE
        </Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 10 }}>
        <TextInput
          style={styles.textInput}
          placeholder="code"
          value={code}
          keyboardType="number-pad"
          maxLength={11}
          onChangeText={(text) => setCode(text)}
        />
      </View>

      <TouchableOpacity style={styles.login} onPress={() => confirmCode()}>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'normal',
          }}>
          CHECK MÃ
        </Text>
      </TouchableOpacity>

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
        <TouchableOpacity style={styles.login} onPress={() => check()}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 20,
              fontStyle: 'normal',
            }}>
            LƯU THÔNG TIN
        </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: WIDTH - 250,
    height: WIDTH - 250,
  },
  textInput: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.lightGray3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
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
  },
  action: {
    flexDirection: 'row',
  },
});