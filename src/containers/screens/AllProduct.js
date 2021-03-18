import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import HeaderPro from '../Header/HeaderPro';
import Item from '../views/ItemNew';
import {COLORS, icons} from '../../constants';
import {getProduct} from '../../api/productApi';
export default function Menu() {
  const navigation = useNavigation();
  const [category, setCategory] = useState();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let getApi = await getProduct();
    setCategory(getApi.data.products);
  };

  return (
    <View style={styles.container}>
      <HeaderPro title="TẤT CẢ SẢN PHẨM" />
      <FlatList
        style={{marginLeft: 10}}
        numColumns={2}
        data={category}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsProduct', {data: item})}>
            <Item item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
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
