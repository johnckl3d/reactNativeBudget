/* styles/presentation.js */
import dimensions from './dimensions';
import colors from './colors';
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@Utils/scalingUtils';

export const shadow = {
  shadowColor: colors.k,
  shadowRadius: 8,
  shadowOpacity: 0.15,
  shadowOffset: {width: 0, height: 0},
  elevation: 1,
};

export const centered = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const centeredStretch = {
  alignItems: 'stretch',
  justifyContent: 'center',
}

export const button = {
    width: dimensions.buttonWidth,
    height: dimensions.buttonHeight,
    borderRadius: dimensions.buttonHeight / 2,
}

export const highlightRed = {
  borderWidth: 5,
  borderColor: "red"
}

export const highlightYellow = {
  borderWidth: 5,
  borderColor: "yellow"
}

export const highlightGreen = {
  borderWidth: 5,
  borderColor: "green"
}

export const column = {
  flexDirection: "column",
  flex: 1
}

export const row = {
  flexDirection: "row",
  flex: 1
}

export const bottom = {
  justifyContent: 'flex-end',
  position: 'absolute'
}