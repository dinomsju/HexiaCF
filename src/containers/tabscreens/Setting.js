import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, icons} from '../../constants';
import {
  WIDTH_SCALE,
  HEIGHT_SCALE,
  WIDTH,
  HEIGHT,
} from '../../constants/constants';
export default function Setting() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Icon name="person-circle-sharp" color={COLORS.black} size={100} />
        <View style={{paddingHorizontal: 10}}>
          <Text style={{paddingBottom: 10, fontSize: 14, fontWeight: 'bold'}}>
            Nguyễn Duy Tân{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.edit}>Chỉnh sửa tài khoản</Text>
            <Icon
              style={[styles.edit, styles.p]}
              name="chevron-forward"
              color={COLORS.black}
              size={20}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 10,
              paddingRight: WIDTH_SCALE * 190,
            }}>
            Giỏ hàng
          </Text>
          <Icon
            style={[styles.edit, styles.p]}
            name="chevron-forward"
            color={COLORS.black}
            size={40}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('OrderManage')}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 10,
              paddingRight: WIDTH_SCALE * 150,
            }}>
            Quản lý đơn hàng
          </Text>
          <Icon
            style={[styles.edit, styles.p]}
            name="chevron-forward"
            color={COLORS.black}
            size={40}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 10,
              paddingRight: WIDTH_SCALE * 165,
            }}>
            Mã khuyến mãi
          </Text>
          <Icon
            style={[styles.edit, styles.p]}
            name="chevron-forward"
            color={COLORS.black}
            size={40}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 10,
              paddingRight: WIDTH_SCALE * 190,
            }}>
            Thanh toán
          </Text>
          <Icon
            style={[styles.edit, styles.p]}
            name="chevron-forward"
            color={COLORS.black}
            size={40}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 5,
              paddingRight: WIDTH_SCALE * 215,
            }}>
            Địa chỉ
          </Text>
          <Icon
            style={[styles.edit, styles.p]}
            name="chevron-forward"
            color={COLORS.black}
            size={40}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: COLORS.textGray,
          }}>
          <Icon name="ellipse" color={COLORS.textGray} size={50} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              paddingLeft: 5,
              paddingRight: WIDTH_SCALE * 230,
            }}>
            Đăng xuất
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.darkgray,
  },
  edit: {
    color: COLORS.textGray,
    fontSize: 14,
  },
  p: {
    padding: 5,
  },
  pl: {
    paddingLeft: 15,
  },
});
