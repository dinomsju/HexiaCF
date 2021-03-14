import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Login from './containers/screens/Login';
import Signup from './containers/screens/Signup';
import Menu from './containers/screens/Menu';
import DetailsCategory from './containers/screens/DetailsCategory';
import DetailsProduct from './containers/screens/DetailsProduct';
import Cart from './containers/screens/Cart';
import Payment from './containers/screens/Payment';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="DetailsCategory" component={DetailsCategory} />
      <Stack.Screen name="DetailsProduct" component={DetailsProduct} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
