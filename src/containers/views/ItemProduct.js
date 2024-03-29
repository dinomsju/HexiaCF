import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  // Text,
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
import {Text} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
export default function ItemProduct({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <View style={styles.box}>
      <Image style={styles.image_box} source={{uri: item.imageUrl}} />
      <View style={{marginHorizontal: 10, marginVertical: 5}}>
        {/* <Text style={styles.text_box_title}>{item.id}</Text> */}
        <Text
          style={styles.text_box_artist}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text color={'#EA8025'} bold>
          {`${item.price}đ`}
        </Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 1.5,
    height: WIDTH / 2,
    margin: 5.5,
    backgroundColor: '#fff',
    borderRadius: 8,
    // backgroundColor: COLORS.white,
  },
  image_box: {
    width: WIDTH / 1.5,
    height: WIDTH / 2.8,
    borderRadius: 8,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  text_box_title: {
    fontSize: 14,
    color: '#000',
  },
  text_box_artist: {
    color: '#000',
    fontSize: 15,
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
