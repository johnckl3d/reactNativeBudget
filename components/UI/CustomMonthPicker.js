import React, { useCallback, useEffect, useState, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import MonthPicker from "react-native-month-year-picker";
import {
  ActivityIndicator,
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
  Avatar,
  Button,
} from "react-native-paper";
import Colors from "@Styles/colors";
import i18n from "@I18N/i18n";
import { KEY } from "@Constants/key";
import { formatDate } from "@Utils/dates";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  generateMonthRange,
  getMonthIndexFromMonthArray,
  generateMondayStringFromMonth,
  generateAmountFromMonth,
  getMinimumMonth,
  getMaximumMonth,
} from "@Utils/dates";
import moment from "moment";
import ACTION_TYPES from "@Actions/actionTypes";

const inputReducer = (state, action) => {
  switch (action.type) {
    case KEY.INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        error: action.error,
      };
    case KEY.INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const CustomMonthPicker = (props) => {
  const FSM = useSelector((store) => store.FSM);
  const monthRange = generateMonthRange();
  const minimumMonth = getMinimumMonth();
  const maximumMonth = getMaximumMonth();
  const dispatch = useDispatch();
  const selectedBudgetMonthIndex = FSM.selectedBudgetMonthIndex;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onValueChange = (event, newDate) => {
    const selectedDate = newDate || date;

    showPicker(false);
    const month = moment(selectedDate).format("YYYY MMM");
    var index = monthRange.findIndex((data) => data === month);
    console.log("CustomMonthPicker::onValueChange::index::" + index);
    dispatch({
      type: ACTION_TYPES.SET_BUDGETMONTHINDEX,
      selectedBudgetMonthIndex: index,
    });
  };

  const showPicker = useCallback((value) => setOpen(value), []);

  return (
    <View style={{ flexDirection: "row", height: hp(3) }}>
      <Button
        style={{ flex: 1 }}
        icon="chevron-down"
        iconColor={Colors.primary}
        size={5}
        onPress={() => setOpen(true)}
      ></Button>
      {open && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date(monthRange[selectedBudgetMonthIndex])}
          minimumDate={minimumMonth}
          maximumDate={maximumMonth}
        />
      )}
      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          dateChangeHandler(date);
        }}
        onCancel={() => {
          lostFocusHandler();
        }}
      /> */}
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 30,
    bold: true,
  },
});

export default withTheme(CustomMonthPicker);
