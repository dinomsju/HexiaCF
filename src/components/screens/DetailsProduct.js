import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {songs} from '../../constants/data/song';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {Searchbar} from 'react-native-paper';
import Item from '../views/ItemDetailsCategory';
export default function DetailsProduct({navigation, route}) {
  let product = route.params.item;
  const [number, setNumber] = useState(1);
  const [limit, setLimit] = useState(false);
  // test2 = (item) => {
  //   navigation.push('DetailsCategory');
  //   // console.log('title + id: ' + item.artist + '----' + item.title);
  // };
  numberPlus = (number) => {
    setNumber(number + 1);
    console.log(number);
  };
  numberMinus = (number) => {
    setNumber(number - 1);

    console.log(number);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={{uri: 'https://img.anime47.com/imgur/6hhR2bl.jpg'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={COLORS.white} size={40} />
        </TouchableOpacity>
      </ImageBackground>
      <Text>header</Text>
      <View style={styles.footer}>
        <View style={{}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: COLORS.black,
              paddingTop: 10,
            }}>
            Mô tả
          </Text>
          <Text
            style={{fontSize: 18, color: COLORS.textGray, paddingTop: 10}}
            ellipsizeMode="tail">
            {product.id}
          </Text>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => numberMinus(number)}
              disabled={limit}>
              <Icon
                name="remove-circle-outline"
                color={COLORS.textGray}
                size={25}
              />
            </TouchableOpacity>

            <Text style={{paddingHorizontal: 10}}>{number}</Text>

            <TouchableOpacity onPress={() => numberPlus(number)}>
              <Icon
                name="add-circle-outline"
                color={COLORS.textGray}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
             flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems:'baseline',
            paddingTop: 20,
            }}>
            <Text
              style={{
                color: COLORS.textOrange,
                fontSize: 20,
                fontWeight: 'bold',
              }}
              ellipsizeMode="tail"
              numberOfLines={1}>
              32.000đ
            </Text>
            <TouchableOpacity style={styles.login}>
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: 14,
                  fontStyle: 'normal',
                }}>
                THÊM VÀO GIỎ HÀNG
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    width: WIDTH,
    height: WIDTH,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  footer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    top: WIDTH - 60,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
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
    width: WIDTH / 2,
    height: WIDTH / 11,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});
