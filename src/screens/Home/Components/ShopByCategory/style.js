import { StyleSheet } from 'react-native';
import color from '../../../../components/common/colors';


const style = (width,height) => StyleSheet.create({
    container: {
        margin:15,
    },
    head: {
        fontFamily:'Lato-Bold',
        fontSize:20,
        textAlign:'center',
        color:color.grey,
    },
    flatList: {
        marginVertical:15,
        justifyContent:'center',
        alignItems:'center',
    },
    innerView: {
        justifyContent:'center',
        alignItems:'center',
        marginRight:15,
        marginBottom:13,
    },
    itemName: {
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:'#000',
    },
    image: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    imageView: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        padding:15,
        marginBottom:10,
    },
});

export default style;
