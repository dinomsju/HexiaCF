import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {films} from '../../constants/data/fakeData';
import Item from '../views/Item';
import ItemProduct from '../views/ItemProduct';
import Swiper from 'react-native-swiper';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getCategory} from '../../api/categoryApi';
import {getProduct} from '../../api/productApi';

export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);

  const getAllCategory = async () => {
    let getApi = await getCategory();
    setCategory(getApi.data.items);
  };
  const getAllProduct = async () => {
    let getApi = await getProduct();
    setProduct(getApi.data.items);
  };

  return (
    <SafeAreaView style={styles.container}>
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
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Icon name="location-sharp" color={COLORS.orange} size={20} />
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              107 Hoàng Hoa Thám, Phường 6 , Quận Bình Thạnh
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
          keyExtractor={(item) => item.title}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>SẢN PHẨM MỚI</Text>
          <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
        </View>
        <FlatList
          // numColumns={2}
          data={product}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsProduct', {product: item})
              }>
              <ItemProduct item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
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
