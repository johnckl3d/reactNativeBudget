import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@Styles/colors";

const CustomButton = (props) => {
  return (
    <Ionicons
      name={props.iconName}
      size={50}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomButton;
