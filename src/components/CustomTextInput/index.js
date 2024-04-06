import React, {useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import color from '../common/colors';
import {useDimensionContext} from '../../context';

const CustomTextInput = props => {
  const dimensions = useDimensionContext();
  const {
    type,
    handleText,
    placeholder,
    value,
    check = false,
    multiline = false,
  } = props;
  const [show, setShow] = useState(false);
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';
  const secureTextEntry = type === 'password' ? (show ? false : true) : false;
  const icon =
    type === 'email'
      ? require('../../assets/images/email.png')
      : type === 'password'
      ? show
        ? require('../../assets/images/view.png')
        : require('../../assets/images/hide.png')
      : false;
  const handlePassword = () => {
    setShow(!show);
  };
  return (
    <View style={style.container}>
      <TextInput
        style={[
          style.textInput,
          {
            height:
              Platform.OS === 'android'
                ? multiline
                  ? dimensions.windowHeight * 0.15
                  : dimensions.windowHeight * 0.055
                : multiline
                ? dimensions.windowHeight * 0.09
                : dimensions.windowHeight * 0.04,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={color.grey}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        selectionColor={color.primaryGreen}
        onChangeText={handleText}
        value={value}
        multiline={multiline}
      />
      {check ? <Text style={style.checkText}>Check</Text> : null}
      {!icon ? null : (
        <TouchableOpacity
          disabled={type !== 'password' ? true : false}
          onPress={handlePassword}>
          <Image style={style.icon} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
