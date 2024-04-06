/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import SignUp from '../SignUp';
import LoginPhone from '../LoginPhone';
import Home from '../Home';
import {DimensionContextProvider, useDimensionContext} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Categories from '../Categories';
import Cart from '../Cart';
import CustomDrawer from '../../components/CustomDrawer';
import CustomFooter from '../../components/CustomFooter';
import Search from '../Search';
import Offers from '../Offers';
import Orders from '../Orders';
import Wishlist from '../Wishlist';
import Account from '../Account';
import style from './style';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../storage/store';
import Splash from '../Splash';
import Shop from '../Shop';
import ProductDetails from '../ProductDetails';
import Review from '../Review';
import AddAddress from '../AddAddress';
import { enableLatestRenderer } from 'react-native-maps';
import OrderDetails from '../OrderDetails';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  return (
    <Drawer.Navigator
      initialRouteName="MyFooter"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleStyle: responsiveStyle.title,
        headerStyle:{
          height: 70,
        },
      }}>
      <Drawer.Screen
        name="MyFooter"
        component={AppFooter}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Shop" component={Shop} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="AddAddress" component={AddAddress} />
    </Drawer.Navigator>
  );
};

const Footer = createBottomTabNavigator();
const AppFooter = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  return (
    <Footer.Navigator
      tabBar={props => <CustomFooter {...props} />}
      screenOptions={{
        headerTitleStyle: responsiveStyle.title,
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Categories" component={Categories} />
      <Footer.Screen name="Search" component={Search} />
      <Footer.Screen name="Offers" component={Offers} />
      <Footer.Screen name="Cart" component={Cart} />
    </Footer.Navigator>
  );
};

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoggedIn]);

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
            <AppStack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              {isLoggedIn ? (
                <AppStack.Screen name="AppDrawer" component={AppDrawer} />
              ) : (
                <>
                  <AppStack.Screen name="Login" component={Login} />
                  <AppStack.Screen name="SignUp" component={SignUp} />
                  <AppStack.Screen name="LoginPhone" component={LoginPhone} />
                </>
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const App = () => {
  useEffect(() => {
    enableLatestRenderer();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
};

export default App;
