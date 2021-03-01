import React, {useState} from 'react';
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
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {songs} from '../../constants/data/song';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {Searchbar} from 'react-native-paper';
import Item from '../views/ItemDetailsCategory';
export default function DetailsCategory({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  console.log('seaerchquery +++++++++++++>>>>> ' + searchQuery);

  // test2 = (item) => {
  //   navigation.push('DetailsCategory');
  //   // console.log('title + id: ' + item.artist + '----' + item.title);
  // };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.header}
        source={{uri: 'https://img.anime47.com/imgur/6hhR2bl.jpg'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={COLORS.white} size={40} />
        </TouchableOpacity>
      </ImageBackground>
      <Text>header</Text>
      <View style={styles.footer}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cà phê</Text>
          {/* <TextInput style={styles.textInput}>
            <Icon name="arrow-back" color={COLORS.orange} size={20} />
            <Text>Tìm kiếm</Text>
          </TextInput> */}
          <Searchbar
            style={{borderRadius: 30}}
            placeholder="Tìm kiếm"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <FlatList
            style={{marginLeft: 10}}
            numColumns={1}
            data={songs}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => test2(item)}>
                <Item item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    width: WIDTH,
    height: WIDTH / 2,

    position: 'absolute',
    top: 20,
    left: 0,
    padding: 20,
  },
  footer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    top: WIDTH / 2.4,
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
});
