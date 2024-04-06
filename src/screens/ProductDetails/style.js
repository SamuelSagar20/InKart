import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    prodImage: {
      width: width,
      height: width * 0.7,
      resizeMode: 'contain',
      marginVertical: 25,
    },
    heart: {
      position: 'absolute',
      right: 0,
      marginTop: 10,
      zIndex: 1,
    },
    image1: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      marginRight:15,
    },
    mainView: {
      backgroundColor: color.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 15,
      paddingBottom: 100,
    },
    name: {
      fontFamily: 'Lato-Black',
      fontSize: 30,
      marginBottom: 10,
      color: color.black_lvl_3,
    },
    price: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      marginVertical: 10,
      color: color.black_lvl_3,
    },
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: color.black_lvl_3,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.grey,
    },
    padding: {padding: width * 0.05},
  });

export default style;
