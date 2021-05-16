/**
 *
 * @format
 * @flow
 *
 */

import { StyleSheet, Dimensions } from 'react-native';
import { WHITE, COLOR_AIA_DARK_GREY, COLOR_AIA_GREY_500, COLOR_AIA_GRAY_MY, COLOR_AIA_TEXT_BLUE, COLOR_AIA_FOODTRACKER_BACKGROUND, COLOR_AIA_RED, COLOR_AIA_FOODTRACKER_BACKGROUND_F0 } from '../../../styles/colors';
import { DEVICE_WIDTH, PREVIEW_HEIGHT, BUTTON_MARGIN, HELPER_MARGIN, PREVIEW_WIDTH } from '../config';




const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CarousellStyles = StyleSheet.create({
  carouselItemContainer: {
    width: 400,//SCREEN_WIDTH,
    height: 500,//SCREEN_HEIGHT,
    borderColor: "yellow",
    borderWidth: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
});

export default CarousellStyles;

