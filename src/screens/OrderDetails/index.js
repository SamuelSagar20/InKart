/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ScrollView, Modal, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import {useDimensionContext} from '../../context';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import color from '../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../../components/CustomButton';
import Snackbar from 'react-native-snackbar';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const [loading, setLoading] = useState(false);
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <CommonHeaderLeft
          type={'back'}
          action={() => navigation.navigate('Orders')}
        />
      ),
      title: 'Order Summary',
    });
  }, []);

  const reOrder = async () => {
    try {
      setLoading(true);
      const smallId = Math.random();
      await firestore()
        .collection('Orders')
        .add({
          orderId: String(smallId).slice(4, 12).toUpperCase(),
          created: Date.now(),
          updated: Date.now(),
          orderStatus: 'Ordered',
          totalAmount: item.totalAmount,
          address: item.address,
          userId: item.userId,
          paymentMethod: 'online',
          cartItems: item.cartItems,
          userName: item.userName,
          userEmail: item.userEmail,
          userPhone: item.userPhone,
          expDelDate: '',
        })
        .then(async res => {
          if (res) {
            setTimeout(() => {
              Snackbar.show({
                text: 'Your Order is successfully placed',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
              setLoading(false);
            }, 1000);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={color.white} />
        </View>
      </Modal>
      <ScrollView
        style={responsiveStyle.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={responsiveStyle.contentContainerStyle}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={50} color={color.white} />
          <View style={responsiveStyle.greenTextBox}>
            <Text
              style={{
                color: color.white,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              Order Id: #{item?.orderId ?? 'WERTYUCV32'}
            </Text>
            <Text
              style={{
                color: color.white,
                fontFamily: 'Lato-Black',
                fontSize: 20,
              }}>
              {item?.orderStatus ?? ''}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Items:
          </Text>
          {item?.cartItems &&
            item.cartItems.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      backgroundColor: color.primaryGreen,
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      marginRight: 15,
                    }}>
                    <Text
                      style={{
                        color: color.white,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={color.black_lvl_2}
                  />
                  <View
                    style={{
                      width: '55%',
                      overflow: 'hidden',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        color: color.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                      }}>
                      {ele.name}
                    </Text>
                    <Text
                      style={{
                        color: color.steel,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      {ele.description}
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: color.black_lvl_3,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      ₹{ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Details:
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: color.black_lvl_3,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}>
            <View>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Delivery
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                ₹134
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.red,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                Apply Coupon
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                ₹50.00
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              ₹{item.totalAmount}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Address:
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            EDEN, KN 29-B
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            KAIRALI NAGAR,
          </Text>
          <Text
            style={{
              color: color.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            MANNANTHALA P.O ,TVM-15
          </Text>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: color.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Method:
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="cc-visa" size={30} color={color.black} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                **** **** **** 7560
              </Text>
              <Text
                style={{
                  color: color.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                {item?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 15,
          backgroundColor: color.white,
        }}>
        <CustomButton
          type="primary"
          handleButtonPress={reOrder}
          buttonText={'Reorder'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
