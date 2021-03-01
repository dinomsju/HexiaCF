import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import HeaderPro from '../Header/HeaderPro';
import Item from '../views/ItemNew';
import {films} from '../../constants/data/fakeData';
import {songs} from '../../constants/data/song';
import {COLORS, icons} from '../../constants';
export default function Menu({navigation, route}) {
  console.log('test ----------->> ' + route.params.idcategory);
  test1 = (item) => {
    navigation.push('DetailsCategory');
    // console.log('title + id: ' + item.artist + '----' + item.title);
  };
  return (
    <View style={styles.container}>
      <HeaderPro title="THỰC ĐƠN" />
      <FlatList
        style={{marginLeft: 10}}
        numColumns={2}
        data={songs}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => test1(item)}>
            <Item item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
