import * as React from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

import Carousel, { Pagination } from "react-native-snap-carousel";
import { scrollInterpolator, animatedStyles } from "../../utils/animations";
import Chart from "../../components/UI/Chart";

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
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{`Item ${item.name}`}</Text>
        <Chart snapshots={item.costSnapShots} />
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return !data ? (
      <View></View>
    ) : (
      <View>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <View>
          <Pagination
            containerStyle={{ backgroundColor: "rgba(1, 0, 0, 1)", borderWidth: 5 }}
            dotStyle={styles.ww}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            activeDotIndex={this.state.activeSlide}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  carouselContainer: {
    flex: 1,
    paddingTop: 200,
    borderWidth: 5
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  ww: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
});
