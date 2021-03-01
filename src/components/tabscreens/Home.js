import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {films} from '../../constants/data/fakeData';
import Item from '../views/Item';
import Swiper from 'react-native-swiper';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  console.log('datafake -----> ' + films.length);
  test = (item) => {
    navigation.push('DetailsProduct' , {item})
    console.log('title + id: ' + item.id + '----' + item.title);
  };
  let datafilms;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{padding: 5}}>
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
        </View>
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
          <TouchableOpacity   onPress={() => navigation.push('Menu', {idcategory})}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // numColumns={2}
          data={films}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => test(item)}>
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
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            KHUYẾN MÃI
          </Text>
          <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
        </View>
        <FlatList
          // numColumns={2}
          data={films}
          horizontal
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => test(item)}>
              <Item item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
        />
      </ScrollView>
    </View>
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
