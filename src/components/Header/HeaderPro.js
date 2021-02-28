import React from 'react'
import { StyleSheet, Image, View, StatusBar,Text, TouchableOpacity } from 'react-native'
import { greaterOrEq } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import { WIDTH } from '../../constants/constants';
import { useNavigation } from "@react-navigation/native";
const Header = ({title}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#404040" translucent={true} />
            {/* <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.images}
            /> */}
            <TouchableOpacity  onPress={() =>  navigation.goBack()}>
            <Icon name="arrow-back" color={COLORS.orange} size={20} />
            </TouchableOpacity>
            
             <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 130}}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH/10,
        marginTop: 25,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.19,
        alignItems: 'center',
        padding: 10
    },
})
