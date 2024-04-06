import { StyleSheet } from 'react-native';
import color from '../../components/common/colors';


const style = (width,height,isPortrait) => StyleSheet.create({
    // container:{
    //     flex:1,
    // },
    categories: {
        backgroundColor:color.secondaryGreen,
    },
    contentStyle:{
        justifyContent:'space-around',
        alignItems:'center',
    },
    catItemView: {
        margin:10,
    },
    catItem: {
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:color.primaryGreen,
    },
    commonPadding:{
        paddingHorizontal:15,
    },
    innerView1: {
        width: '100%',
        padding: 15,
        marginRight: 15,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: color.white,
      },
      imageStyle: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10,
      },
      nameView: {
        width:'80%',
        borderLeftWidth: 1,
        paddingHorizontal: 10,
        marginLeft: 10,
        overflow: 'hidden',
      },
      textName: {fontFamily: 'Lato-Bold', fontSize: 20, color: color.black},
      textContent: {fontFamily: 'Lato-Regular', fontSize: 16, color: color.black},
      priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
      },
      priceView2: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      textPrice: {fontFamily: 'Lato-Bold', fontSize: 18, color: color.black},
      offView: {
        padding: 5,
        borderRadius: 15,
        backgroundColor: color.primaryGreen,
        marginHorizontal: 10,
      },
      offText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: color.white,
        marginHorizontal: 10,
      },
      qntyView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: color.primaryGreen,
        overflow: 'hidden',
        paddingVertical: 5,
      },
      qntyText1: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.black,
        marginHorizontal: 10,
      },
      qntyText2: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: color.primaryGreen,
        marginHorizontal: 5,
      },
});

export default style;
