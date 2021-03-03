import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {defaultColor, handlePadding, handleMargin, textColor} from './shared';
import {TextInputLayout} from 'rn-textinputlayout';
const InputText = ({
  flex,
  color,
  medium,
  bold,
  light,
  size,
  placeholder,
  placeholderTextColor,
  center,
  right,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  secureTextEntry,
  email,
  number,
  phone,
  autoFocus,
  height,
  width,
  style,
  editable,
  returnKeyType,
  onSubmitEditing,
  ref,
  // position,
  // top,
  // left,
  // right,
  // bottom,
  ...props
}) => {
  const inputStyle = [
    flex && {flex: 1},
    medium && styles.medium,
    light && styles.regular,
    !medium && !light && styles.regular,
    size && {fontSize: size},
    color && textColor[color],
    color && !defaultColor[color] && {color: color},
    !color && {color: defaultColor.text},
    center && styles.center,
    right && styles.right,
    padding && {...handlePadding(padding)},
    margin && {...handleMargin(margin)},
    paddingTop && {paddingTop: paddingTop},
    paddingRight && {paddingRight: paddingRight},
    paddingBottom && {paddingBottom: paddingBottom},
    paddingLeft && {paddingLeft: paddingLeft},
    marginBottom && {marginBottom: marginBottom},
    marginTop && {marginTop: marginTop},
    marginRight && {marginRight: marginRight},
    marginLeft && {marginLeft: marginLeft},
    paddingHorizontal && {paddingHorizontal: paddingHorizontal},
    paddingVertical && {paddingVertical: paddingVertical},
    marginHorizontal && {marginHorizontal: marginHorizontal},
    marginVertical && {marginVertical: marginVertical},
    height && {height: height},
    width && {width: width},
    style,
  ];
  const keyboardType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';
  return (
    <TextInputLayout>
      <TextInput
        placeholderTextColor={
          placeholderTextColor || defaultColor.secondaryText
        }
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        style={inputStyle}
        editable={editable}
        {...props}
      />
    </TextInputLayout>
  );
};

export default InputText;

const styles = StyleSheet.create({
  regular: {
   
  },
  medium: {
 
  },
  bold: {

  },
  light: {
   
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});
