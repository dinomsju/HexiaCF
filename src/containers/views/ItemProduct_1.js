import React, {Component, useEffect, useState, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {WIDTH} from '../../constants/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
import {Block, Button, Text} from '../../components';
export default function ItemProduct_1({item}) {
  return (
    // <TouchableOpacity style={home.box} key={i} onPress={() => changeCategory(c)}>
    <Block>
      {/* <Image style={styles.image_box} source={{uri: item.thumb}} /> */}
      <Block
        style={{
          // marginHorizontal: 5,
          marginVertical: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <FastImage
          source={{uri: `${IMAGE_URL}${item.imageUrl}`}}
          style={styles.image_box}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Block justifyCenter paddingLeft={10}>
          <Text
            style={styles.text_box_name}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={styles.text_box_content}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.artist}
          </Text>
          <Text
            style={styles.text_box_price}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {`${item.price}đ`}
          </Text>
        </Block>
      </Block>
    </Block>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image_box: {
    width: WIDTH / 4.5,
    height: WIDTH / 4.5,
    borderRadius: 10,
  },
  text_box_content: {
    fontSize: 13,
    color: COLORS.textGray,
    // opacity: 0.4,
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
