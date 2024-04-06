/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CommonHeaderRight from '../../components/CommonHeaderRight';
import CustomSearch from '../../components/CustomSearch';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import CommonEmpty from '../../components/CommonEmpty';

const Shop = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
  const categories = useSelector(state => state.categories);
  const [selectedCategory, setSelectedCategory] = useState('');
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

  useEffect(() => {
    if (type === 'all') {
      setSelectedCategory('Shop');
    }
  }, [type]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} />,
      title: selectedCategory,
    });
  }, [selectedCategory]);

  const handleCategories = async item => {
    setSelectedCategory(item.name);
    await firestore()
      .collection('Products')
      .where('categoryId', '==', item.id)
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
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategories(item)}
        style={responsiveStyle.catItemView}>
        <Text style={responsiveStyle.catItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <CommonEmpty title={'No Products Available'}/>
    );
  };

  const handleProduct = item => {
    navigation.navigate('ProductDetails',{product: item});
  };

  const handleProductsRender = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => handleProduct(item)} style={responsiveStyle.innerView1}>
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
              <Text style={responsiveStyle.qntyText1}>-</Text>
              <Text style={responsiveStyle.qntyText2}>0</Text>
              <Text style={responsiveStyle.qntyText1}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={handleRenderItem}
        style={responsiveStyle.categories}
        contentContainerStyle={responsiveStyle.contentStyle}
      />
      <CustomSearch filter={true} />
      <View style={responsiveStyle.commonPadding}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          renderItem={handleProductsRender}
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </View>
  );
};

export default Shop;
