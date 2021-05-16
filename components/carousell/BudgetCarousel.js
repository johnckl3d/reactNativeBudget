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
const CHART_WIDTH = Math.round(Dimensions.get("window").width);
const CHART_HEIGHT = Math.round(Dimensions.get("window").height * 0.5);

export default class BudgetCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  _renderItem({ item }) {
    console.log("budget::item::" + JSON.stringify(item));
    return (
      <View style={styles.carouselItemContainer}>
        <Chart
          snapshots={item.costSnapShots}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
        />

        <CustomText.SemiBoldText
          text={`Item ${item.name}`}
          color={Colors.p1}
          fontSize={Fonts.medium}
        />
        <FlatList
          data={item.costSnapShots}
          keyExtractor={(item) => item.dateTime}
          renderItem={(item) => (
            <View>
              <CustomText.RegularText
                text={item.dateTime}
                color={Colors.b7}
                fontSize={Fonts.medium}
              />
              {/* <CustomText.RegularText
                  text={item.amount.toFixed(2)}
                  color={Colors.b7}
                  fontSize={Fonts.medium}
                /> */}
            </View>
          )}
        />
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return !data ? (
      <View></View>
    ) : (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => (this.carousel = c)}
            data={data}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={CHART_WIDTH * 0.8}
            contentContainerStyle={styles.carouselContainer}
            containerCustomStyle={{flexGrow: 0}}
            inactiveSlideShift={0}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
        </View>
        <Pagination
          dotsLength={data.length}
          containerStyle={styles.paginationContainer}
          dotStyle={CarousellStyles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          activeDotIndex={this.state.activeSlide}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    ...highlightRed
  },
  carouselContainer: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
  },
  carouselItemContainer: {
    ...CarousellStyles.carouselItemContainer,
    ...shadow,
    ...centeredStretch,

  },
  paginationContainer: {
    backgroundColor: "rgba(1, 0, 0, 1)",
    height: 20,
    width: Dimensions.get("window").width,
...highlightYellow,
  },
});
