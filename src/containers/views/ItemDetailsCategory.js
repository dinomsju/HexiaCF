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
import FastImage from 'react-native-fast-image';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
export default function ItemDetailsCategory({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <View style={styles.box}>
      {/* <Image style={styles.image_box} source={{uri: item.thumb}} /> */}
      <View
        style={{
          // marginHorizontal: 5,
          marginVertical: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={styles.text_box_name}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={styles.text_box_content}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {item.description}
          </Text>
          <Text
            style={styles.text_box_price}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {`${item.price}đ`}
          </Text>
        </View>
        <FastImage
          source={{uri: `${IMAGE_URL}${item.imageUrl}`}}
          style={styles.image_box}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 1.2,
    // height: WIDTH,
    margin: 5,
    // backgroundColor: '#000',
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  image_box: {
    width: WIDTH / 4.5,
    height: WIDTH / 4.5,
    borderRadius: 10,
  },
  text_box_content: {
    fontSize: 13,
    color: COLORS.textGray,
    // opacity: 0.4,
    width: 230,
  },
  text_box_name: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    width: 220,
  },
  text_box_price: {
    color: COLORS.textOrange,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
