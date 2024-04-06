import { StyleSheet } from 'react-native';
import color from '../../components/common/colors';


const style = (width,height) => StyleSheet.create({
    container: {
        flex: 1,
        height: height,
    },
    topBg: {
        width: width,
        height: width * 0.4,
        resizeMode: 'cover',
    },
    ScrollView: {
        flex: 1,
        backgroundColor: color.white_lvl_1,
        marginTop: -width * 0.2,
        borderTopRightRadius: width * 0.05,
        borderTopLeftRadius: width * 0.05,
        overflow: 'hidden',
        padding: width * 0.03,
    },
    logo: {
        width: width * 0.4,
        height: width * 0.2,
        resizeMode: 'contain',
    },
    loginText: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: color.steel,
    },
    createNew: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: color.grey,
        textAlign:'center',
        marginVertical: width * 0.025,
        marginBottom: 20,
        paddingBottom: width * 0.2,
    },
    dottedLineContainer: {
        marginVertical:15,
    },
    overflow: {
        overflow:'hidden',
    },
    dashedLine: {
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: color.grey,
        margin: -2,
        marginBottom: 0,
      },
    textContainer: {
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        borderColor: color.grey,
        marginTop: -10,
        backgroundColor: color.white_lvl_2,
        width: 110,
      },
    dashedText: {
        textAlign: 'center',
        color:color.black_lvl_3,
        fontFamily: 'Lato-Regular',
        fontSize:14,
      },
    errorText: {
        color: color.red,
        fontFamily: 'Lato-Regular',
        fontSize: 14,
    },
    errorView: {
        marginTop:10,
    },

});

export default style;
