/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import style from '../Cart/style';
import {useDimensionContext} from '../../context';
import color from '../../components/common/colors';
import Snackbar from 'react-native-snackbar';
import OrderTotal from './components/OrderTotal';
import firestore from '@react-native-firebase/firestore';
import CommonButton from '../../components/CommonButton';
import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount} from '../../storage/action';

const Cart = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [charges, setCharges] = useState(50);

  useEffect(() => {
    getCartProducts();
  }, [isFocused]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setCharges(50);
    } else {
      setCharges(0);
    }
  }, [cartProducts]);

  const getCartProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          let totalAmount = 0;
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const amount =
                parseFloat(doc?.data().price) *
                parseInt(doc?.data().quantity, 10);
              totalAmount = totalAmount + amount;
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setTotal(totalAmount);
          setCartProducts(result);
        } else {
          setCartProducts([]);
          setTotal(0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CommonHeaderLeft /* if goBack is needed pass this code => " type={'back'} " */
        />
      ),
    });
  }, []);

  const updateArray = productInfo => {
    const result = cartProducts.filter(x => {
      return x.id !== productInfo.id;
    });
    setTotal(total - parseFloat(productInfo.price));

    setCartProducts(result);
    dispatch(updateCartCount(cartCount - 1));
  };

  const handleTotal = (type, productInfo) => {
    if (type === 'add') {
      setTotal(total + parseFloat(productInfo.price));
    } else {
      setTotal(total - parseFloat(productInfo.price));
    }
  };

  const onButtonPress = () => {
    if (cartProducts.length > 0) {
      if (email === '' || mobileNumber === '') {
        Snackbar.show({
          text: 'You have need to complete your profile in order to continue',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
        navigation.navigate('Account');
      } else {
        navigation.navigate('AddAddress', {
          cartProducts: cartProducts,
          total: total,
        });
      }
    } else {
      Snackbar.show({
        text: 'Your cart is empty',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={cartProducts}
        extraData={cartProducts}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  fontSize: 25,
                  color: color.black,
                }}>
                Cart is empty
              </Text>
              <TouchableOpacity>
                <Text>Go to Shop</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderItem={({item, index}) => (
          <RenderItem
            item={item}
            index={index}
            updateArray={updateArray}
            handleTotal={handleTotal}
          />
        )}
        ListFooterComponent={() => (
          <>
            <View style={responsiveStyle.renderView}>
              {/* start design */}
              <View style={responsiveStyle.offCircleView}>
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
              </View>

              <View
                style={{
                  width: '64%',
                  height: 100,
                  backgroundColor: color.secondaryGreen,
                  padding: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Bold',
                      fontSize: 50,
                      color: color.primaryGreen,
                    }}>
                    50
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 14,
                        color: color.primaryGreen,
                      }}>
                      %
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 14,
                        color: color.primaryGreen,
                      }}>
                      OFF
                    </Text>
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        fontSize: 16,
                        color: color.black,
                      }}>
                      On your first order
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 12,
                        color: color.black_lvl_3,
                      }}>
                      Order above 2500 rupees.
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  height: 100,
                  backgroundColor: color.secondaryGreen,
                }}>
                <View style={responsiveStyle.circleCenter} />
                <View style={responsiveStyle.circleCenter} />
              </View>
              <View
                style={{
                  width: '25%',
                  height: 100,
                  backgroundColor: color.secondaryGreen,
                  paddingRight: 15,
                  paddingVertical: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 15,
                    color: color.black_lvl_3,
                  }}>
                  Use Code
                </Text>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    borderRadius: 15,
                    backgroundColor: color.primaryGreen,
                    overflow: 'hidden',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: color.white,
                      textAlign: 'center',
                    }}>
                    SDC43
                  </Text>
                </View>
              </View>

              {/* end design */}
              <View style={{marginLeft: -25 / 2}}>
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
                <View style={responsiveStyle.circleRight} />
              </View>
            </View>

            <OrderTotal total={total} charges={charges} />

            <CommonButton
              buttonText={'Proceed to Checkout'}
              onButtonPress={onButtonPress}
            />
          </>
        )}
      />
    </View>
  );
};

const RenderItem = ({item, index, updateArray, handleTotal}) => {
  const navigation = useNavigation();
  const userId = useSelector(state => state.userId);
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [qun, setQun] = useState(item.quantity);

  useEffect(() => {
    setQun(item.quantity);
  }, [item]);

  const addToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.productId)
      .get()
      .then(snapshot => {
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
          });
        handleTotal('add', item);
      });
  };

  const removeItem = async () => {
    if (qun <= 1) {
      //remove from cart
      await firestore()
        .collection('Cart')
        .doc(item.id)
        .delete()
        .then(() => {
          updateArray(item);
        });
    } else {
      //update quantity
      setQun(qun - 1);
      firestore()
        .collection('Cart')
        .doc(item.id)
        .update({
          quantity: parseInt(item.quantity, 10) - 1,
        });
      handleTotal('minus', item);
    }
  };

  const redirectToProductDetails = () => {
    navigation.navigate('ProductDetails', {product: item});
  };

  return (
    <TouchableOpacity
      onPress={redirectToProductDetails}
      style={responsiveStyle.innerView1}>
      <Image source={{uri: item.image}} style={responsiveStyle.imageStyle} />
      <View style={responsiveStyle.nameView}>
        <Text style={responsiveStyle.textName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={responsiveStyle.textContent} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={responsiveStyle.priceView}>
          <View style={responsiveStyle.priceView2}>
            <Text style={responsiveStyle.textPrice}>₹{item.price}</Text>
            <View style={responsiveStyle.offView}>
              <Text style={responsiveStyle.offText}>50%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qntyView}>
            <TouchableOpacity onPress={removeItem}>
              <Text style={responsiveStyle.qntyText1}>-</Text>
            </TouchableOpacity>
            <Text style={responsiveStyle.qntyText2}>{qun}</Text>
            <TouchableOpacity
              onPress={() => {
                setQun(qun + 1);
                addToCart();
              }}>
              <Text style={responsiveStyle.qntyText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;
