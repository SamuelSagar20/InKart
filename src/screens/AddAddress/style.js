import {StyleSheet} from 'react-native';
import color from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      fontFamily: 'Lato-Regular',
      borderRadius: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: color.primaryGreen,
      backgroundColor: color.secondaryGreen,
      width: width * 0.9,
      height: 50,
      margin: 10,
      alignSelf: 'center',
      color:color.black,
    },
    description: {
      color:color.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    mapView: {
      height: height * 0.4,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    touchView: {
      padding: 15,
      marginVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchText: {
      color: color.black,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    iconView: {
      borderRadius: 8,
      padding: 10,
      marginRight: 10,
      backgroundColor: color.primaryGreen,
    },
  });

export default style;
