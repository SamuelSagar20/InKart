import {StyleSheet} from 'react-native';
import color from '../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    imageView: {
        paddingRight:15,
    },
    backImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    cartCount: {
      position: 'absolute',
      right: 7,
      top: -6,
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
    flexStyle:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
    },
  });

export default style;
