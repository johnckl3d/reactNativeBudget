import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import * as React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { centered, shadow } from '../../styles/presentation';
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import Card from "../UI/Card";
import Chart from "./Chart";
import CarousellStyles from './styles';
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);



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
        {/* <Chart snapshots={item.costSnapShots} /> */}

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
          containerCustomStyle={styles.carouselItemContainer}
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
            dotStyle={CarousellStyles.paginationDot}
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
  carouselItemContainer: {
    ...CarousellStyles.carouselItemContainer,
    ...shadow,
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'center'
  }
})

