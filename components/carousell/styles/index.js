/**
 *
 * @format
 * @flow
 *
 */

import { Dimensions, StyleSheet } from 'react-native';




const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CarousellStyles = StyleSheet.create({
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
});

export default CarousellStyles;

