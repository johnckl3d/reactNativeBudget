/*
 * @Author: Wooden Lim 
 * @Date: 2019-12-18 11:11:32 
 * @Last Modified by: Wooden Lim
 * @Last Modified time: 2021-01-19 16:01:18
 */

import React, {PureComponent} from "react";
import { StyleSheet, Platform } from 'react-native';

import { Text } from "galio-framework";
import Colors from '@Styles/colors';
import { widthPercentageToDP as wp } from '@Utils/scalingUtils';

const styles = StyleSheet.create({
  text: {
		fontFamily: 'open-sans-semiBold'
  }
})

export default class SemiBoldText extends PureComponent {
  render(){

    const { 
      fontSize = wp(4), 
      text = '', 
      color = Colors.w,
      style = {},
      onPress = null
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



