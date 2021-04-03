import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
  ToastAndroid,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {IMAGE_URL} from '../../api/BASE_URL';
import Footer from '../Footer/FooterDetailPro';
import auth from '@react-native-firebase/auth';
import {getUserByPhone} from '../../api/productApi';
import {addCartByID} from '../../api/cartApi';
import LottieView from 'lottie-react-native';
export default function DetailsProduct(props) {
  const navigation = useNavigation();
  const {product} = props.route.params;
  const [number, setNumber] = useState(1);
  const [limit, setLimit] = useState(false);
  const [hearColor, setHearColor] = useState(COLORS.textGray);
  const [condition, setCondition] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUser();
  }, []);
  console.log('product -------> ' + product.title);
  const numberPlus = (number) => {
    setNumber(number + 1);
    setLimit(false);
  };
  const numberMinus = (number) => {
    if (number > 1) {
      setNumber(number - 1);
    } else {
      setLimit(true);
    }
  };
  const addCart = () => {
    navigation.push('Home');

    console.log('addCart -------> ' + number);
    console.log('Tổng tiền -------->' + product.price * number);
    console.log('condition -------> ' + condition);
    console.log('hearColor -------> ' + hearColor);
  };

  addCartByIDUser = async () => {
    let addCart = await addCartByID(user._id, product._id, number);
    console.log('userrrrrr ------->>>> ', addCart);
    toastAndroid('Thêm vào giỏ hàng thành công!');
    navigation.push('Home');

    // console.log('id user -------> ' + user._id);
    // console.log('id product -------> ' + product._id);
    // console.log('number -------> ' + number);
  };
  const heartCondition = () => {
    setCondition(condition === false ? true : false);
  };
  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
    console.log('data-----------> ', getApi.data);
  };
  const toastAndroid = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
  };

  if (product === undefined) {
    return (
      <LottieView
        style={{
          backgroundColor: '#ffffff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={require('../../../assets/8707-loading.json')}
        autoPlay
        loop
      />
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.header}
          source={{uri: `${IMAGE_URL}${product.imageUrl}`}}>
          {/* <ImageBackground style={styles.header} source={{uri: product.imageUrl}}> */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color={COLORS.textOrange} size={40} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.footer}>
          {condition ? (
            <TouchableOpacity
              style={styles.heart}
              onPress={() => heartCondition()}>
              <Icon name="heart" color={COLORS.hearRed} size={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.heart}
              onPress={() => heartCondition()}>
              <Icon name="heart" color={COLORS.textGray} size={25} />
            </TouchableOpacity>
          )}

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
            {product.description}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={() => numberMinus(number)} disabled={limit}>
          <View
            style={{
              width: 100,
              height: 30,
              borderColor: 'gray',
              borderWidth: 2,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="remove" color={COLORS.textGray} size={30} />
          </View>
        </TouchableOpacity>

        <Text style={{paddingHorizontal: 10}}>{number}</Text>

        <TouchableOpacity onPress={() => numberPlus(number)}>
          <View
            style={{
              width: 100,
              height: 30,
              borderColor: 'gray',
              borderWidth: 2,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" color={COLORS.textGray} size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <Footer
        price={product.price * number}
        onPress={() => addCartByIDUser()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  header: {
    width: WIDTH,
    height: WIDTH - 60,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    padding: 20,
  },
  footer: {
    width: WIDTH,
    // height: HEIGH,
    position: 'relative',
    left: 0,
    top: -30,
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
  add: {
    width: WIDTH / 2,
    height: WIDTH / 9,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  heart: {
    position: 'absolute',
    top: -20,
    right: 30,
    // borderWidth: 0.3,
    borderWidth: 0.02,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    width: WIDTH_SCALE * 35,
    height: HEIGHT_SCALE * 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
