/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import style from '../Account/style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import CommonHeaderLeft from '../../components/CommonHeaderLeft';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import color from '../../components/common/colors';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../components/common/validations';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../storage/action';
import {updateProfileImage} from './controller';

const Account = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const userId = useSelector(state => state.userId);
  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const mobileNumber = useSelector(state => state.mobileNumber);
  const profileImage = useSelector(state => state.profileImage);

  const dispatch = useDispatch();

  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [phone, setPhone] = useState(mobileNumber);
  const [StateEmail, setEmail] = useState(email);
  const [modal, setModal] = useState(false);
  const [modalChoose, setModalChoose] = useState(false);
  const [userImage, setUserImage] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  const handleOpenImage = () => {
    setModal(!modal);
  };
  const handleEditImage = () => {
    setModalChoose(true);
  };

  const handlePickFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUserImage(image.path ?? '');
        setModalChoose(false);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const handleFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setModalChoose(false);
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateProfile = async () => {
    if (validatePhoneNumber(phone.trim())) {
      if (validateEmail(StateEmail.trim())) {
        if (fName !== '' && lName !== '') {
          let newUrl = profileImage;
          if (userImage !== '') {
            newUrl = await updateProfileImage(userImage);
          }
          await firestore()
            .collection('Users')
            .doc(userId)
            .update({
              firstName: fName,
              lastName: lName,
              email: StateEmail,
              mobilenumber: phone,
              profileimage: newUrl,
            })
            .then(() => {
              dispatch(
                updateProfile({
                  firstName: fName,
                  lastName: lName,
                  email: StateEmail,
                  mobileNumber: phone,
                  profileImage: newUrl,
                }),
              );
              setUserImage('');
              Snackbar.show({
                text: 'Profile is updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: color.primaryGreen,
                textColor: color.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Fill up all the fields to continue',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.red,
            textColor: color.white,
          });
        }
      } else {
        Snackbar.show({
          text: 'Given email address is not valid',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.red,
          textColor: color.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Given phone number is not valid',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.red,
        textColor: color.white,
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>
        {firstName} {lastName}
      </Text>
      <View style={responsiveStyle.userImage}>
        <TouchableOpacity onPress={handleOpenImage}>
          <Image
            style={responsiveStyle.image}
            source={
              userImage === ''
                ? profileImage === ''
                  ? require('../../assets/images/profile-pic.png')
                  : {uri: profileImage}
                : {uri: userImage}
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={responsiveStyle.editTouch}
          onPress={handleEditImage}>
          <Image
            source={require('../../assets/images/edit-green.png')}
            style={responsiveStyle.edit}
          />
        </TouchableOpacity>
      </View>

      <CustomTextInput
        handleText={text => setFName(text)}
        value={fName}
        placeholder="First Name"
      />
      <CustomTextInput
        handleText={text => setLName(text)}
        value={lName}
        placeholder="Last Name"
      />
      <CustomTextInput
        type="email"
        handleText={text => setEmail(text)}
        value={StateEmail}
        placeholder="Email Address"
      />
      <CustomTextInput
        type="phone"
        handleText={text => setPhone(text)}
        value={phone}
        placeholder="Mobile Number"
      />
      <CustomButton
        type="primary"
        handleButtonPress={handleUpdateProfile}
        buttonText={'Update Profile'}
      />

      <Modal visible={modal} onRequestClose={() => setModal(false)} transparent>
        <View style={responsiveStyle.modalBg}>
          <View>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={responsiveStyle.close}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.edit}
              />
            </TouchableOpacity>
            <Image
              style={responsiveStyle.bigImage}
              source={
                userImage === ''
                  ? profileImage === ''
                    ? require('../../assets/images/profile-pic.png')
                    : {uri: profileImage}
                  : {uri: userImage}
              }
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalChoose}
        onRequestClose={() => setModalChoose(false)}
        transparent>
        <View style={responsiveStyle.modalBg}>
          <View style={responsiveStyle.selectBox}>
            <TouchableOpacity
              onPress={() => setModalChoose(false)}
              style={responsiveStyle.closeChoose}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.edit}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={responsiveStyle.touch}
              onPress={handlePickFromGallery}>
              <Text style={responsiveStyle.pickText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={responsiveStyle.touch}
              onPress={handleFromCamera}>
              <Text style={responsiveStyle.pickText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Account;
