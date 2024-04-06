import {StyleSheet} from 'react-native';
import color from '../../../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.secondaryGreen,
      borderRadius: 15,
      margin: 15,
      padding: 15,
      //marginBottom:160,
    },
    head: {
      fontFamily: 'Lato-Black',
      fontSize: 18,
      marginBottom: 10,
      color: color.grey,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    contentView: {
      backgroundColor: color.white,
      padding: 15,
      marginRight: 15,
      borderRadius: 15,
    },
  });

export default style;
