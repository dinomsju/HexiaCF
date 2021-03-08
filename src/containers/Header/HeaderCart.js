import React from 'react';
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
import {WIDTH} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';

const HeaderCart = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#404040"
        translucent={true}
      />
      {/* <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.images}
            /> */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color={COLORS.orange} size={30} />
      </TouchableOpacity> */}
      <Image
        style={styles.logo}
        source={{
          uri:
            'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
        }}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="remove" color={COLORS.black} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCart;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 55,
    marginTop: 28,
    backgroundColor: COLORS.white,
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
