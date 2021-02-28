import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function DetailsCategory() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <ImageBackground
          style={styles.imageBackGround}
          source={{uri: 'https://img.anime47.com/imgur/6hhR2bl.jpg'}}>
          <Text style={styles.text1}>Welcome Back</Text>
          <Text style={styles.text2}>Sign in to continue</Text>
        </ImageBackground> */}
        <Text>header</Text>
      </View>

      <View style={styles.footer}>
        <Text>footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    width: WIDTH,
    height: WIDTH / 2,
    backgroundColor: 'red',
    position: 'absolute',
    top : 20,
    left: 0,
    padding : 20,
  },
  footer: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    left: 0,
    top: WIDTH/2.4 ,
    backgroundColor: 'green',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  },
  imageBackGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
