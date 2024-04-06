import {StyleSheet} from 'react-native';
import color from '../common/colors';

const style = (width, height) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginVertical: 15,
      padding: 15,
      overflow: 'hidden',
      backgroundColor: color.white_lvl_1,
    },
    drawerView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      justifyContent: 'space-between',
    },
    drawerInnerView: {flexDirection: 'row', alignItems: 'center'},
    icon1: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
      marginRight: 14,
    },
    arrow:{
      backgroundColor:color.secondaryGreen,
      borderRadius:15,
      overflow:'hidden',
    },
    icon2: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      backgroundColor: color.secondaryGreen,
      overflow: 'hidden',
      borderRadius: 25 / 2,
    },
    drawerText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color:color.black,
    },
    logoutView: {
      borderColor: color.black_lvl_3,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 9,
      backgroundColor: color.secondaryGreen,
      width: '50%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoutText: {fontFamily: 'Lato-Regular', fontSize: 18,color:color.black},
    supportHead: {fontFamily: 'Lato-Black', fontSize: 20,lineHeight:25,color:color.black},
    supportContent: {fontFamily: 'Lato-Regular', fontSize: 15,lineHeight:19,color:color.black},
    supportView: {
      padding:15,
      marginVertical:15,
      borderRadius:20,
      backgroundColor:color.secondaryGreen,
    },
    supportTouch: {
      padding:10,
      marginVertical:15,
      borderRadius:20,
      backgroundColor:color.primaryGreen,
      justifyContent:'center',
      alignItems:'center',
      width:'60%',
    },
    supportText: {fontFamily: 'Lato-Bold', fontSize: 18,color:color.white},
    image: {
      width: width * 0.2,
      height: width * 0.2,
      borderRadius: width * 0.2,
    },
    accountTouch:{
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: color.black_lvl_3,
      paddingVertical: 15,
    },
    accountImageView:{
      width: 75,
      height: 75,
      borderRadius: 75 / 2,
      backgroundColor: color.white_lvl_3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    commonMargin:{marginVertical: 15},
    nameView:{marginLeft: 15, width: 152},
    email:{fontFamily: 'Lato-Regular', fontSize: 16,color:color.black_lvl_2},
    nameText:{fontFamily: 'Lato-Bold', fontSize: 20,color:color.black},

  });

export default style;
