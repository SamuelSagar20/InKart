import { StyleSheet } from 'react-native';
import color from '../../components/common/colors';

const style = (width,height,isPortrait) => StyleSheet.create({
    main: {
       flex:1,
    },
    container: {
        backgroundColor:color.white_lvl_2,
    },
});

export default style;
