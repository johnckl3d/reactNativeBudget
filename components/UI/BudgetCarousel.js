import * as React from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions,FlatList } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

import Carousel, { Pagination } from "react-native-snap-carousel";
import { scrollInterpolator, animatedStyles } from "../../utils/animations";
import Chart from "../../components/UI/Chart";
import Card from "./Card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import Styles from "@Styles/styles";
import CustomText from "@CustomText";

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
      <View style={Styles.carouselItemContainer}>
        <Chart snapshots={item.costSnapShots} />

        <CustomText.SemiBoldText
          text={`Item ${item.name}`}
          color={Colors.p1}
          fontSize={Fonts.medium}
        />
        <Card>
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
        </Card>
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
          containerCustomStyle={Styles.carouselItemContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <View>
          <Pagination
            dotsLength={data.length}
            containerStyle={{
              backgroundColor: "rgba(1, 0, 0, 1)",
              borderWidth: 5,
            }}
            dotStyle={Styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            activeDotIndex={this.state.activeSlide}
          />
        </View>
      </View>
    );
  }
}

