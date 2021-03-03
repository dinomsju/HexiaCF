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
export default function ItemNew({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <View style={styles.box}>
      <Image style={styles.image_box} source={{uri: item.imageUrl}} />
      {/* <FastImage
        source={{uri: item.image}}
        style={styles.image_box}
        resizeMode={FastImage.resizeMode.cover}
      /> */}
      <View style={{marginHorizontal: 15, marginVertical: 5}}>
        <Text
          style={styles.text_box_artist}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.text_box_title}>{item.artist}</Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: WIDTH / 2 - 20,
    height: WIDTH / 2,
    margin: 5,
    // backgroundColor: '#000',
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  image_box: {
    width: WIDTH / 2 - 20,
    height: WIDTH / 2 - 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text_box_title: {
    fontSize: 14,
    color: '#000',
    opacity: 0.4,
  },
  text_box_artist: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
