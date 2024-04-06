/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import style from '../Search/style';
import CustomSearch from '../../components/CustomSearch';
import {useDimensionContext} from '../../context';
import OfferProducts from '../../components/OfferProducts';
import Trending from './components/Trending';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';

const Search = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CommonHeaderLeft /* if goBack is needed pass this code => " type={'back'} " */
        />
      ),
    });
  }, []);
  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Trending />
        <OfferProducts />
      </ScrollView>
    </View>
  );
};

export default Search;
