/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import style from '../Categories/style';
import CustomSearch from '../../components/CustomSearch';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import color from '../../components/common/colors';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Categories = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const categories = useSelector(state => state.categories);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const {catIndex = 0} = route?.params ?? {};

  useEffect(() => {
    setActive(catIndex);
  }, [catIndex]);

  useEffect(() => {
    getProducts();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft/>,
    });
  }, []);


  // get products
  const getProducts = async () => {
    await firestore()
      .collection('Products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              result.push(doc.data());
            }
          });
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCategoryTouch = index => {
    setActive(index);
  };


  const handleProduct = item => {
    navigation.navigate('ProductDetails', {
      product: item,
    });
  };

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <View style={responsiveStyle.rowStyle}>
          {/* Sidebar */}
          <View>
            <FlatList
              data={categories}
              contentContainerStyle={responsiveStyle.categFlatStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      responsiveStyle.categTouch,
                      {
                        backgroundColor:
                          index === active ? color.white : 'transparent',
                      },
                    ]}
                    onPress={() => handleCategoryTouch(index)}>
                    <Image
                      source={{uri: item.image}}
                      style={responsiveStyle.categImage}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {/* Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={require('../../assets/images/home1bg.jpg')}
              style={responsiveStyle.backImage}>
              <Text style={responsiveStyle.categName} numberOfLines={1}>
                {categories[active]?.name}
              </Text>
              <Text style={responsiveStyle.categDesc} numberOfLines={3}>
                {categories[active]?.description}
              </Text>
            </ImageBackground>
            <FlatList
              numColumns={3}
              data={products}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.prodStyle}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => handleProduct(item)} style={responsiveStyle.prodContainer}>
                    <View style={responsiveStyle.prodImageBg}>
                      <Image
                        source={{uri: item.image}}
                        style={responsiveStyle.prodImage}
                      />
                    </View>
                    <Text style={responsiveStyle.prodName}>{item.name}</Text>
                    <Text style={responsiveStyle.prodPrice}>₹{item.price}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
