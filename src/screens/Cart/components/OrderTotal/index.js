import React from 'react';
import {Text, View} from 'react-native';
import {useDimensionContext} from '../../../../context';
import style from './style';
import color from '../../../../components/common/colors';

const OrderTotal = props => {
  const {total, charges} = props;
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View>
      <View style={responsiveStyle.container}>
        <View>
          <Text style={responsiveStyle.head}>Order Details</Text>
          <Text style={responsiveStyle.content}>Bag Total:</Text>
          <Text style={responsiveStyle.content}>Bag Savings</Text>
          <Text style={responsiveStyle.content}>Coupon Discount</Text>
          <Text style={responsiveStyle.endContent}>Delivery</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={responsiveStyle.headEnd}>---</Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: color.black,
              lineHeight: 30,
            }}>
            ₹{parseFloat(total).toFixed(2)}
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: color.primaryGreen,
              lineHeight: 30,
            }}>
            ₹0.00
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: color.red,
              lineHeight: 30,
            }}>
            Apply Coupon
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              color: color.black,
              lineHeight: 30,
              marginBottom: 10,
            }}>
            ₹{parseFloat(charges).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={responsiveStyle.total}>Order Total</Text>
        <Text style={responsiveStyle.total}>
          ₹{parseFloat(total + charges).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default OrderTotal;
