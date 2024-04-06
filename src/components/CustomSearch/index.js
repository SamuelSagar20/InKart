import React from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import style from '../CustomSearch/style';
import {useDimensionContext} from '../../context';
import color from '../common/colors';

const CustomSearch = props => {
  const {filter, placeholder, mic = true, onChangeText = {}} = {...props};
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  return (
    <View
      style={[
        filter ? responsiveStyle.newContainer : responsiveStyle.container,
      ]}>
      <View
        style={[filter ? responsiveStyle.newStyle : responsiveStyle.search]}>
        <View style={responsiveStyle.innerView}>
          <Image
            source={require('../../assets/images/search.png')}
            style={responsiveStyle.searchIcon}
          />
          <TextInput
            placeholder={placeholder ? placeholder : 'Search Here'}
            placeholderTextColor={color.black_lvl_2}
            style={responsiveStyle.textInput}
            selectionColor={color.primaryGreen}
            onChangeText={text => onChangeText(text)}
          />
          {mic ? (
            <Image
              source={require('../../assets/images/voice.png')}
              style={responsiveStyle.micIcon}
            />
          ) : null}
        </View>
      </View>
      {filter ? <Text style={responsiveStyle.filter}>Filter</Text> : null}
    </View>
  );
};

export default CustomSearch;
