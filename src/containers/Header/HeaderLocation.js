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
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {WIDTH} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';

const HeaderLocation = ({title, onPress, backgroundColor, color}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#404040"
        translucent={true}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" color={COLORS.black} size={30} />
      </TouchableOpacity>
      <Text style={[{fontSize: 18, fontWeight: 'bold', marginLeft: 10}, {color}]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Icon name="md-checkmark-sharp" color={COLORS.black} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLocation;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 55,
    marginTop: 28,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderWidth: 0.19,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between'
  },
  logo: {
    width: WIDTH / 8,
    height: WIDTH / 8,
  },
});
