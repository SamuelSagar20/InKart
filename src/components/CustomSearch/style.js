import { StyleSheet } from 'react-native';
import color from '../common/colors';

const style = (width,height) => StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
    },
    newContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:15,
    },
    search: {
        borderWidth:1,
        borderColor: color.primaryGreen,
        backgroundColor:color.secondaryGreen,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        padding:5,
        width: width * 0.95,
    },
    newStyle: {
        borderWidth:1,
        borderColor: color.primaryGreen,
        backgroundColor:color.secondaryGreen,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        padding:5,
        width: width * 0.775,
    },
    searchIcon: {
        width:25,
        height:25,
        marginLeft:5,
        resizeMode:'contain',
    },
    micIcon:{
        width:25,
        height:25,
        resizeMode:'contain',
    },
    textInput:{
        flex:1,
        fontFamily:'Lato-Regular',
        fontSize:18,
        marginLeft:15,
        color:color.primaryGreen,
    },
    innerView: {
        flexDirection:'row',
        alignItems:'center',
    },
    filter: {
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:color.primaryGreen,
    },
});

export default style;
