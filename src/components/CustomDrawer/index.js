import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from '../CustomDrawer/style';
import {useDimensionContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../storage/action';

const CustomDrawer = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const firstName = useSelector(state => state.firstName);
  const lastName = useSelector(state => state.lastName);
  const email = useSelector(state => state.email);
  const profileImage = useSelector(state => state.profileImage);

  const Contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigateTo: 'MyFooter',
      icon: require('../../assets/images/home.png'),
    },
    {
      itemId: 1,
      itemName: 'Shop by category',
      navigateTo: 'Categories',
      icon: require('../../assets/images/drawer.png'),
    },
    {
      itemId: 2,
      itemName: 'Orders',
      navigateTo: 'Orders',
      icon: require('../../assets/images/orders.png'),
    },
    {
      itemId: 3,
      itemName: 'Your Wishlist',
      navigateTo: 'Wishlist',
      icon: require('../../assets/images/wishlist.png'),
    },
    {
      itemId: 4,
      itemName: 'Your Account',
      navigateTo: 'Account',
      icon: require('../../assets/images/user.png'),
    },
  ];

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      {/*Profile*/}
      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={responsiveStyle.accountTouch}>
        <View
          style={responsiveStyle.accountImageView}>
          <Image
            style={responsiveStyle.image}
            source={
              profileImage === ''
                ? require('../../assets/images/profile-pic.png')
                : {uri: profileImage}
            }
          />
        </View>
        <View style={responsiveStyle.nameView}>
          <Text style={responsiveStyle.nameText}>
            {firstName} {lastName}
          </Text>
          <Text style={responsiveStyle.email}>
            {email}
          </Text>
        </View>
      </TouchableOpacity>

      {/*Drawer Contents*/}
      <View style={responsiveStyle.commonMargin}>
        <View>
          {Contents.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.itemId}
                onPress={() => navigation.navigate(item.navigateTo)}
                style={responsiveStyle.drawerView}>
                <View style={responsiveStyle.drawerInnerView}>
                  <Image source={item.icon} style={responsiveStyle.icon1} />
                  <Text style={responsiveStyle.drawerText}>
                    {item.itemName}
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/arrow-right.png')}
                  style={responsiveStyle.icon2}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/*Log out*/}

      <TouchableOpacity
        onPress={handleSignout}
        style={responsiveStyle.logoutView}>
        <Image
          source={require('../../assets/images/arrow-right.png')}
          style={[responsiveStyle.icon1, responsiveStyle.arrow]}
        />
        <Text style={responsiveStyle.logoutText}>Sign Out</Text>
      </TouchableOpacity>
      {/*Log out*/}

      <View style={responsiveStyle.supportView}>
        <Text style={responsiveStyle.supportHead}>Contact Support</Text>
        <Text style={responsiveStyle.supportContent}>
          If you have any problem with the app, feel free to contact our 24
          hours support system
        </Text>
        <View style={responsiveStyle.supportTouch}>
          <Text style={responsiveStyle.supportText}>Contact</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
