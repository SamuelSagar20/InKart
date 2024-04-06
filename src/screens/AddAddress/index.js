/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CommonButton from '../../components/CommonButton';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker} from 'react-native-maps';
import color from '../../components/common/colors';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount} from '../../storage/action';

const AddAddress = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  const [newPosition, setNewPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector(state => state.userId);
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);

  const navigation = useNavigation();
  const route = useRoute();
  const {cartProducts, total} = route.params;

  useEffect(() => {
    getCurrentLocation();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type={'back'} />,
    });
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setNewPosition({
        latitude: info.coords?.latitude ?? 0,
        longitude: info.coords?.longitude ?? 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    });
    Snackbar.show({
      text: 'Current location is fetched',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color.primaryGreen,
      textColor: color.white,
    });
  };

  const handleCreateOrder = async paymentID => {
    const smallId = paymentID.slice(4, 12);
    await firestore()
      .collection('Orders')
      .add({
        orderId: String(smallId).toUpperCase(),
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: total,
        address: address,
        userId: userId,
        paymentMethod: 'online',
        cartItems: cartProducts,
        userName: firstName + ' ' + lastName,
        userEmail: email,
        userPhone: mobileNumber,
        expDelDate: '',
      })
      .then(async resp => {
        await firestore()
          .collection('Cart')
          .where('userId', '==', userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .delete()
                .then(() => {
                  setLoading(false);
                  dispatch(updateCartCount(0));
                  Snackbar.show({
                    text: 'Your Order is successfully placed',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                  });
                  setTimeout(() => {
                    navigation.navigate('Home');
                  }, 2000);
                })
                .catch(err => {
                  console.warn(err);
                });
            });
          });
      });
  };

  const onButtonPress = () => {
    var options = {
      description: 'Inkart Products purchase',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_CXo5HbmQ83IYL0', // Your api key
      amount: parseInt(total, 10) * 100,
      name: 'Inkart',
      prefill: {
        email: email,
        contact: mobileNumber,
        name: `${firstName} ${lastName}`,
      },
      theme: {color: '#149c19'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        setLoading(true);
        handleCreateOrder(data.razorpay_payment_id);
      })
      .catch(error => {
        // handle failure
        Snackbar.show({
          text: 'Your Order is Failed',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
        navigation.goBack();
      });
  };

  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent:'center',
            alignItems:'center',
          }}>
          <ActivityIndicator size={'large'} color={color.white} />
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always">
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          textInputProps={{
            placeholderTextColor: color.grey,
            selectionColor: color.primaryGreen,
          }}
          currentLocation={true}
          fetchDetails={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
            language: 'en',
          }}
          styles={{
            textInput: responsiveStyle.textInput,
            predefinedPlacesDescription: responsiveStyle.description,
            description: {color: 'gray'},
          }}
          onPress={(data, details) => {
            const location =
              data?.geometry?.location ?? details?.geometry?.location;
            const positionData = {
              latitude: location?.lat ?? 0,
              longitude: location?.lng ?? 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            };
            setNewPosition(positionData);
            setAddress(data?.name ?? data?.description);
          }}
        />

        {newPosition && (
          <MapView
            style={responsiveStyle.mapView}
            initialRegion={newPosition}
            region={newPosition}
            showsUserLocation={true}
            followsUserLocation={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            showsMyLocationButton={true}>
            {address && (
              <Marker
                title={address ?? ''}
                description="This is your marker"
                coordinate={newPosition}
              />
            )}
          </MapView>
        )}

        {address && (
          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Text
              style={{
                color: color.black,
                fontFamily: 'Lato-Regular',
                fontSize: 18,
              }}>
              {address}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={responsiveStyle.touchView}
          onPress={getCurrentLocation}>
          <View style={responsiveStyle.iconView}>
            <FontAwesome name="location-arrow" size={20} color={color.white} />
          </View>
          <Text style={responsiveStyle.touchText}>Your Current Location </Text>
        </TouchableOpacity>

        <CommonButton
          buttonText={'Confirm location and Proceed'}
          onButtonPress={onButtonPress}
        />
      </ScrollView>
    </View>
  );
};

export default AddAddress;
