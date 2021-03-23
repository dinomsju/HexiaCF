import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {greaterOrEq} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, icons} from '../../constants';
import {HEIGHT, WIDTH} from '../../constants/constants';

const FooterPayment = ({title, price, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#404040"
        translucent={true}
      />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 12, color: COLORS.white}}>{title}</Text>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: COLORS.white}}>
          {price}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.textOrange,
          width: WIDTH / 2,
          height: HEIGHT / 22,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={onPress}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: COLORS.white}}>
          THANH TOÁN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FooterPayment;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 55,
    backgroundColor: COLORS.footer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.19,
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: WIDTH / 8,
    height: WIDTH / 8,
  },
});
