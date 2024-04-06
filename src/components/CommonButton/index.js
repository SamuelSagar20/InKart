import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';

const CommonButton = props => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <TouchableOpacity
      onPress={props.onButtonPress}
      style={responsiveStyle.container}>
      <Text style={responsiveStyle.btnText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
