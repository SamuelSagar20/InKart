import React from 'react';
import { Image, View } from 'react-native';
import color from '../../components/common/colors';

const Splash = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: color.white,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/logo-icon.jpeg')}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
        />
      </View>
    );
};

export default Splash;
