import { StyleSheet } from 'react-native';
import color from '../../components/common/colors';

const style = (width,height,isPortrait) => StyleSheet.create({
    container: {
       flex:1,
       backgroundColor:color.white_lvl_3,
    },
    flatView: {
        backgroundColor: color.secondaryGreen,
        borderRadius: 15,
        padding: 15,
        overflow: 'hidden',
        marginTop:15,
        marginHorizontal: 15,
      },
      innerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: color.grey,
        borderBottomWidth: 1,
        paddingBottom: 15,
      },
      orderId: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: color.black,
      },
      orderDate: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: color.primaryGreen,
      },
      address:{
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: color.grey,
      },
      paidItems:{
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: color.black,
      },
      price:{
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: color.primaryGreen,
      },
      quantity:{
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: color.primaryGreen,
      },
      mapImage:{
        width: 100,
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        resizeMode: 'cover',
      },
      bottomView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
      },
      bottomText:{
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: color.black_lvl_3,
      },
});

export default style;
