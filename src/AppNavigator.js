import * as React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="BottomNavigation">
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
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
