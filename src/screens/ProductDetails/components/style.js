import {StyleSheet} from 'react-native';
import color from '../../../components/common/colors';


const style = (width, height, isPortrait) =>
  StyleSheet.create({
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
    commonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: color.shadow,
      lineHeight:25,
    },
    deliveryHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: color.black_lvl_3,
      marginBottom: 10,
    },
  });

export default style;
