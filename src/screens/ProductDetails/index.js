/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderRight from '../../components/CommonHeaderRight';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
import StarRating from 'react-native-star-rating-widget';
import color from '../../components/common/colors';
import MoreInfo from './components/MoreInfo';
import ExtraInfo from './components/ExtraInfo';
import ProductReview from './components/ProductReview';
import DeliveryInfo from './components/DeliveryInfo';
import ProductScroll from '../../components/ProductScroll';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const ProductDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const wishIds = useSelector(state => state.wishIds);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const {product} = route.params;
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const [productDetailsObj, setProductDetails] = useState({});
  const [qun, setQun] = useState(1);

  const [rating, setRating] = useState(5);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} share={true} />,
      title: '',
    });
  }, []);

  useEffect(() => {
    setProductDetails(product);
  }, [product]);

  const navigationNeeded = (val, item) => {
    if (val) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
      setProductDetails(item);
    }
  };

  const handleQuantity = type => {
    if (type === 'plus') {
      setQun(qun + 1);
    } else {
      if (qun === 1) {
        return;
      } else {
        setQun(qun - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', productDetailsObj.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: productDetailsObj.description,
            name: productDetailsObj.name,
            price: productDetailsObj.price,
            quantity: qun,
            userId: userId,
            productId: productDetailsObj.id,
            image: productDetailsObj.image,
          });
          dispatch(updateCartCount(cartCount + 1));
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + qun,
            });
        }
      });
  };

  const addToWishlist = productDetails => {
    firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .where('productId', '==', productDetails.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('Wishlist')
            .add({
              created: Date.now(),
              updated: Date.now(),
              description: productDetails.description,
              name: productDetails.name,
              price: productDetails.price,
              categoryId: productDetails.categoryId,
              userId: userId,
              productId: productDetails.id,
              image: productDetails.image,
            })
            .then(resp => {
              dispatch(updateWishIds([...wishIds, productDetails.id]));
              Snackbar.show({
                text: 'Item Added to wishlist',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Item is already in your wishlist',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.primaryGreen,
            textColor: color.white,
          });
        }
      });
  };

  return (
    <View>
      <ScrollView ref={scrollRef}>
        <View style={responsiveStyle.heart}>
          <TouchableOpacity onPress={() => addToWishlist(productDetailsObj)}>
            <Image
              source={
                wishIds.includes(productDetailsObj.id)
                  ? require('../../assets/images/wishRed.png')
                  : require('../../assets/images/wishlist.png')
              }
              style={responsiveStyle.image1}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: productDetailsObj?.image}}
          style={responsiveStyle.prodImage}
        />
        <View style={responsiveStyle.mainView}>
          <View style={responsiveStyle.padding}>
            <Text style={responsiveStyle.name}>{productDetailsObj?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarRating rating={rating} onChange={setRating} />
              <Text
                style={{
                  color: color.grey,
                  marginLeft: 10,
                  fontFamily: 'Lato-Regular',
                  fontSize: 18,
                }}>
                (1 rating)
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={responsiveStyle.price}>
                ₹{parseFloat(productDetailsObj?.price).toFixed(2)}
              </Text>
              <Text
                style={{
                  color: color.primaryGreen,
                  marginLeft: 10,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                25% off
              </Text>
            </View>
            <MoreInfo />

            {/* description */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: color.grey,
                paddingVertical: 10,
              }}>
              <Text style={responsiveStyle.descriptionHead}>
                Product Details
              </Text>
              <Text style={responsiveStyle.description}>
                {productDetailsObj?.description}
              </Text>
            </View>

            <ExtraInfo />
            <ProductReview product={product} />
            <DeliveryInfo />
          </View>
          <ProductScroll isNavigationNeeded={navigationNeeded} />
        </View>
      </ScrollView>
      <View
        style={{
          margin: 15,
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          padding: 15,
          borderRadius: 8,
          backgroundColor: color.primaryGreen,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: color.white,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleQuantity('minus')}>
            <AntDesign name="minus" size={25} color={color.primaryGreen} />
          </TouchableOpacity>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Black',
              fontSize: 18,
              marginHorizontal: 15,
            }}>
            {qun}
          </Text>
          <TouchableOpacity onPress={() => handleQuantity('plus')}>
            <AntDesign name="plus" size={25} color={color.primaryGreen} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddToCart}>
          <Text
            style={{
              color: color.white,
              fontFamily: 'Lato-Black',
              fontSize: 18,
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
