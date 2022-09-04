import Styles from "@Styles/styles";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, withTheme } from "react-native-paper";

const CustomLargeOutlineButton = (props) => {
  return (
    //iconName
    //onPress
    //text

    <Button
      {...props}
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
  },
});

export default withTheme(CustomLargeOutlineButton);
