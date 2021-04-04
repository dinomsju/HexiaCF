import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../Header/Header';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {films} from '../../constants/data/fakeData';
import Item from '../views/Item';
// import ItemProduct from '../views/ItemProduct';
import ItemProduct from '../views/ItemProduct_1';
import ItemSeller from '../views/ItemSeller';
import auth from '@react-native-firebase/auth';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getCategory} from '../../api/categoryApi';
import {
  getProduct,
  getUserByPhone,
  getBanner,
  getBestProduct,
} from '../../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from '../../components';
import {IMAGE_URL} from '../../api/BASE_URL';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [dataBanner, setDataBanner] = useState([]);
  const [user, setUser] = useState();
  const [page, setPage] = useState();
  const carouselRef = useRef(null);
  const [bestProduct, setBestProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllBanner();
    getAllCategory();
    getAllProduct();
    getBestSeller();
    getUser();
  }, []);

  const getAllBanner = async () => {
    let getApiBanner = await getBanner();
    setIsLoading(false);
    setDataBanner(getApiBanner?.data);
    console.log('getApiBanner ------->>> ', getApiBanner.data);
  };
  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    // setIsLoading(false);
    setUser(getApi.data);
    // console.log(getApi.data);
  };

  const getAllCategory = async () => {
    let getApi = await getCategory();
    // setIsLoading(false);
    setCategory(getApi.data);
  };

  const getAllProduct = async () => {
    let getApi = await getProduct();
    const listTmp = getApi.data.products.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    // setIsLoading(false);
    setProduct(listTmp);
  };

  const getBestSeller = async () => {
    let getApi = await getBestProduct();

    // let dataSeller = getApi.data?.map((data, index) => {
    //   return data.products;
    // });
    setBestProduct(getApi.data);
    // getApi.data.forEach(function (element) {
    //   console.log('best seller ------> 00001 ', element.products);
    //   setBestProduct(element.products);
    // });
    // var data = getApi.data.filter(function (data) {
    //   data.products.forEach(function (hoang) {
    //     console.log('best seller ------> 111111', hoang);
    //     setBestProduct(hoang);
    //   });
    //   // return data.products;
    // });
    // console.log('best seller ------> 111111 ', data);
  };

  if (isLoading) {
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
    <SafeAreaView style={styles.container}>
      <Header title="TRANG CHỦ"></Header>
      <ScrollView>
        <TouchableOpacity style={{padding: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              opacity: 0.3,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                paddingRight: 5,
                color: COLORS.black,
              }}>
              ĐỊA CHỈ
            </Text>
            <Icon name="chevron-down-outline" color={COLORS.black} size={20} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Icon name="location-sharp" color={COLORS.orange} size={20} />
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              {user?.address}
            </Text>
          </View>
        </TouchableOpacity>

        <Swiper
          style={styles.wrapper}
          loop={true}
          autoplay
          showsPagination
          dotColor={COLORS.white}
          autoplayTimeout={2}>
          {dataBanner?.map((value, index) => (
            <Image
              resizeMode={'cover'}
              style={{width: WIDTH - 20, height: WIDTH / 2}}
              source={{uri: `${IMAGE_URL}${value.imageUrl}`}}
            />
          ))}
        </Swiper>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>THỰC ĐƠN</Text>
          <TouchableOpacity
            onPress={() => navigation.push('Menu', {idcategory})}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // numColumns={2}
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsCategory', {data: item})
              }>
              <Item item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            SẢN PHẨM BÁN CHẠY NHẤT
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          // numColumns={2}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bestProduct}
          renderItem={({item}) => (
            <Button
              margin={5}
              radius={10}
              row
              space={'between'}
              justifyCenter
              alignCenter
              backgroundColor={'#F9F9F9'}
              padding={20}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate('DetailsProduct', {
                  product: item.products[0],
                })
              }>
              <ItemSeller item={item} />
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>SẢN PHẨM</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // numColumns={2}
          data={product}
          renderItem={({item}) => (
            <Button
              margin={5}
              radius={10}
              row
              space={'between'}
              justifyCenter
              alignCenter
              backgroundColor={'#F9F9F9'}
              padding={20}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate('DetailsProduct', {product: item})
              }>
              <ItemProduct item={item} />
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.darkgray,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: WIDTH / 10,
    height: WIDTH / 10,
  },
  wrapper: {
    height: WIDTH / 2 + 10,
    paddingTop: 10,
  },
});
