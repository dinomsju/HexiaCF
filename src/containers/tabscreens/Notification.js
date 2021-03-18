import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import HeaderPro from '../Header/Header';
import {getProduct} from '../../api/productApi';
import Item from '../views/ItemNotification';
export default function Notification({navigation}) {
  const [product, setProduct] = useState();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let getApi = await getProduct();
    const listTmp = getApi.data.products.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    setProduct(listTmp);
  };
  return (
    <View style={styles.container}>
      <HeaderPro title="THÔNG BÁO" />
      <FlatList
        numColumns={1}
        data={product}
        renderItem={({item}) => (
          <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('DetailsCategory', {data: item})
          // }
          >
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
