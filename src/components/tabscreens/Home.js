import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {films} from '../../constants/data/fakeData';
import Item from '../views/Item'
export default function Home() {
    console.log('datafake -----> ' + films.length);
    test = (item) => {
        console.log("title + id: " +item.id+'----'+ item.title);
    }
  return (
    <View style={styles.container}>
      <FlatList
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
        backgroundColor: COLORS.darkgray,
        alignItems: 'center',
      },
});
