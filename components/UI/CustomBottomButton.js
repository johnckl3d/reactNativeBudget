import Styles from "@Styles/styles";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, Text, withTheme } from "react-native-paper";

const CustomBottomButton = (props) => {
  return (
    //iconName
    //onPress
    //text

    <Button
      {...props}
      mode="contained"
      icon={props.iconName}
      onPress={props.onPress}
      style={styles.buttonBottom}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonBottom: {
    ...Styles.buttonBottom,
  },
  buttonText: {
    ...Styles.buttonText,
    color: Colors.white,
  },
});

export default withTheme(CustomBottomButton);
