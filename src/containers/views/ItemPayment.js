import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {Button, Block, Text} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
export default function ItemPayment({item}) {
  const [number, setNumber] = useState(1);
  const [limit, setLimit] = useState(false);

  return (
    <SafeAreaView style={styles.box}>
      <Block
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Block
          style={{
            marginVertical: 5,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Image
            source={{uri: `${IMAGE_URL}${item?._idProduct?.imageUrl}`}}
            style={styles.image_box}
            resizeMode="cover"
          />
        </Block>
        <Block>
          <Block
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text bold size={16} ellipsizeMode="tail" numberOfLines={1}>
              {`${item?.quality}x ${item?._idProduct.title}`}
            </Text>
          </Block>
          <Block
            row
            space={'between'}
            alignCenter
            width={WIDTH / 1.8}
            marginTop={10}>
            <Block
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.textOrange,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {item?._idProduct.price}đ
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </SafeAreaView>
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
    width: WIDTH / 4,
    height: WIDTH / 4,
    borderRadius: 10,
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
