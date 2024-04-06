import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import style from './style';
import color from '../common/colors';

const CustomButton = props => {
  const {type, handleButtonPress, buttonText, icon} = props;
  return (
    <TouchableOpacity
      style={[
        style.button,
        {
          backgroundColor:
            type === 'primary' ? color.primaryGreen : color.secondaryGreen,
        },
      ]}
      onPress={handleButtonPress}>
        {type !== 'primary' ? <Image style={style.icon} source={icon}/> : null}
      <Text
        style={
          {
            color:
              type === 'primary' ? color.white : color.black_lvl_3,
            fontFamily:
              type === 'primary' ? 'Lato-Bold' : 'Lato-Regular',
            fontSize:
              type === 'primary' ? 20 : 14,
          }
        }>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
