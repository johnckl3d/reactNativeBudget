import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from "@Styles/colors";
import {
  column,
  row,
  highlightRed,
  highlightYellow,
  centered,
  shadow,
  bottom,
  centeredStretch,
  highlightGreen,
} from "@Styles/presentation";

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    ...shadow,
    backgroundColor: Colors.w,
  }
});

export default Card;
