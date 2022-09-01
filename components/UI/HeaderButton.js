import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
//import { Ionicons } from '@expo/vector-icons';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Colors from "@Styles/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AwesomeIcon}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
