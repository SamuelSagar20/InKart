import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    headView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headText: {
      fontFamily: 'Lato-Bold',
      fontSize: 22,
      color: color.black,
    },
    contentText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: color.black,
    },
    seeAll: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: color.black,
    },
  });

export default style;
