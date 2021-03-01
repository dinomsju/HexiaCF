import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Menu from './components/screens/Menu';
import DetailsCategory from './components/screens/DetailsCategory';
import DetailsProduct from './components/screens/DetailsProduct';
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
