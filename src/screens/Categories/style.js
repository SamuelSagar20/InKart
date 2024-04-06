import { StyleSheet } from 'react-native';
import color from '../../components/common/colors';

const style = (width,height,isPortrait) => StyleSheet.create({
    main: {
       flex:1,
    },
    container: {
        backgroundColor:color.white_lvl_2,
    },
    categImage: {
        width: width * 0.2,
        height: width * 0.2,
        resizeMode:'contain',
        margin:10,
    },
    categFlatStyle: {
        padding: 10,
        backgroundColor:color.secondaryGreen,
        width:width * 0.3,
        justifyContent:'center',
        alignItems:'center',
    },
    categTouch: {
        borderBottomColor:color.black_lvl_3,
        borderBottomWidth:0.8,
    },
    rowStyle: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    backImage: {
        width: width * 0.65,
        height: height * 0.175,
        resizeMode:'contain',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:15,
        overflow:'hidden',
        padding:15,
    },
    categName: {
        color:color.black,
        fontFamily:'Lato-Bold',
        fontSize:22,
    },
    categDesc: {
        color:color.black,
        fontFamily:'Lato-Regular',
        fontSize:18,
    },
    prodStyle: {
        justifyContent:'center',
        padding:10,
    },
    prodImageBg: {
        backgroundColor:color.secondaryGreen,
        justifyContent:'center',
        padding:10,
        borderRadius:15,
        marginBottom:5,
    },
    prodImage: {
        width: width * 0.15,
        height: width * 0.15,
        resizeMode:'contain',
        alignSelf: 'center',
    },
    prodContainer: {
        justifyContent:'center',
        alignItems:'center',
        padding:5,
    },
    prodName: {
        color:color.black,
        fontFamily:'Lato-Bold',
        fontSize:18,
    },
    prodPrice: {
        color:color.black,
        fontFamily:'Lato-Regular',
        fontSize:14,
    },
});

export default style;
