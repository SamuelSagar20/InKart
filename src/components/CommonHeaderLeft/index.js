import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import style from '../CommonHeaderLeft/style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';

const CommonHeaderLeft = props => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const handleClick = () => {
    if (props.type === 'back') {
      if (props.action) {
        props.action();
      } else {
        navigation.goBack();
      }
    } else {
      navigation.toggleDrawer();
    }
  };
  return (
    <TouchableOpacity style={responsiveStyle.imageView} onPress={handleClick}>
      <Image
        source={
          props.type === 'back'
            ? require('../../assets/images/left-arrow.png')
            : require('../../assets/images/drawer.png')
        }
        style={responsiveStyle.backImage}
      />
    </TouchableOpacity>
  );
};

export default CommonHeaderLeft;
