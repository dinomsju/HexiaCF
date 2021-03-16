import React, {useState } from 'react'
import {SafeAreaView, StyleSheet, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {Button, Block, Text} from '../../components'
import Header from '../Header/HeaderLocation';
import Icon from 'react-native-vector-icons/AntDesign'
const EditLocation = () => {

  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header title="ĐỊA CHỈ NHẬN HÀNG" onPress={() => console.log(`${address}, ${selectedCommune}, ${selectedDistrict}, ${selectedCity}`)}/>
        <Block backgroundColor={'white'} paddingHorizontal={10} paddingVertical={5}>
            <Block 
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Họ tên người nhận</Text>
                <TextInput
        style={styles.input}
        value={userName}
        placeholder='Nhập tên người nhận'
      />
            </Block>
            <Block 
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Số điện thoại người nhận</Text>
                <TextInput
        style={styles.input}
        value={phone}
        placeholder='Nhập số điện thoại người nhận'
        onChangeText={(value) => setPhone(value)}
      />
            </Block>
            <Block 
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Email người nhận</Text>
                <TextInput
        style={styles.input}
        value={email}
        placeholder='Nhập Email người nhận'
      />
            </Block>
            <Block 
            row
            alignCenter
            space={'between'}
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Tỉnh / Thành phố</Text>
                <Picker
        selectedValue={selectedCity}
        style={{ height: 50, width: 222 }}
        onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
      >
        <Picker.Item label="TP. Hồ Chí Minh" value="TP. Hồ Chí Minh" />
      </Picker>
            </Block>
            <Block 
            row
            alignCenter
            space={'between'}
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Quận / Huyện</Text>
                <Picker
        selectedValue={selectedDistrict}
        style={{ height: 50, width: 222 }}
        onValueChange={(itemValue, itemIndex) => setSelectedDistrict(itemValue)}
      >
        <Picker.Item label="Quận Bình Thạnh" value="Quận Bình Thạnh" />
      </Picker>
            </Block>
            <Block 
            row
            alignCenter
            space={'between'}
            style={{
              borderBottomWidth: 1,
              borderColor: '#CDD0D9',
            }}>
                <Text color={'#bebebe'} paddingVertical={5}>Phường / Xã</Text>
                <Picker
        selectedValue={selectedCommune}
        style={{ height: 50, width: 222 }}
        onValueChange={(itemValue, itemIndex) => setSelectedCommune(itemValue)}
      >
        <Picker.Item label="Phường 1" value="Phường 1" />
        <Picker.Item label="Phường 2" value="Phường 2" />
        <Picker.Item label="Phường 3" value="Phường 3" />
      </Picker>
            </Block>
            <Block >
            <Text color={'#bebebe'} paddingVertical={5}>Địa chỉ cụ thể(Số nhà, tên đường...)</Text>
            <TextInput
        style={styles.input}
        value={address}
        placeholder='Nhập Email người nhận'
      />
            </Block>
        </Block>
        </SafeAreaView>
    )
}

export default EditLocation

const styles = StyleSheet.create({
    input: {
      height: 40,
    },
  });
