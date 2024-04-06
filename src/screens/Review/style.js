import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
        padding:15,
    },
    reviewBox:{
        backgroundColor: color.white,
        padding: 15,
        borderRadius: 14,
        marginVertical: 10,
      },
  });

export default style;
