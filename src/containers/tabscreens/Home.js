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

import auth from '@react-native-firebase/auth';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getCategory} from '../../api/categoryApi';
import {getProduct, getUserByPhone, getBanner} from '../../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from '../../components';
import {IMAGE_URL} from '../../api/BASE_URL';

import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [dataBanner, setDataBanner] = useState([]);
  const [user, setUser] = useState();
  const [page, setPage] = useState();
  const carouselRef = useRef(null);
  const [acTive, setActive] = useState(0);
  useEffect(() => {
    getAllBanner();
    getAllCategory();
    getAllProduct();
    getUser();
  }, []);

  const getAllBanner = async () => {
    let getApiBanner = await getBanner();
    setDataBanner(getApiBanner?.data);

    console.log('getApiBanner ------->>> ', getApiBanner.data);
  };
  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
    // console.log(getApi.data);
  };

  const getAllCategory = async () => {
    let getApi = await getCategory();
    setCategory(getApi.data);
  };

  const getAllProduct = async () => {
    let getApi = await getProduct();
    const listTmp = getApi.data.products.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    setProduct(listTmp);
  };
  // console.log('banner ------->>> ', dataBanner);
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: `${IMAGE_URL}${item.imageUrl}`}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        {/* <Image
          style={styles.image}
          source={{uri: `${IMAGE_URL}${item.imageUrl}`}}
        /> */}
      </View>
    );
  };

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

        <Carousel
          onSnapToItem={(index) => setActive(index)}
          autoplay={true}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          autoplayDelay={1500}
          loop={true}
          enableSnap={true}
          ref={carouselRef}
          sliderWidth={WIDTH}
          sliderHeight={WIDTH}
          itemWidth={WIDTH - 30}
          data={dataBanner}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
        <Pagination
          dotsLength={dataBanner.length}
          activeDotIndex={acTive}
          animatedTension={0}
          animatedDuration={0}
          containerStyle={{
            position: 'absolute',
            top: WIDTH / 2 + 5,
            left: WIDTH - 300,
            // backgroundColor: 'rgba(0, 0, 0, 0.75)',
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
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
  item: {
    width: WIDTH - 50,
    height: WIDTH - 200,
    // backgroundColor: 'blue',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
