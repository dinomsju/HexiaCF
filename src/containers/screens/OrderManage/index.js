import React, {useState, useEffect} from 'react';
import {SafeAreaView, Dimensions, StatusBar} from 'react-native';
import {Block, Text, Button} from './../../../components';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import {SceneMap, TabView} from 'react-native-tab-view';
import ViewTab from './ViewTab';
const initialLayout = {width: Dimensions.get('window').width};

export default function OrderManage() {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'pending', title: 'Chờ duyệt'},
    {key: 'wait', title: 'Đang giao'},
    {key: 'all', title: 'Đã giao'},
  ]);
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(!reload);
  }, [isFocused]);

  const renderScene = SceneMap({
    pending: () => <ViewTab isPending={0} />,
    wait: () => <ViewTab isPending={1} />,
    all: () => <ViewTab isPending={2} />,
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <Block
        row
        height={50}
        alignCenter
        paddingLeft={20}
        backgroundColor={'#2296f3'}>
        <Button
          width={25}
          onPress={() => {
            navigation.goBack();
          }}>
          <MTIcon name={'chevron-left'} color={'#FFF'} size={25} />
        </Button>
        <Text bold color={'white'} size={18} paddingLeft={10}>
          QUẢN LÝ ĐƠN HÀNG
        </Text>
      </Block>

      <TabView
        reload={reload}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
}
