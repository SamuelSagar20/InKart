/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import style from '../SignUp/style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import color from '../../components/common/colors';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../components/common/validations';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDimensionContext} from '../../context';

const SignUp = () => {
  const dimensions = useDimensionContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');

  const [error, setError] = useState();

  const navigation = useNavigation();

  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '285798589675-ait4fv9l7elb3v057b89l508qi99947n.apps.googleusercontent.com',
    });
  }, []);

  const handleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    } catch (error) {
      console.warn(error);
    }
  };
  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    const trimAndCheck = (value, errorMessage) => {
      const trimmedValue = value.trim();
      if (trimmedValue === '') {
        setError(errorMessage);
        return false;
      }
      return true;
    };

    const validateAndSetError = (validator, value, errorMessage) => {
      if (!validator(value.trim())) {
        setError(errorMessage);
        return false;
      }
      return true;
    };

    if (
      trimAndCheck(username, 'Fill up all the fields to continue') &&
      trimAndCheck(email, 'Given email is not valid') &&
      validateAndSetError(validateEmail, email, 'Given email is not valid') &&
      trimAndCheck(mobile, 'Given mobile number is not valid') &&
      validateAndSetError(
        validatePhoneNumber,
        mobile,
        'Given mobile number is not valid',
      ) &&
      trimAndCheck(password, 'Fill up all the fields to continue') &&
      trimAndCheck(cPassword, 'Fill up all the fields to continue') &&
      password.trim() === cPassword.trim()
    ) {
      const snapshot = await firestore()
        .collection('Users')
        .where('username', '==', username.trim())
        .where('email', '==', email.trim())
        .get();

      if (snapshot.empty) {
        const userData = {
          username: username.trim(),
          email: email.trim(),
          mobilenumber: mobile.trim(),
          password: password.trim(),
          created: String(new Date()),
          updated: String(new Date()),
          active: true,
        };

        try {
          const resp = await firestore().collection('Users').add(userData);
          console.warn(resp);
          Snackbar.show({
            text: 'A new account is created for you.',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.primaryGreen,
            textColor: color.white,
          });
          navigation.navigate('Home');
        } catch (err) {
          console.warn(err);
        }
      } else {
        Snackbar.show({
          text: 'This email is already existing on our system, try using another one or go to login',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
      }
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView
        style={responsiveStyle.ScrollView}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />

        <Text style={responsiveStyle.loginText}>Sign Up Account</Text>

        {error !== null ? (
          <View style={responsiveStyle.errorView}>
            <Text style={responsiveStyle.errorText}>{error}</Text>
          </View>
        ) : null}

        <CustomTextInput
          handleText={text => setUsername(text)}
          placeholder="Username"
        />
        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          type="phone"
          handleText={text => setMobile(text)}
          placeholder="Mobile Number"
        />
        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />
        <CustomTextInput
          type="password"
          handleText={text => setCpassword(text)}
          placeholder="Confirm Password"
        />

        <CustomButton
          type="primary"
          handleButtonPress={handleSignUp}
          buttonText={'Sign Up'}
        />

        <CustomButton
          type="secondary"
          handleButtonPress={handleButtonPress}
          buttonText={'SignUp with Google'}
          icon={require('../../assets/images/google.png')}
        />
        {/*======================================================================================*/}
        <View style={responsiveStyle.dottedLineContainer}>
          <View style={responsiveStyle.overflow}>
            <View style={responsiveStyle.dashedLine} />
          </View>
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.dashedText}>Or SignUp With</Text>
          </View>
        </View>
        {/*======================================================================================*/}

        <Text style={responsiveStyle.createNew} onPress={handleGoToLogin}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;
