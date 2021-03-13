import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Header from '../Header/Header';
import {getCategory} from '../../api/categoryApi';
import Item from '../views/ItemLike';
export default function Profile({navigation}) {
  const [category, setCategory] = useState();

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    let getApi = await getCategory();
    setCategory(getApi.data);
  };
  return (
    <View style={styles.container}>
      <Header title="YÊU THÍCH" />
      <FlatList
        style={{marginLeft: 10}}
        numColumns={2}
        data={category}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
