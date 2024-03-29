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
import {IMAGE_URL} from '../../api/BASE_URL'
export default function Item({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <View style={styles.box}>
      <Image style={styles.image_box} source={{uri: `${IMAGE_URL}${item.imageUrl}`}} />
      <View
        style={{marginHorizontal: 10, marginVertical: 5, alignItems: 'center'}}>
        {/* <Text style={styles.text_box_title}>{item.id}</Text> */}
        <Text
          style={styles.text_box_artist}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 3.5,
    height: WIDTH / 3 + 5,
    margin: 5.5,
    // backgroundColor: '#000',
    // borderRadius: 15,
    // backgroundColor: COLORS.white,
  },
  image_box: {
    width: WIDTH / 3.5,
    height: WIDTH / 3.5,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  text_box_title: {
    fontSize: 14,
    color: '#000',
  },
  text_box_artist: {
    color: '#000',
    fontSize: 16,
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
});
