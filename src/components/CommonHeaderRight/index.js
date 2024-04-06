import React from 'react';
import {TouchableOpacity, Image, View, Text, Share} from 'react-native';
import style from '../CommonHeaderRight/style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import color from '../common/colors';
import { useSelector } from 'react-redux';

const CommonHeaderRight = props => {
  const cartCount = useSelector(state => state.cartCount);
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const handleClick = async (type) => {
    if (type === 'cart') {
      navigation.navigate('Cart');
    } else if (type === 'share') {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    }
  };
  return (
    <View style={responsiveStyle.flexStyle}>
      {props.share ? (
        <TouchableOpacity
          style={responsiveStyle.imageView}
          onPress={() => handleClick('share')}>
          <EvilIcons name="share-google" size={45} color={color.black} />
        </TouchableOpacity>
      ) : null}

      {props.plus ? (
        <TouchableOpacity
          style={responsiveStyle.imageView}
          onPress={props.handlePlusIcon}>
          <FontAwesome name="plus-square-o" size={35} color={color.black} />
        </TouchableOpacity>
      ) : null}

      {props.cart ? (
        <TouchableOpacity
          style={responsiveStyle.imageView}
          onPress={() => handleClick('cart')}>
          <>
            <View style={responsiveStyle.cartCount}>
              <Text style={responsiveStyle.count}>{cartCount}</Text>
            </View>
          </>
          <Image
            source={require('../../assets/images/cart.png')}
            style={responsiveStyle.backImage}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommonHeaderRight;
