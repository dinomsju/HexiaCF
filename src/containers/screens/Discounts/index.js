import React, {useState, useEffect} from 'react';
import {SafeAreaView, Dimensions, StatusBar, Alert} from 'react-native';
import {Block, Text, Button} from '../../../components';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import {SceneMap, TabView} from 'react-native-tab-view';
import Voucher from './Voucher';
import MyVoucher from './MyVoucher';
import {COLORS} from '../../../constants';
import {TabBar} from 'react-native-tab-view';
import {getUserByPhone, updateUserByPhone} from '../../../api/productApi';
import auth from '@react-native-firebase/auth';
const initialLayout = {width: Dimensions.get('window').width};

export default function Discounts() {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'pending', title: 'Đổi Khuyến Mãi'},
    {key: 'delivery', title: 'Khuyến Mãi Của Bạn'},
  ]);
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(!reload);
  }, [isFocused]);

  const renderScene = SceneMap({
    pending: () => <Voucher status={0} />,
    delivery: () => <MyVoucher status={1} />,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: COLORS.textOrange}}
    />
  );

  return (
    <SafeAreaView style={{flex: 1, marginTop: 24}}>
      <Block
        row
        height={50}
        alignCenter
        paddingLeft={20}
        backgroundColor={COLORS.textOrange}>
        <Button
          width={25}
          onPress={() => {
            navigation.goBack();
          }}>
          <MTIcon name={'chevron-left'} color={'#FFF'} size={25} />
        </Button>
        <Text bold color={'white'} size={18} paddingLeft={10}>
          KHUYẾN MÃI
        </Text>
        {/* <Text bold color={'white'} size={18} paddingLeft={100}>
          {'POINTS: ' + user?.point}
        </Text> */}
      </Block>

      <TabView
        reload={reload}
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
}
