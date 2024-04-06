import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../../../context';
import color from '../../../../components/common/colors';
import { useSelector } from 'react-redux';

const Trending = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const categories = useSelector(state => state.categories);

  return (
    <View style={responsiveStyle.main}>
      <Text style={responsiveStyle.title}>Trending Category</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={responsiveStyle.flatList}
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
            <View style={[responsiveStyle.imageContainer,{backgroundColor:categoriesColor}]}>
              <Image source={{uri: item.image}} style={responsiveStyle.image} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Trending;
