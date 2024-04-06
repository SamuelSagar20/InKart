import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      backgroundColor: color.white_lvl_2,
    },
    contentStyle: {alignSelf: 'center', marginVertical: height * 0.015},
    renderView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: height * 0.015,
    },
    offCircleView: {marginRight: -(height * 0.02), zIndex: 99},
    circleRight: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: color.white_lvl_2,
    },
    circleCenter:{
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: color.white_lvl_2,
        marginTop: -25 / 2,
        marginBottom: -25 / 2,
      },
  });

export default style;
