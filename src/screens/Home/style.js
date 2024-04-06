import { StyleSheet, Dimensions } from 'react-native';
import color from '../../components/common/colors';

const {width,height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
        height: height * 0.73,
        backgroundColor:color.white_lvl_2,
    },
    main: {
        flex:1,
    },
    footText: {
        fontFamily:'Lato-Bold',
        fontSize:25,
        color: color.grey,
        padding:15,
    },
    footButton: {
        padding:10,
        backgroundColor:color.primaryGreen,
        width:'40%',
        marginHorizontal:15,
        marginBottom:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
    },
    footButtonText: {
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:color.white,
    }
});

export default style;


