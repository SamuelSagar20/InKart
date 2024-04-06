import {StyleSheet} from 'react-native';
import color from '../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
        borderRadius:15,
        backgroundColor:color.primaryGreen,
        padding:15,
        width: width * 0.9,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        alignSelf:'center',
    },
    btnText: {
        fontFamily:'Lato-Bold',
        fontSize: 22,
        color: color.white,
    },
  });

export default style;
