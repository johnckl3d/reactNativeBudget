import * as React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { centered, highlightRed } from "@Styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import Chart from "./Chart";
import ScreenWrapper from "@UIComponents/ScreenWrapper";
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
  FAB,
} from "react-native-paper";

const BudgetCarousel = (props) => {
  const _renderItem = ({ item }) => {
    return (
      <Chart />
      // <Chart
      //   snapshots={item.costSnapShots}
      //   width={props.width}
      //   height={props.height}
      // />
      // <View
      //   style={styles.carouselItemContainer}
      //   width={props.width}
      //   height={props.height}
      // >

      // </View>
    );
  };
  console.log("BudgetCarousel");

  return !props.data ? (
    <View></View>
  ) : (
    <View style={styles.container}>
      <Carousel
        //ref={(c) => (carousel = c)}
        data={props.data}
        renderItem={_renderItem}
        sliderWidth={props.width}
        itemWidth={props.width}
        // contentContainerStyle={styles.carouselItemContainer}
        // containerCustomStyle={{flexGrow: 0}}
        inactiveSlideShift={0}
        onSnapToItem={(index) => props.parentCallback(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...centered,
  },
  carouselItemContainer: {
    ...centered,
  },
});

export default withTheme(BudgetCarousel);
