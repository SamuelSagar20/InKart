/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import style from './style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CommonHeaderRight from '../../components/CommonHeaderRight';
import ActionSheet from 'react-native-actions-sheet';
import StarRating from 'react-native-star-rating-widget';
import color from '../../components/common/colors';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

const Review = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(3);
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const actionSheetRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight plus={true} handlePlusIcon={openActionSheet}/>,
      title: 'Reviews',
    });
  }, []);

  const openActionSheet = () => {
    actionSheetRef.current.show();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={responsiveStyle.container}>
      <View style={responsiveStyle.reviewBox}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../assets/images/rukiyaProfile.jpg')}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
          <View>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Rukiya Kuchki
            </Text>
            <StarRating starSize={20} rating={rating} onChange={setRating} />
          </View>
        </View>
        <Text
          style={{
            color: color.black_lvl_3,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </Text>
      </View>
      <ActionSheet ref={actionSheetRef}>
          <View style={{padding:20}}>
            <Text style={{fontFamily:'Lato-Black',fontSize:20,color:color.black}}>Getsuga Tensho</Text>
            <StarRating starSize={40} rating={rating} onChange={setRating} />
            <CustomTextInput placeholder="Write here " multiline={true}/>
            <CustomButton buttonText={'Submit Review'} type="primary"/>
          </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default Review;
