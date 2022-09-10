import * as React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { centered, highlightRed } from "../../styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";

import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";

import {
  List,
  Text,
  Chip,
  Divider,
  IconButton,
  Avatar,
  Card,
  Button,
  useTheme,
  Switch,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  withTheme,
} from "react-native-paper";

export default class MonthCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    return (
      <Card style={styles.carouselItemContainer}>
        <Subheading>{item}</Subheading>
      </Card>
    );
  }

  render() {
    const data = this.props.data;
    return !data ? (
      <View></View>
    ) : (
      <View style={styles.container}>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={this.props.width}
          itemWidth={this.props.width}
          contentContainerStyle={styles.carouselItemContainer}
          //containerCustomStyle={{flexGrow: 0}}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.props.parentCallback(index)}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...centered,
  },
  carouselItemContainer: {
    ...centered,
    height: hp(5),
  },
});
