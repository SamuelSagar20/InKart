import { StyleSheet } from 'react-native';
import color from '../../../../components/common/colors';


const style = (width,height,isPortrait) => StyleSheet.create({
    main: {
       flex:1,
       padding:15,
    },
    title: {
        color:color.black,
        fontFamily:'Lato-Bold',
        fontSize:18,
    },
    flatList: {
        alignItems:'center',
        marginVertical:20,
    },
    imageContainer: {
        padding:15,
        borderRadius:15,
        overflow:'hidden',
        marginRight:15,
    },
    image: {
        width:width * 0.15,
        height: height * 0.07,
        resizeMode:'contain',
    },
});

export default style;
