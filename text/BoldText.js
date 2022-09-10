/*
 * @Author: Wooden Lim
 * @Date: 2019-12-18 11:47:30
 * @Last Modified by: Wooden Lim
 * @Last Modified time: 2019-12-18 17:46:23
 */
import React, { PureComponent } from "react";
import { StyleSheet, Platform } from "react-native";
import Colors from "@Styles/colors";
import { widthPercentageToDP as wp } from "@Utils/scalingUtils";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  withTheme,
} from "react-native-paper";

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS == "ios" ? "OpenSans-Bold" : "OpenSans",
  },
});

export default class BoldText extends PureComponent {
  render() {
    const {
      onPress = null,
      fontSize = wp(4),
      text = "",
      color = Colors.w,
      style = {},
    } = this.props;

    return (
      <Text
        {...this.props}
        onPress={onPress}
        style={[
          styles.text,
          style,
          {
            fontSize: fontSize,
            color: color,
          },
        ]}
      >
        {text}
      </Text>
    );
  }
}
