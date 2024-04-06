import { StyleSheet} from 'react-native';
import color from '../common/colors';


const style = (width,height,isPortrait) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: isPortrait ? width * 0.03 : width * 0.004,
        height: isPortrait ? width * 0.175 : width * 0.075,
        backgroundColor:color.white_lvl_1,
        paddingHorizontal: isPortrait ? width * 0.03 : width * 0.003,
    },
    sideIcon: {
        resizeMode:'contain',
        height:height * 0.1,
        width:width * 0.1,
    },
    logo: {
        resizeMode:'contain',
        height: height * 0.15,
        width: width * 0.4,
    },

});

export default style;
