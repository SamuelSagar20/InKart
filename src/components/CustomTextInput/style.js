import {StyleSheet, Dimensions} from 'react-native';
import color from '../../components/common/colors';

const {width} = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.secondaryGreen,
    padding: width * 0.001,
    borderRadius: 8,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: color.grey,
  },
  textInput: {
    flex:1,
    color: color.black_lvl_3,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    marginEnd: width * 0.015,
    resizeMode: 'center',
  },
  checkText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: color.primaryGreen,
    paddingHorizontal: 5,
  },
});

export default style;
