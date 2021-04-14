import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Header from '../Header/Header';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {films} from '../../constants/data/fakeData';
import Item from '../views/Item';
// import ItemProduct from '../views/ItemProduct';
import ItemProduct from '../views/ItemProduct_1';
import ItemSeller from '../views/ItemSeller';
import auth from '@react-native-firebase/auth';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import {getCategory} from '../../api/categoryApi';
import {
  getProduct,
  getUserByPhone,
  getBanner,
  getBestProduct,
} from '../../api/productApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text} from '../../components';
import {IMAGE_URL} from '../../api/BASE_URL';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import {Modal} from 'react-native-paper';
import SignUp from '../../api/userApi';
export default function Home() {
  const navigation = useNavigation();
  const [idcategory, setIDCategory] = useState('ps09830');
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [dataBanner, setDataBanner] = useState([]);
  const [user, setUser] = useState();
  const [page, setPage] = useState();
  const carouselRef = useRef(null);
  const [bestProduct, setBestProduct] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUserByCheck();
    getAllBanner();
    getAllCategory();
    getAllProduct();
    getBestSeller();
    getUser();
  }, []);

  const hideModal = () => setVisible(false);

  const getAllBanner = async () => {
    let getApiBanner = await getBanner();
    setIsLoading(false);
    setDataBanner(getApiBanner?.data);
  };
  const getUser = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    setUser(getApi.data);
  };

  const getAllCategory = async () => {
    let getApi = await getCategory();
    setCategory(getApi.data.categories);
  };

  const getAllProduct = async () => {
    let getApi = await getProduct();
    const listTmp = getApi.data.products.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    setProduct(listTmp);
  };

  const getBestSeller = async () => {
    let getApi = await getBestProduct();

    setBestProduct(getApi.data);
  };
  getUserByCheck = async () => {
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let getApi = await getUserByPhone(phone);
    getApi?.data?.User === null ? setVisible(true) : setVisible(false);
    console.log('data ---------->>> ', getApi.data);
  };

  check = async () => {
    console.log('name ------->   ', name);
    console.log('address ------->   ', address);
    const user = auth().currentUser;
    const phone = user.phoneNumber.slice(3);
    let SignUpFetch = await SignUp(phone, name, address);
    // console.log('userrrrrr ------->>>> ' + SignUpFetch);
    toastAndroid('Luu thông tin thành công!');
    navigation.push('Home');
    hideModal();
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const toastAndroid = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      100,
    );
  };
  if (isLoading) {
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
    <SafeAreaView style={styles.container}>
      <Header title="TRANG CHỦ"></Header>
      <ScrollView>
        <TouchableOpacity style={{padding: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              opacity: 0.3,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                paddingRight: 5,
                color: COLORS.black,
              }}>
              ĐỊA CHỈ
            </Text>
            <Icon name="chevron-down-outline" color={COLORS.black} size={20} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Icon name="location-sharp" color={COLORS.orange} size={20} />
            <Text
              style={{fontWeight: 'bold', fontSize: 14, width: WIDTH / 1.2}}>
              {user?.address}
            </Text>
          </View>
        </TouchableOpacity>

        <Swiper
          style={styles.wrapper}
          loop={true}
          autoplay
          showsPagination
          dotColor={COLORS.white}
          autoplayTimeout={2}>
          {dataBanner?.map((value, index) => (
            <Image
              resizeMode={'cover'}
              style={{width: WIDTH - 20, height: WIDTH / 2}}
              source={{uri: `${IMAGE_URL}${value.imageUrl}`}}
            />
          ))}
        </Swiper>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>THỰC ĐƠN</Text>
          <TouchableOpacity
            onPress={() => navigation.push('Menu', {idcategory})}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // numColumns={2}
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            SẢN PHẨM BÁN CHẠY NHẤT
          </Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          // numColumns={2}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={bestProduct}
          renderItem={({item}) => (
            <Button
              margin={5}
              radius={10}
              row
              space={'between'}
              justifyCenter
              alignCenter
              backgroundColor={'#F9F9F9'}
              padding={20}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate('DetailsProduct', {
                  product: item.products[0],
                })
              }>
              <ItemSeller item={item} />
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: WIDTH - 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>SẢN PHẨM</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
            <Text style={{color: COLORS.blue}}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // numColumns={2}
          data={product}
          renderItem={({item}) => (
            <Button
              margin={5}
              radius={10}
              row
              space={'between'}
              justifyCenter
              alignCenter
              backgroundColor={'#F9F9F9'}
              padding={20}
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate('DetailsProduct', {product: item})
              }>
              <ItemProduct item={item} />
            </Button>
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
      <Modal
        visible={visible}
        // onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text
          style={{color: COLORS.textOrange, fontSize: 16, fontWeight: 'bold'}}>
          THÔNG TIN CÁ NHÂN
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Họ và tên"
          value={name}
          maxLength={20}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Địa chỉ"
          value={address}
          maxLength={50}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity style={styles.login} onPress={() => check()}>
          <Text
            style={{
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: 16,
              fontStyle: 'normal',
            }}>
            LƯU THÔNG TIN
          </Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.darkgray,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: WIDTH / 10,
    height: WIDTH / 10,
  },
  wrapper: {
    height: WIDTH / 2 + 10,
    paddingTop: 10,
  },
  textInput: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.lightGray3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  login: {
    width: WIDTH - 120,
    height: WIDTH / 7.4,
    backgroundColor: COLORS.darkk,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});
