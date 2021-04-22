import React, { useState, useEffect } from 'react';
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
import { getUserByPhone } from '../../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login() {
  const navigation = useNavigation();
  const [userPhone, setUserPhone] = useState();
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const [check, setCheck] = useState(false);
  const [checkC, setCheckC] = useState(false);
  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setCheck(false)
    const confirmation = await auth().signInWithPhoneNumber(
      '+84' + phoneNumber,
    );
    setConfirm(confirmation);
    console.log('confirm ------> ' + confirmation);
  }
  checkPhone = () => {
    phone.length < 9
      ? setCheck(true)
      : phone.slice(0, 1) === '0'
        ? setCheck(true)
        : phone.length === ''
          ? setCheck(true)
          : signInWithPhoneNumber(phone);
  }
  checkCode = () => {
    code.length < 6 ? setCheckC(true) : code.length === '' ? setCheckC(true) : confirmCode()
  }
  // save phone in sotorage
  senData = (sdt) => {
    AsyncStorage.setItem('SDT', sdt);
  };

  async function confirmCode() {
    setCheckC(false)
    setCheck(false)
    try {
      await confirm.confirm(code);

    } catch (error) {
      console.log('Invalid code.', error);
    }

  }
  if (!confirm) {
    return (
      <View style={styles.container}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <Image
            style={styles.logo}
            source={require('../../constants/icons/logo.png')}
            resizeMode="center"
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
            maxLength={9}
            onChangeText={(text1) => setPhone(text1)}
          />
        </View>
        {
          check ? <Text style={{ marginBottom: 5, color: COLORS.hearRed, fontSize: 16, fontWeight: 'bold' }}>Số điện thoại chưa đúng định dạng</Text> : null
        }

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
          onPress={() => checkPhone()}>
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

        {/* <View style={{ marginVertical: 10 }}>
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
        </TouchableOpacity> */}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
        <Image
          style={styles.logo}
          source={require('../../constants/icons/logo.png')}
          resizeMode="center"
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
          maxLength={9}
          onChangeText={(text1) => setPhone(text1)}
        />
      </View>
      {
        check ? <Text style={{ marginBottom: 5, color: COLORS.hearRed, fontSize: 16, fontWeight: 'bold' }}>Số điện thoại chưa đúng định dạng</Text> : null
      }

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
        onPress={() => checkPhone()}>
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

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="code"
          value={code}
          keyboardType="number-pad"
          maxLength={11}
          onChangeText={(text) => setCode(text)}
        />
      </View>
      {
        checkC ? <Text style={{ marginBottom: 5, color: COLORS.hearRed, fontSize: 16, fontWeight: 'bold' }}>Mã của bạn chưa hợp lệ</Text> : null
      }
      <TouchableOpacity style={styles.login} onPress={() => checkCode()}>
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
    marginVertical: 5,
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
