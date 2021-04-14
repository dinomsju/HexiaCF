/**
 * @format
 */

import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

import {
  AppRegistry,
  LogBox,
  Platform,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';


// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
