/*
 * @Author: Wooden Lim 
 * @Date: 2019-12-18 11:48:46 
 * @Last Modified by: Wooden Lim
 * @Last Modified time: 2021-01-19 15:58:06
 */

import React, { PureComponent } from "react";
import { Text, StyleSheet, Platform } from 'react-native';
import Colors from '@Styles/colors';
import { widthPercentageToDP as wp } from '@Utils/scalingUtils';

const styles = StyleSheet.create({
  text: {
		fontFamily: 'open-sans-regular'
  }
})

export default class RegularText extends PureComponent {

  render(){

    const { 
      onPress = null,
      fontSize = wp(4), 
      text = '', 
      color = Colors.w,
      style = {}
    } = this.props

    return (
      <Text 
      {...this.props}
        onPress={onPress}
        style={[
          styles.text, style, {
          fontSize: fontSize,
          color: color,
        }]}>{text}</Text>
    )
  }

}
