/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import style from '../Wishlist/style';
import {useDimensionContext} from '../../context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../components/common/colors';
import {updateCartCount} from '../../storage/action';
import CommonHeaderRight from '../../components/CommonHeaderRight';

const Wishlist = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const [wishItems, setWishItems] = useState();
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getWishlist();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <CommonHeaderRight cart={true} />,
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  const getWishlist = async () => {
    await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setWishItems([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setWishItems(objArray);
        }
      });
  };

  const deleteFromWishlist = async removeItem => {
    console.log('Remove Item:',removeItem.id);
    await firestore()
      .collection('Wishlist')
      .doc(removeItem.id)
      .delete()
      .then(() => {
        const wishlistFilter = wishItems.filter(x => x.id !== removeItem.id);
        setWishItems(wishlistFilter);
      });
  };

  const addToCart = async addItem => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', addItem.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: addItem.description,
            name: addItem.name,
            price: addItem.price,
            quantity: 1,
            userId: userId,
            productId: addItem.id,
            image: addItem.image,
          });
          dispatch(updateCartCount(cartCount + 1));
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
            });
        }
      });
  };

  const navigateToShop = () => {
    navigation.navigate('Shop', {type: 'all'});
  };

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={wishItems}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: color.primaryGreen,
                }}>
                Your Wishlist is Empty
              </Text>
              <TouchableOpacity style={{padding: 15}} onPress={navigateToShop}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: color.black,
                  }}>
                  Go to Shop
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View style={responsiveStyle.productView}>
              <Image
                source={{uri: item.image}}
                style={responsiveStyle.productImage}
              />
              <View style={responsiveStyle.secondView}>
                <Text style={responsiveStyle.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={responsiveStyle.desc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={responsiveStyle.bottomView}>
                  <Text style={responsiveStyle.price}>₹{item.price}</Text>
                  {/* <View style={responsiveStyle.offView}>
                    <Text style={responsiveStyle.offText}>50% OFF</Text>
                  </View> */}
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={responsiveStyle.cartView}>
                    <Text style={responsiveStyle.cartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={responsiveStyle.removeView}>
                <TouchableOpacity onPress={() => deleteFromWishlist(item)}>
                  <Image
                    source={require('../../assets/images/delete-white.png')}
                    style={responsiveStyle.remove}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;
