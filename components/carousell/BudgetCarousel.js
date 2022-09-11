import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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
import ACTION_TYPES from "@Actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const BudgetCarousel = (props) => {
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;

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

  useEffect(() => {
    var result = budgets[0].budgetId;
    dispatch({
      type: ACTION_TYPES.SET_BUDGETID,
      selectedBudgetId: result,
    });
  }, [dispatch]);

  const handleBudgetSwipeCallback = (index) => {
    var result = budgets[0].budgetId;
    if (index < budgets.length - 1) {
      result = budgets[index].budgetId;
    }
    dispatch({
      type: ACTION_TYPES.SET_BUDGETID,
      selectedBudgetId: result,
    });
  };

  const getIndexFromBudgetArr = (id) => {
    const index = budgets.findIndex((obj) => obj.budgetId === id);
    return index;
  };

  return (
    <View style={styles.centered}>
      <Carousel
        //ref={(c) => (carousel = c)}
        data={budgets}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        // contentContainerStyle={styles.carouselItemContainer}
        // containerCustomStyle={{flexGrow: 0}}
        inactiveSlideShift={0}
        onSnapToItem={(index) => handleBudgetSwipeCallback(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    ...centered,
  },
});

export default withTheme(BudgetCarousel);
