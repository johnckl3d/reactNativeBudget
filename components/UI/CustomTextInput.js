import React, { useReducer, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { COMMON } from "@Constants/Common";
import { KEY } from "@Constants/key";

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

const CustomTextInput = (props) => {
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

  const textChangeHandler = (text) => {
    // const emailRegex =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const noRegex = /^[0-9\b]+$/;

    const emailRegex = COMMON.REGEX_EMAIL;
    const noRegex = COMMON.REGEX_NUMERIC;
    var isValid = true;
    var error = "";
    if (props.required && text.trim().length === 0) {
      isValid = false;
      error = "Field empty";
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
      error = "Please enter a valid email!";
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
      error = "Field incomplete";
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
      error = "Maximum character length reached";
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
      error = "Field incomplete";
    }
    if (
      props.keyboardType != null &&
      props.keyboardType === "numeric" &&
      !noRegex.test(text.toLowerCase())
    ) {
      isValid = false;
      error = "Please key in numeric values";
    }
    dispatch({
      type: KEY.INPUT_CHANGE,
      value: text,
      isValid: isValid,
      error: error,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: KEY.INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{inputState.error}</Text>
        </View>
      )}
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
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "OpenSans",
    color: "red",
    fontSize: 13,
  },
});

export default CustomTextInput;
