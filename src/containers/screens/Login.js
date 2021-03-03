import React, {useState} from 'react';
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
import {COLORS, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const navigation = useNavigation();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
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
      navigation.push('Home');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
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
      <View style={{marginBottom: 10}}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={phone}
          textContentType="telephoneNumber"
          onChangeText={(text1) => setPhone(text1)}
        />
      </View>
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phone)}
      />
      <View style={{marginVertical: 10}}>
        <TextInput
          style={styles.textInput}
          placeholder="code"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
      </View>
      <Button title="Confirm Code" onPress={() => confirmCode()} />

      {/* <View style={{marginBottom: 20}}>
        <TouchableOpacity style={styles.textInput}>
          <FontAwesome5
            name={'google-plus-square'}
            color={'#EA4335'}
            size={20}
          />
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
            Đăng nhập bằng Google
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 50}}>
        <TouchableOpacity style={styles.textInput}>
          <FontAwesome5 name={'facebook-square'} color={'#3B5998'} size={20} />
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
            Đăng nhập bằng Facebook
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={{marginVertical: 20}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.darkgray,
            width: WIDTH - 80,
            marginBottom: 20,
          }}></View>
        <Text
          style={{
            position: 'absolute',
            top: -11,
            left: 65,
            backgroundColor: COLORS.white,
            color: COLORS.darkgray,
            fontWeight: 'bold',
          }}>
          Hoặc đăng nhập bằng Email
        </Text>
      </View>

      <View style={{marginBottom: 20}}>
        <TextInput style={styles.textInput} placeholder="Email" />
      </View>

      <View style={{marginBottom: 20}}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.push('Home')}>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'normal',
          }}>
          ĐĂNG NHẬP
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.darkgray, fontWeight: 'bold'}}>
          Bạn đã tài khoản thì nhấn vào?
        </Text>
        <TouchableOpacity onPress={() => navigation.push('Signup')}>
          <Text style={{color: COLORS.darkgray, fontWeight: 'bold'}}>
            {' '}
            Đăng kí
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  logo: {
    width: WIDTH - 250,
    height: WIDTH - 250,
  },
  textInput: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.lightGray3,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
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