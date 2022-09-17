import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { centered, highlightRed } from "../../styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import React, { useCallback, useEffect, useState, useRef } from "react";
import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";

import _ from "lodash";
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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ACTION_TYPES from "@Actions/actionTypes";
import {
  generateMonthRange,
  getMonthIndexFromMonthArray,
  generateMondayStringFromMonth,
  generateAmountFromMonth,
} from "@Utils/dates";

const MonthCarousel = (props) => {
  const FSM = useSelector((store) => store.FSM);
  const monthRange = FSM.monthRange;
  const selectedBudgetMonth = FSM.selectedBudgetMonth;
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;

  const _renderItem = ({ item }) => {
    return (
      <Card style={styles.carouselItemContainer}>
        <Subheading>{item}</Subheading>
      </Card>
    );
  };
  useDeepCompareEffect(() => {
    const result = generateMonthRange();
    dispatch({
      type: ACTION_TYPES.SET_MONTHRANGE,
      monthRange: result,
    });
  }, [monthRange, dispatch]);

  useEffect(() => {
    const monthStr = moment().format("YYYY MMM");
    const index = getMonthIndexFromMonthArray(monthStr, monthRange);
    if (index > -1) {
      setMonthData(index);
    }
  }, [monthRange, dispatch]);

  const setMonthData = async (index) => {
    const month = monthRange[index];

    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTH,
      selectedBudgetMonth: month,
    });
  };

  if (selectedBudgetMonth === "") {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <Carousel
        //ref={(c) => (this.carousel = c)}
        data={monthRange}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        contentContainerStyle={styles.carouselItemContainer}
        //containerCustomStyle={{flexGrow: 0}}
        inactiveSlideShift={0}
        firstItem={getMonthIndexFromMonthArray(selectedBudgetMonth, monthRange)}
        initialScrollIndex={getMonthIndexFromMonthArray(
          selectedBudgetMonth,
          monthRange
        )}
        onSnapToItem={(index) => setMonthData(index)}
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
    height: hp(5),
  },
});

export default withTheme(MonthCarousel);
