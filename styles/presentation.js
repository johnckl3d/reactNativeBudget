/* styles/presentation.js */
import dimensions from './dimensions';
import colors from './colors';
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@Utils/scalingUtils';

export const shadow = {
  shadowColor: colors.b1,
  shadowRadius: dimensions.shadowSize,
  shadowOpacity: 0.35,
  shadowOffset: {width: 0, height: 0}
};

export const centered = {
  alignItems: 'center',
  justifyContent: 'center'
}

export const button = {
    width: dimensions.buttonWidth,
    height: dimensions.buttonHeight,
    borderRadius: dimensions.buttonHeight / 2,
}

export const highlight = {
  borderWidth: 5,
  borderColor: "red"
}