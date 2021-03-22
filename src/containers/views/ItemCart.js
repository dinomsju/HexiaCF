import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
import auth from '@react-native-firebase/auth';
import {getUserByPhone, updateCartByID} from '../../api/cartApi';
export default function ItemCart({item, onPress}) {
  const [number, setNumber] = useState(item.quality);
  const [limit, setLimit] = useState(false);
  const [price, setPrice] = useState(item?._idProduct.price);
  const [total, setTotal] = useState(item.quality * item._idProduct.price);
  const [userItem, setUserItem] = useState();
  const Plus = (number, price) => {
    setNumber(number + 1);
    setLimit(false);
  };
  const Minus = (number) => {
    if (number > 1) {
      setNumber(number - 1);
    } else {
      setLimit(true);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  getUser = async () => {
    const userAuth = auth().currentUser;
    const phone = userAuth.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUserItem(getApi.data);
  };
  // console.log('number', item.quality);
  // console.log('price', item?._idProduct?.price);
  console.log('id', item._idProduct._id);
  console.log('user123456 ', userItem);

  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            // marginHorizontal: 5,
            marginVertical: 5,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <Image
            source={{uri: `${IMAGE_URL}${item?._idProduct?.imageUrl}`}}
            style={styles.image_box}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: WIDTH / 1.8,
              marginBottom: 30,
            }}>
            <Text
              style={styles.text_box_name}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item?._idProduct?.title}
            </Text>
            <TouchableOpacity onPress={onPress}>
              <FontAwesome name="remove" color={COLORS.textGray} size={25} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: WIDTH / 1.8,
              marginRight: 10,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity onPress={() => Minus(number)} disabled={limit}>
                <Icon
                  name="remove-circle-outline"
                  color={COLORS.textGray}
                  size={25}
                />
              </TouchableOpacity>

              <Text style={{paddingHorizontal: 10}}>{number}</Text>

              <TouchableOpacity onPress={() => Plus(number)}>
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
                alignItems: 'baseline',
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
                {number * price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 1.03, // height: WIDTH,
    margin: 5,
    // backgroundColor: '#000',
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  image_box: {
    width: WIDTH / 3,
    height: WIDTH / 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text_box_content: {
    fontSize: 13,
    color: COLORS.textGray,
    // opacity: 0.4,
  },
  text_box_name: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_box_price: {
    color: COLORS.textOrange,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
