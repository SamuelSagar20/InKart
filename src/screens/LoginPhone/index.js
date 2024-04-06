import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import style from '../LoginPhone/style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import color from '../../components/common/colors';
import { validateOtp, validatePhone } from './controller';
import { useDimensionContext } from '../../context';

const LoginPhone = () => {
  const dimensions = useDimensionContext();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState(false);
  const navigation = useNavigation();


  const responsiveStyle = style(dimensions.windowWidth,dimensions.windowHeight);


  const handleButtonPress = async () => {
    try {
      setError(null);
      if (validatePhone(phone.trim())) {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        if (confirmation) {
          Snackbar.show({
            text: 'Verification is sent to your mobile number, please verify',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.primaryGreen,
            textColor: color.black,
          });
          setConfirm(confirmation);
          setShowOtpField(true);
        }
      } else {
        setError('Given phone number is incorrect');
      }
    } catch (error) {
      setError('Given phone number is incorrect');
    }
  };
  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleVerifyOtp = async () => {
    if (otp.trim() !== '' && validateOtp(otp.trim())) {
      const res = await confirm.confirm(otp.trim());
      if (res) {
        Snackbar.show({
          text: 'Your phone number is verified, Login Successful',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.primaryGreen,
          textColor: color.black,
        });
        navigation.navigate('Home');
      }
    } else {
      setError(' Entered OTP is incorrect');
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView style={responsiveStyle.ScrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />

        <Text style={responsiveStyle.loginText}>Login with Phone</Text>
        {error !== null ? <Text style={responsiveStyle.errorText}>{error}</Text> : null}
        <CustomTextInput
          type="phone"
          handleText={text => setPhone(text)}
          placeholder="Phone Number"
        />

        {showOtpField ? (
          <CustomTextInput
            type="phone"
            handleText={text => setOtp(text)}
            placeholder="Enter Otp"
          />
        ) : null}

        <CustomButton
          type="primary"
          handleButtonPress={showOtpField ? handleVerifyOtp : handleButtonPress}
          buttonText={showOtpField ? 'Verify OTP' : 'Sign In with Phone'}
        />

        <Text style={responsiveStyle.createNew} onPress={handleGoToLogin}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};

export default LoginPhone;
