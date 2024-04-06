import {StyleSheet} from 'react-native';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    imageView: {
        paddingLeft:15,
    },
    backImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
  });

export default style;
