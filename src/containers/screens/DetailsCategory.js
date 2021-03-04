import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import {getProductByCat} from '../../api/productApi';
export default function DetailsCategory(props) {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [product, setProduct] = useState([]);
  const {data} = props.route.params;
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let getApi = await getProductByCat(data._id);
    setProduct(getApi.data.items);
  };

  return (
    <View style={styles.container}>
        <ScrollView>
      <ImageBackground
        style={styles.header}
        source={{uri: 'https://img.anime47.com/imgur/6hhR2bl.jpg'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={COLORS.white} size={40} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.footer}>
        <View style={{alignItems: 'center', flex: 1, marginBottom: 90}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 10}}>
            {data.title}
          </Text>
          {/* <TextInput style={styles.textInput}>
            <Icon name="arrow-back" color={COLORS.orange} size={20} />
            <Text>Tìm kiếm</Text>
          </TextInput> */}
          <Searchbar
            style={{borderRadius: 30, marginBottom: 5}}
            placeholder="Tìm kiếm"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          {product.length === 0 ? (
            <Text style={styles.alertWarning}>Tìm thấy (0) kết quả!</Text>
          ) : (
            <FlatList
              style={{marginLeft: 10}}
              numColumns={1}
              data={product}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailsProduct', {product: item})
                  }>
                  <Item item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.title}
            />
          )}
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
   
  },
  header: {
    width: WIDTH,
    height: WIDTH / 2,
    padding: 20,
  },
  footer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
    left: 0,
    top: -25,
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
  alertWarning: {
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc',
    padding: 10,
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8a6d3b',
    fontSize: 20,
  },
});
