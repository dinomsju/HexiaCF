import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import HeaderPro from '../Header/HeaderPro';
import Item from '../views/ItemNew';
import {films} from '../../constants/data/fakeData';
import {songs} from '../../constants/data/song';
import {getCategory} from '../../api/categoryApi';
import {COLORS, icons} from '../../constants';
import LottieView from 'lottie-react-native';
export default function Menu() {
  const navigation = useNavigation();
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    let getApi = await getCategory();
    setCategory(getApi.data.categories);
  };
  if (category === undefined) {
    return (
      <LottieView
        style={{
          backgroundColor: '#ffffff',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={require('../../../assets/8707-loading.json')}
        autoPlay
        loop
      />
    );
  }
  return (
    <View style={styles.container}>
      <HeaderPro title="THỰC ĐƠN" />
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
