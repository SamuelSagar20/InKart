import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {flex: 1},
    scrollView: {padding: width * 0.04},
    contentContainerStyle: {paddingBottom: height * 0.15},
    greenBox: {
      marginVertical: width * 0.04,
      backgroundColor: color.primaryGreen,
      borderRadius: width * 0.04,
      padding: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    greenTextBox: {marginLeft: width * 0.04},
  });

export default style;
