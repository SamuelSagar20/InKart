import { StyleSheet } from 'react-native';
import color from '../../../../components/common/colors';

const style = (width,height) => StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
    },
    banner: {
        width: width * 0.85,
        height: width * 0.4,
        borderRadius:15,
        resizeMode:'contain',
        overflow:'hidden',
        margin:15,

    },
    innerView: {
        padding:15,
    },
    head: {
        fontFamily:'Lato-Black',
        fontSize:20,
        color:color.grey,
    },
    content: {
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:color.grey,
    },
    touch: {
        backgroundColor:color.primaryGreen,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        width: width * 0.3,
        marginVertical:10,
        borderRadius:15,
    },
    touchText: {
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:color.white,
    },
});

export default style;
