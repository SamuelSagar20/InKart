import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import {useDimensionContext} from '../../../../context';
import firestore from '@react-native-firebase/firestore';

const Banner = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const [bannerItems, setBannerItems] = useState([]);

  useEffect(() => {
    getBanners(); // api call
  }, []);

  const getBanners = async () => {
    await firestore().collection('Banners').get().then(snapshot => {
      if (!snapshot.empty) {
        const result = [];
        snapshot.docs.forEach(doc => {
          if (doc.exists){
            result.push(doc.data());
          }
        });
        setBannerItems(result);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <View>
      <FlatList
        data={bannerItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <ImageBackground source={{uri:item.image}} style={responsiveStyle.banner}>
              <View style={responsiveStyle.innerView}>
                <Text style={responsiveStyle.head}>{item.head}</Text>
                <Text style={responsiveStyle.content}>{item.description}</Text>
                <TouchableOpacity style={responsiveStyle.touch}>
                  <Text style={responsiveStyle.touchText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
