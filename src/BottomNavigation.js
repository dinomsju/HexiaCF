import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from './components/tabscreens/Home'
import Profile from './components/tabscreens/Profile'
import Setting from './components/tabscreens/Setting'
import Notification from './components/tabscreens/Notification'

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeTintColor: '#000',
  showLabel: false,
  // keyboardHidesTabBar: true,
  // style: {
  //   position: 'absolute',
  // },
};
function MyBottomTab() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="film" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ROUTE_KEY.Category}
        component={Category}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          tabBarBadge: 1,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomNavigation() {
  return <MyBottomTab />;
}
