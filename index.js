/**
 * @format
 */

import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {
  AppRegistry,
  LogBox,
  Platform,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
