/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, Image, TouchableOpacity} from 'react-native';
import {useDimensionContext} from '../../../../context';
import style from './style';
import color from '../../../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {updateCategories} from '../../../../storage/action';
import {useNavigation} from '@react-navigation/native';

const ShopByCategory = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await firestore()
      .collection('Categories')
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
          setCategories(result);
          dispatch(updateCategories(result));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCategories = index => {
    navigation.navigate('Categories', {
      catIndex: index,
    });
  };

  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>Shop By Category</Text>
      <FlatList
        data={categories}
        numColumns={4}
        contentContainerStyle={responsiveStyle.flatList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          const categoriesColor =
            index % 4 === 0
              ? color.category1
              : index % 4 === 1
              ? color.category2
              : index % 4 === 2
              ? color.category3
              : index % 4 === 3
              ? color.category4
              : color.category1;
          return (
            <TouchableOpacity
              onPress={() => handleCategories(index)}
              style={responsiveStyle.innerView}>
              <View
                style={[
                  responsiveStyle.imageView,
                  {backgroundColor: categoriesColor},
                ]}>
                <Image
                  source={{uri: item.image}}
                  style={responsiveStyle.image}
                />
              </View>
              <Text style={responsiveStyle.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShopByCategory;
