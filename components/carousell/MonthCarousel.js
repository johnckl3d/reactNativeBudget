import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { centered, highlightRed } from "../../styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import React, { useCallback, useEffect, useState } from "react";
import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
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
  const graphDataAmount = FSM.graphDataAmount;
  const graphDataWeek = FSM.graphDataWeek;
  const selectedBudgetMonth = FSM.selectedBudgetMonth;
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const budgetIndex = budgets.findIndex(
    (obj) => obj.budgetId === FSM.selectedBudgetId
  );
  const costSnapShots = budgets[budgetIndex].costSnapShots;
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;

  const _renderItem = ({ item }) => {
    return (
      <Card style={styles.carouselItemContainer}>
        <Subheading>{item}</Subheading>
      </Card>
    );
  };

  const monthsList = generateMonthRange();
  console.log("MonthCarousel::monthList::" + monthsList);
  useEffect(() => {
    const monthStr = moment().format("YYYY MMM");
    const index = getMonthIndexFromMonthArray(monthStr, monthsList);
    const month = monthsList[index];
    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTH,
      selectedBudgetMonth: month,
    });
  }, [dispatch]);

  const handleMonthsSwipeCallback = async (index) => {
    console.log("MonthCarousel::handleMonthsSwipeCallback::index::" + index);
    const month = monthsList[index];
    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTH,
      selectedBudgetMonth: month,
    });
    console.log(
      "MonthCarousel::handleMonthsSwipeCallback::selectedBudgetMonth::" +
        selectedBudgetMonth
    );
    const amountArr = generateAmountFromMonth(costSnapShots, month);
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
      graphDataAmount: amountArr,
    });

    const weekArr = generateMondayStringFromMonth(month);
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAWEEK,
      graphDataWeek: weekArr,
    });

    // var weekArr = convertCostSnapShotsToWeekDate();

    // var amountArr = convertCostSnapShotsToWeekAmount();
  };

  const convertCostSnapShotsToWeekAmount = () => {
    const amountArr = generateAmountFromMonth(
      costSnapShots,
      selectedBudgetMonth
    );
    return amountArr;
  };

  const convertCostSnapShotsToWeekDate = () => {
    const arr = generateMondayStringFromMonth(selectedBudgetMonth);
    return arr;
  };

  if (selectedBudgetMonth === "") {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <Carousel
        //ref={(c) => (this.carousel = c)}
        data={monthsList}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        contentContainerStyle={styles.carouselItemContainer}
        //containerCustomStyle={{flexGrow: 0}}
        inactiveSlideShift={0}
        firstItem={getMonthIndexFromMonthArray(selectedBudgetMonth, monthsList)}
        initialScrollIndex={getMonthIndexFromMonthArray(
          selectedBudgetMonth,
          monthsList
        )}
        onSnapToItem={(index) => handleMonthsSwipeCallback(index)}
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
