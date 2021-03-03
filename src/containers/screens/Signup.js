import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {COLORS, icons} from '../../constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Signup() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          }}
        />
      </View>

      <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 30}}>
        ĐĂNG KÝ
      </Text>
      <View style={{marginBottom: 20}}>
        <TextInput style={styles.textInput} placeholder="Name" />
      </View>
      <View style={{marginBottom: 20}}>
        <TextInput style={styles.textInput} placeholder="Phone" />
      </View>
      <View style={{marginBottom: 20}}>
        <TextInput style={styles.textInput} placeholder="Email" />
      </View>

      <View style={{marginBottom: 20}}>
        <TextInput style={styles.textInput} placeholder="Password" />
      </View>
      <View style={{marginBottom: 10}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.darkgray,
            width: WIDTH - 80,
            marginBottom: 5,
          }}></View>
        <Text
          style={{
            position: 'absolute',
            top: -11,
            left: 70,
            backgroundColor: COLORS.white,
            color: COLORS.darkgray,
            fontWeight: 'bold',
          }}>
          Hoặc đăng ký bằng Email
        </Text>
      </View>
      <View style={{marginBottom: 20, flexDirection: 'row',justifyContent:'space-between', width: WIDTH/4}}>
        <TouchableOpacity>
          <FontAwesome5 name={'google-plus-square'} color={'#EA4335'} size={40} />
        </TouchableOpacity>
    
        <TouchableOpacity>
          <FontAwesome5 name={'facebook-square'} color={'#3B5998'} size={40} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.push('Home')}>
        <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 24}}>
          ĐĂNG KÝ
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.darkgray, fontWeight: 'bold'}}>
          Bạn đã tài khoản thì nhấn vào?
        </Text>
        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={{color: COLORS.darkgray, fontWeight: 'bold'}}>
            {' '}
            Đăng nhập
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
