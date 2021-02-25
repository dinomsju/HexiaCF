import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
  console.log('datafake -----> ' + films.length);
  test = (item) => {
    console.log('title + id: ' + item.id + '----' + item.title);
  };
  return (
    <View style={styles.container}>
      {/* <FlatList
        numColumns={2}
        data={films}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => test(item)}>
            <Item item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
      /> */}
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Image
            style={styles.logo}
            source={{
              uri:
                'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
            }}
          />
        </View>

        <View style={{height: WIDTH / 2 - 20}}>
          <Swiper
            autoplay={true}
            autoplayTimeout={2}
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
            width: WIDTH - 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>THỰC ĐƠN</Text>
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
    width: WIDTH - 250,
    height: WIDTH - 250,
  },
  banner: {
    width: WIDTH - 20,
    height: WIDTH - 220,
    borderRadius: 5,
  },
});
