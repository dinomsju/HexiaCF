import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Login from './containers/screens/Login';
import Signup from './containers/screens/Signup';
import Menu from './containers/screens/Menu';
import DetailsCategory from './containers/screens/DetailsCategory';
import DetailsProduct from './containers/screens/DetailsProduct';
import Cart from './containers/screens/Cart';
import Payment from './containers/screens/Payment';
import EditLocation from './containers/screens/EditLocation';
import OrderManage from './containers/screens/OrderManage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllProduct from './containers/screens/AllProduct';
import DetailOrder from './containers/screens/OrderManage/DetailOrder';
const Stack = createStackNavigator();
const Auth = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="DetailsCategory" component={DetailsCategory} />
      <Stack.Screen name="DetailsProduct" component={DetailsProduct} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="EditLocation" component={EditLocation} />
      <Stack.Screen name="OrderManage" component={OrderManage} />
      <Stack.Screen name="DetailOrder" component={DetailOrder} />
      <Stack.Screen name="AllProduct" component={AllProduct} />
    </Stack.Navigator>
  );
}
export default function AppNavigator() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    auth().onAuthStateChanged((users) => {
      setUser(users);
    });
  });
  return (
    <NavigationContainer>
      {user ? <StackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
