import React, { useCallback, useEffect, useState, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import Styles from "@Styles/styles";
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
import moment from "moment";

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

  const { onInputChange, id, dateTime } = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  useEffect(() => {
    if (dateTime) {
      const d = new Date(dateTime);
      setDate(d);
    }
  }, []);

  useEffect(() => {
    onInputChange(id, date, true);
  }, []);

  const dateChangeHandler = (val) => {
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
    <View>
      <Button
        style={{
          ...styles.buttonIcon,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        icon="calendar-month"
        iconColor={Colors.primary}
        size={20}
        mode="contained"
        onPress={() => setOpen(true)}
      >
        {formatDate(date, "lll")}
      </Button>
      {/* <Text style={styles.label}>{formatDate(date, "lll")}</Text> */}
      <DatePicker
        selected={date}
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
      <Divider />
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
  errorText: {
    fontFamily: "OpenSans",
    color: "red",
    fontSize: 13,
  },
  buttonIcon: {
    ...Styles.buttonIcon,
  },
});

export default withTheme(CustomDatePicker);
