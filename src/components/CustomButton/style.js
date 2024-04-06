import { StyleSheet, Dimensions } from 'react-native';
import color from '../../components/common/colors';

const {width,height} = Dimensions.get('screen');

const style = StyleSheet.create({
    button: {
        padding: width * 0.04,
        marginVertical: width * 0.025,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: width * 0.08,
        height: width * 0.08,
        marginRight: width * 0.025,
    },

});

export default style;
