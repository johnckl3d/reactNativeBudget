import React from "react";
import { Platform } from "react-native";
import { Button, Text, withTheme } from "react-native-paper";
import Colors from "@Styles/colors";

const CustomButton = (props) => {
  return (
    <Button
      {...props}
      icon={props.iconName}
      mode="contained"
      size={50}
      labelStyle={{ color: "white", fontSize: 18 }}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    >
      <Text style={{ color: Colors.white }}>{props.text}</Text>
    </Button>
  );
};

export default withTheme(CustomButton);
