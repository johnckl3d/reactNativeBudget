import Styles from "@Styles/styles";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, Text, withTheme } from "react-native-paper";

const CustomLargeButton = (props) => {
  return (
    //iconName
    //onPress
    //text

    <Button
      {...props}
      mode="contained"
      icon={props.iconName}
      onPress={props.onPress}
      style={styles.buttonLarge}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonLarge: {
    ...Styles.buttonLarge,
  },
  buttonText: {
    ...Styles.buttonText,
    color: Colors.white,
  },
});

export default withTheme(CustomLargeButton);
