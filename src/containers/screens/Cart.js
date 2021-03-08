import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Header from '../Header/HeaderCart';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {COLORS, icons} from '../../constants';
import {getProduct} from '../../api/productApi';
import Item from '../views/ItemCart';
export default function Cart() {
  const [product, setProduct] = useState();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let getApi = await getProduct();
    setProduct(getApi?.data?.items);
  };
  return (
    <View style={styles.container}>
      <Header title="GIỎ HÀNG" />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Các món đã chọn
          </Text>
          <TouchableOpacity>
            <Text style={{color: COLORS.blue}}>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={1}
          data={product}
          renderItem={({item}) => (
            // <TouchableOpacity
            // // onPress={() =>
            // //   navigation.navigate('DetailsCategory', {data: item})
            // // }
            // >
            //   <Item item={item} />
            // </TouchableOpacity>
            <Item item={item} />
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
  },
});
