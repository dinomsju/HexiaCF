import React, {useEffect, useState} from 'react';
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
import Swiper from 'react-native-swiper';
import auth from '@react-native-firebase/auth';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getCategory} from '../../api/categoryApi';
import {getProduct, getUserByPhone} from '../../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from '../../components';

export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    getAllCategory();
    getAllProduct();
    getUser();
  }, []);

  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
    console.log(getApi.data);
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
        <View style={{height: WIDTH / 2 - 20}}>
          <Swiper
            autoplay={true}
            autoplayTimeout={3}
            paginationStyle={{height: WIDTH / 2 - 240}}
            dotColor={'#bebebe'}
            showsPagination={true}>
            {films.map((item) => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => console.log(item)}>
                    <Image
                      style={styles.banner}
                      source={{
                        uri: item.thumb,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Swiper>
        </View>

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
  banner: {
    width: WIDTH - 20,
    height: WIDTH - 220,
    borderRadius: 5,
  },
});
