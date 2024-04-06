import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../context';
import CommonSectionHeader from '../CommonSectionHeader';
import {FlatList} from 'react-native-gesture-handler'; // or from react-native
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';
import color from '../common/colors';

const ProductScroll = props => {
  const {isNavigationNeeded} = props;
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const route = useRoute();
  const userId = useSelector(state => state.userId);
  const wishIds = useSelector(state => state.wishIds);
  const cartCount = useSelector(state => state.cartCount);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(); // api call
  }, []);

  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const responseData = {id: doc.id, ...doc?.data()};
              result.push(responseData);
            }
          });
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigation = useNavigation();
  const handleProduct = item => {
    if (route.name === 'ProductDetails') {
      isNavigationNeeded(true, item);
    } else {
      navigation.navigate('ProductDetails', {
        product: item,
      });
    }
  };

  const dispatch = useDispatch();

  const addToCart = async item => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: item.description,
            name: item.name,
            price: item.price,
            quantity: 1,
            userId: userId,
            productId: item.id,
            image: item.image,
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

  const addToWishlist = async productDetails => {
    await firestore()
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
                backgroundColor: color.lightGreen,
                textColor: color.white,
              });
            });
        } else {
          console.log('Product ID to be removed:', snapshot.docs[0].id);
          firestore()
            .collection('Wishlist')
            .doc(snapshot.docs[0].id) // Corrected line
            .delete()
            .then(resp => {
              dispatch(
                updateWishIds([
                  ...wishIds.filter(id => id !== productDetails.id),
                ]),
              );
              Snackbar.show({
                text: 'Item removed from wishlist',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.lightGreen,
                textColor: color.white,
              });
            });
        }
      });
  };

  return (
    <View style={responsiveStyle.container}>
      <CommonSectionHeader
        head={'Newly Added'}
        content={'Pay less, Get more'}
        rightText={'See All'}
      />
      <View>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleProduct(item)}
                style={responsiveStyle.innerView1}>
                <TouchableOpacity onPress={() => addToWishlist(item)}>
                  <Image
                    source={
                      wishIds.includes(item.id)
                        ? require('../../assets/images/wishRed.png')
                        : require('../../assets/images/wishlist.png')
                    }
                    style={responsiveStyle.image1}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: item.image}}
                  style={responsiveStyle.image2}
                />
                <Text style={responsiveStyle.textName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={responsiveStyle.textContent} numberOfLines={2}>
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}>
                  <Text style={responsiveStyle.textPrice}>₹{item.price}</Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={responsiveStyle.innerView2}>
                    <Text style={responsiveStyle.plusStyle}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductScroll;
