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
  generateMonthArrayList,
  getCurrentMonthIndexFromMonthArray,
} from "@Utils/dates";

const MonthCarousel = (props) => {
  const FSM = useSelector((store) => store.FSM);
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

  const monthsList = generateMonthArrayList();
  useEffect(() => {
    //const index = moment().month();
    const index = getCurrentMonthIndexFromMonthArray(monthsList);
    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTHINDEX,
      selectedBudgetMonthIndex: index,
    });
  }, [dispatch]);

  const handleMonthsSwipeCallback = (index) => {
    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTHINDEX,
      selectedBudgetMonthIndex: index,
    });
  };

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
        firstItem={FSM.selectedBudgetMonthIndex}
        initialScrollIndex={FSM.selectedBudgetMonthIndex}
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
