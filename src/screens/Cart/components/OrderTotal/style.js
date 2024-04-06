import { StyleSheet } from 'react-native';
import color from '../../../../components/common/colors';


const style = (width,height,isPortrait) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderBottomColor: color.black_lvl_1,
        borderBottomWidth: 1,
      },
      head: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.black,
        lineHeight: 50,
      },
      content: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.black,
        lineHeight: 30,
      },
      endContent: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: color.black,
        lineHeight: 30,
        marginBottom: 10,
      },
      headEnd: {
        fontFamily: 'Lato-Black',
        fontSize: 20,
        color: color.white_lvl_3,
        lineHeight: 50,
      },
      total: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: color.black,
        lineHeight: 50,
      },
});

export default style;

