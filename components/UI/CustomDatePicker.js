import React, { useCallback, useEffect, useState, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
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

const CustomDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const dateChangeHandler = (val) => {
    //console.log("dateChangeHandler::val::" + val);
    setDate(val);
    lostFocusHandler();
    var isValid = true;
    var error = "";
    dispatch({
      type: KEY.INPUT_CHANGE,
      value: val,
      isValid: isValid,
      error: error,
    });
  };

  const lostFocusHandler = () => {
    setOpen(false);
    dispatch({ type: KEY.INPUT_BLUR });
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 15 }}>
      <View
        style={{
          marginLeft: 15,
          flexDirection: "column",
        }}
      ></View>
      <Button
        icon="calendar-month"
        iconColor={Colors.primary}
        size={20}
        mode="contained"
        onPress={() => setOpen(true)}
      ></Button>
      <Text style={styles.label}>{formatDate(date, "lll")}</Text>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          dateChangeHandler(date);
        }}
        onCancel={() => {
          lostFocusHandler();
        }}
      />
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "OpenSans-Bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  divider: {
    marginVertical: 30,
    bold: true,
  },
  errorText: {
    fontFamily: "OpenSans",
    color: "red",
    fontSize: 13,
  },
});

export default withTheme(CustomDatePicker);
