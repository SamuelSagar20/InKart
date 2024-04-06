/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import style from '../Orders/style';
import {useDimensionContext} from '../../context';
import CustomSearch from '../../components/CustomSearch';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import color from '../../components/common/colors';
import CommonHeaderRight from '../../components/CommonHeaderRight';

const Orders = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();
  const [ordersArray, setOrdersArray] = useState();
  const userId = useSelector(state => state.userId);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
      headerRight: () => <CommonHeaderRight cart={true} />,
    });
  }, []);

  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const handleSearch = async text => {
    await firestore()
      .collection('Orders')
      .where('userId', '==', userId)
      .orderBy('orderId')
      .startAt(String(text))
      .endAt(String(text) + '\uf8ff')
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          setOrdersArray([]);
          // Snackbar.show({
          //   text: 'Order not found',
          //   duration: Snackbar.LENGTH_LONG,
          //   backgroundColor: color.red,
          //   textColor: color.white,
          // });
        } else {
          const objArray = [];
          snapShot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const navigateToDetails = item => {
    navigation.navigate('OrderDetails', {item: item});
  };

  return (
    <View style={responsiveStyle.container}>
      <CustomSearch
        filter={true}
        placeholder={'Search using Order ID'}
        mic={false}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ordersArray}
        extraData={ordersArray}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: color.primaryGreen,
                }}>
                No Orders
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigateToDetails(item)}
              style={responsiveStyle.flatView}>
              <View style={responsiveStyle.innerView}>
                <View>
                  <Text style={responsiveStyle.orderId}>
                    ID: {item.orderId}
                  </Text>
                  <Text style={responsiveStyle.orderDate}>
                    Ordered on: {item.created}
                  </Text>
                  <Text style={responsiveStyle.address}>{item.address1}</Text>
                  <Text style={responsiveStyle.address}>{item.address2}</Text>
                  <Text style={responsiveStyle.paidItems}>
                    Paid: ₹{' '}
                    <Text style={responsiveStyle.price}>
                      {item.totalAmount}
                    </Text>
                    , Items:{' '}
                    <Text style={responsiveStyle.quantity}>
                      {item.cartItems.length}
                    </Text>
                  </Text>
                </View>

                <Image
                  source={require('../../assets/images/map.webp')}
                  style={responsiveStyle.mapImage}
                />
              </View>

              <View style={responsiveStyle.bottomView}>
                <Text style={responsiveStyle.bottomText}>Order Shipped</Text>
                <Text style={responsiveStyle.bottomText}>
                  Rate & Review Products
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Orders;
