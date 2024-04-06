import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import style from '../Login/style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import color from '../../components/common/colors';
import auth from '@react-native-firebase/auth';
import {validateEmail} from './controller';
import {useDimensionContext} from '../../context';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/action';

const Login = () => {
  const dispatch = useDispatch();

  const dimensions = useDimensionContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  function onAuthStateChanged(user) {
    //console.warn('onAuthStateChanged', user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleLogin = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      if (validateEmail(email.trim())) {
        await firestore()
          .collection('Users')
          .where('email', '==', email.trim())
          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              Snackbar.show({
                text: 'This user is not registered with us, try creating a new account',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.red,
                textColor: color.white,
              });
            } else {
              snapshot.forEach(documentSnapshot => {
                const respData = documentSnapshot.data();
                if (password.trim() === respData.password && respData?.active) {
                  //checking for password matching and whether user is active or not
                  Snackbar.show({
                    text: 'Login Successful',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                  });
                  dispatch(
                    login({
                      userId: documentSnapshot.id,
                      firstName: respData.firstName,
                      lastName: respData.lastName,
                      email: respData.email,
                      mobileNumber: respData.mobilenumber,
                      profileImage: respData.profileimage,
                    }),
                  );
                  //navigation.navigate('AppDrawer');
                } else {
                  Snackbar.show({
                    text: 'The password you entered is wrong',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.primaryGreen,
                    textColor: color.white,
                  });
                }
              });
            }
          })
          .catch(err => console.warn(err));
      } else {
        Snackbar.show({
          text: 'Enter a valid email',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Fill up the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };
  const handleGoToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const handleGoToLoginPhone = () => {
    navigation.navigate('LoginPhone');
  };

  const handleButtonPress = () => {
    console.warn('pressed'); //google sign in
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

        <Text style={responsiveStyle.loginText}>Login Account</Text>

        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />

        <CustomButton
          type="primary"
          handleButtonPress={handleLogin}
          buttonText={'Sign In'}
        />

        <Text style={responsiveStyle.createNew} onPress={handleGoToSignUp}>
          If you are new, Create Here
        </Text>
        {/*======================================================================================*/}
        <View style={responsiveStyle.dottedLineContainer}>
          <View style={responsiveStyle.overflow}>
            <View style={responsiveStyle.dashedLine} />
          </View>
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.dashedText}>Or Login With</Text>
          </View>
        </View>
        {/*======================================================================================*/}
        <CustomButton
          type="secondary"
          handleButtonPress={handleGoToLoginPhone}
          buttonText={'Sign In with Phone '}
          icon={require('../../assets/images/phone.png')}
        />
        <CustomButton
          type="secondary"
          handleButtonPress={handleButtonPress}
          buttonText={'Sign In with Google'}
          icon={require('../../assets/images/google.png')}
        />
      </ScrollView>
      <View style={responsiveStyle.footer}>
        <Text style={responsiveStyle.footerText}>Login as guest</Text>
      </View>
    </View>
  );
};

export default Login;
