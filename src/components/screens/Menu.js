import React from 'react';
import {StyleSheet, Text, View,FlatList,TouchableOpacity} from 'react-native';
import HeaderPro from '../Header/HeaderPro';
import Item from '../views/ItemNew';
import {films} from '../../constants/data/fakeData';
import {COLORS, icons} from '../../constants';
export default function Menu() {
  return (
    <View style={styles.container}>
      <HeaderPro />
      <FlatList
      style = {{marginLeft: 10}}
        numColumns={2}
        data={films}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => test(item)}>
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
    backgroundColor: COLORS.secondary
  },
});
