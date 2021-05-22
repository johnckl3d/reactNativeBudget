import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import * as React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  column,
  row,
  highlightRed,
  highlightYellow,
  centered,
  shadow,
  bottom,
  centeredStretch
} from "../../styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import Card from "../UI/Card";
import Chart from "./Chart";
import CarousellStyles from "./styles";
// const CHART_WIDTH = Math.round(Dimensions.get("window").width);
// const CHART_HEIGHT = CHART_WIDTH * 0.75;
// const ITEM_WIDTH = Math.round(Dimensions.get("window").width * 0.8);

export default class BudgetCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item }) {
    return (
      <View style={styles.carouselItemContainer}>
        <Chart
          snapshots={item.costSnapShots}
          width={this.props.width}
          height={this.props.height}
        />
      </View>
    );
  }

  render() {
    const  data  = this.props.data;
    console.log("render::" + JSON.stringify(data));
    console.log("render");
    return !data ? (
      <View></View>
    ) : (
      
      <View>
          <Carousel
            ref={(c) => (this.carousel = c)}
            data={data}
            renderItem={this._renderItem}
            sliderWidth={this.props.width}
            itemWidth={this.props.width * 0.8}
            contentContainerStyle={styles.carouselItemContainer}
            containerCustomStyle={{flexGrow: 0}}
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
    ...highlightRed
  },
  carouselItemContainer: {
    ...highlightRed,
    ...CarousellStyles.carouselItemContainer,
    ...centered,
  },
 
});
