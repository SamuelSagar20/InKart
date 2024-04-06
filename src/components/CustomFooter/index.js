/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from '../CustomFooter/style';
import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../../storage/action';

const CustomFooter = ({state, navigation, descriptors}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const cartCount = useSelector(state => state.cartCount);
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    getCartProducts(); // api call
  }, []);

  const getCartProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        dispatch(updateCartCount(snapshot.size));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon =
          route.name === 'Home'
            ? require('../../assets/images/home-white.png')
            : route.name === 'Categories'
            ? require('../../assets/images/category-white.png')
            : route.name === 'Search'
            ? require('../../assets/images/search-white.png')
            : route.name === 'Offers'
            ? require('../../assets/images/offers-white.png')
            : require('../../assets/images/cart-white.png');

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={responsiveStyle.touchContainer}>
            {isFocused ? <Text style={responsiveStyle.dot}>.</Text> : null}
            {route.name === 'Cart' ? (
              <View style={responsiveStyle.cartCount}>
                <Text style={responsiveStyle.count}>{cartCount}</Text>
              </View>
            ) : null}
            <Image source={icon} style={responsiveStyle.iconStyle} />
            <Text style={responsiveStyle.textStyle}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomFooter;
