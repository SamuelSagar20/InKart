import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      padding: width * 0.05,
      backgroundColor: color.white,
    },
    innerView1: {
      width: 150,
      height: 260,
      padding: 15,
      marginRight: 15,
      marginVertical: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: color.primaryGreen,
    },
    image1: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      alignSelf: 'flex-end',
    },
    image2: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginVertical: 10,
    },
    textName: {fontFamily: 'Lato-Bold', fontSize: 20,color:color.black_lvl_2},
    textContent: {fontFamily: 'Lato-Regular', fontSize: 18,color:color.black_lvl_2},
    textPrice: {fontFamily: 'Lato-Regular', fontSize: 20,color:color.black_lvl_2},
    innerView2: {
      padding: 5,
      backgroundColor: color.primaryGreen,
      borderRadius: 5,
    },
    plusStyle: {fontFamily: 'Lato-Bold', fontSize: 20, color: color.white},
  });

export default style;
