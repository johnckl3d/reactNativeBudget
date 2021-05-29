import * as React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  centered, highlightRed
} from "../../styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import Chart from "./Chart";

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
      <View style={styles.carouselItemContainer} width={this.props.width} height={this.props.height}>
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
      
      <View style={styles.container}>
          <Carousel
            ref={(c) => (this.carousel = c)}
            data={data}
            renderItem={this._renderItem}
            sliderWidth={this.props.width}
            itemWidth={this.props.width}
            // contentContainerStyle={styles.carouselItemContainer}
            // containerCustomStyle={{flexGrow: 0}}
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
  },
 
});
