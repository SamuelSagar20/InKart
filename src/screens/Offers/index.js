/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, Text, FlatList} from 'react-native';
import style from '../Offers/style';
import CustomSearch from '../../components/CustomSearch';
import {useDimensionContext} from '../../context';
import color from '../../components/common/colors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CommonHeaderLeft /* if goBack is needed pass this code => " type={'back'} " */
        />
      ),
    });
  }, []);

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.red,
            textColor: color.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
        }
      });
  };

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <FlatList
          data={offers}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={responsiveStyle.contentStyle}
          renderItem={({item, index}) => {
            return (
              <View style={responsiveStyle.renderView}>
                {/* start design */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                </View>

                <View
                  style={{
                    width: '64%',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        fontSize: 50,
                        color: color.primaryGreen,
                      }}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          fontSize: 14,
                          color: color.primaryGreen,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          fontSize: 14,
                          color: color.primaryGreen,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          fontSize: 16,
                          color: color.black,
                        }}>
                        {item.head}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          fontSize: 12,
                          color: color.black_lvl_3,
                        }}>
                        {item.subhead}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter} />
                  <View style={responsiveStyle.circleCenter} />
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: color.secondaryGreen,
                    paddingRight: 15,
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      fontSize: 15,
                      color: color.black_lvl_3,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: color.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: color.white,
                        textAlign: 'center',
                      }}>
                      {item.offercode}
                    </Text>
                  </View>
                </View>

                {/* end design */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                  <View style={responsiveStyle.circleRight} />
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;
