import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../context';
import CommonSectionHeader from '../CommonSectionHeader';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler'; // or from react-native
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../../storage/action';

const OfferProducts = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

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

  return (
    <View style={responsiveStyle.container}>
      <CommonSectionHeader
        head={'Say Hello to Offers !'}
        content={'Best price ever for all the time'}
        rightText={'See All'}
      />
      <View>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

const RenderItem = ({item, index}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const [qun, setQun] = useState(0);

  const navigation = useNavigation();
  const handleProduct = () => {
    navigation.navigate('ProductDetails', {
      product: item,
    });
  };

  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const dispatch = useDispatch();

  const addToCart = async () => {
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

  return (
    <TouchableOpacity
      onPress={() => handleProduct(item)}
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
              <Text style={responsiveStyle.offText}>10%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qntyView}>
            <TouchableOpacity
              onPress={() => {
                setQun(qun <= 0 ? qun : qun - 1);
              }}>
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

export default OfferProducts;
