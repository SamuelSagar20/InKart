/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {ScrollView, Text, View} from 'react-native';
import style from '../Home/style';
import CommonHeader from '../../components/CommonHeader';
import CustomSearch from '../../components/CustomSearch';
import Banner from './Components/Banner';
import RecentBought from './Components/RecentBought';
import ShopByCategory from './Components/ShopByCategory';
import ProductScroll from '../../components/ProductScroll';
import OfferProducts from '../../components/OfferProducts';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {updateWishIds} from '../../storage/action';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      scrollRef.current.scrollTo({y: 0, animated: true});
      getWishIds();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   getWishIds();
  // }, []);

  const getWishIds = async () => {
    await firestore()
      .collection('Wishlist')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          dispatch(updateWishIds([]));
        } else {
          const idArray = [];
          snapShot?.docs.forEach(document => {
            idArray.push(document?.data().productId);
          });
          dispatch(updateWishIds(idArray));
        }
      });
  };

  return (
    <View>
      <CommonHeader />
      <ScrollView
        ref={scrollRef}
        style={style.container}
        nestedScrollEnabled={true}
        scrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearch />
        <Banner />
        <RecentBought />
        <ShopByCategory />
        <ProductScroll />
        <OfferProducts />

        <Text style={style.footText}>
          Didn't find what you are looking for ?
        </Text>
        <View style={style.footButton}>
          <Text style={style.footButtonText}>Browse Category</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
