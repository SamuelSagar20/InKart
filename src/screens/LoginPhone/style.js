import { StyleSheet} from 'react-native';
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
    },
    errorText: {
        fontFamily: 'Lato-Italic',
        fontSize: 15,
        color: color.red,
        marginTop: 20,

    },
});

export default style;
