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
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
export default function ItemSeller({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <View style={styles.box}>
      <Image
        style={styles.image_box}
        source={{uri: `${IMAGE_URL}${item.products[0].imageUrl}`}}
      />
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
          alignItems: 'center',
        }}>
        {/* <Text style={styles.text_box_title}>{item.id}</Text> */}
        <Text
          style={styles.text_box_artist}
          // ellipsizeMode="tail"
          numberOfLines={1}>
          {item.products[0].title}
        </Text>
        <Text
          style={styles.text_box_price}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {`${item.products[0].price}đ`}
        </Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 3.1,
    height: WIDTH / 3 + 5,
    margin: 5,
    // backgroundColor: '#000',
    // borderRadius: 15,
    // backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  image_box: {
    width: WIDTH / 3.4,
    height: WIDTH / 3.4,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius: 10,
  },
  text_box_title: {
    fontSize: 12,
    color: '#000',
  },
  text_box_artist: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  box_icon: {
    width: 25,
    height: 25,
    borderRadius: 14,
    backgroundColor: 'white',
    position: 'absolute',
    left: '75%',
    top: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_box_price: {
    color: COLORS.textOrange,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
