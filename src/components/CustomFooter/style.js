import {StyleSheet} from 'react-native';
import color from '../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    mainContainer: {
      height: isPortrait ? height * 0.1 : width * 0.09,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: color.primaryGreen,
    },
    touchContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    iconStyle: {
      width: isPortrait ? width * 0.065 : height * 0.060,
      height:isPortrait ? width * 0.065 : height * 0.060,
      resizeMode: 'contain',
    },

    textStyle: {
      color: color.white,
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      marginTop: 5,
    },
    dot : {
      fontSize: 60,
      color:color.white,
      textAlign:'center',
      marginTop: isPortrait ? -65 : -60 ,
      marginBottom:-8,
    },
    cartCount: {
      position: 'absolute',
      right: -8,
      top: 2,
      backgroundColor: color.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      overflow: 'hidden',
      paddingHorizontal:6,
      paddingVertical:2,
      zIndex:9,
    },
    count: {
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      color: color.white,
      textAlign:'center',
    },
  });

export default style;
