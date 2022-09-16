import i18n from "@I18N/i18n";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import { nFormatter } from "@Utils/commonUtils";
import React from "react";
import { StyleSheet } from "react-native";
import { formatNumber } from "react-native-currency-input";
import { Subheading, withTheme } from "react-native-paper";

const MediumCurrencyText = ({ value, colorCode, color }) => {
  const nValue = nFormatter(value);
  console.log("MediumCurrencyText::nValue::" + nValue);
  const formattedValue = formatNumber(nValue, {
    separator: ".",
    prefix: i18n.t("common.currency"),
    precision: 2,
    delimiter: ",",
    signPosition: "beforePrefix",
  });

  const getColor = (value) => {
    var result = "black";
    if (colorCode === true) {
      if (Math.sign(value) === -1) {
        result = Colors.red;
      } else {
        result = Colors.green;
      }
    } else if (color) {
      result = color;
    }
    return result;
  };

  return (
    //iconName
    //onPress
    //text

    <Subheading
      style={[
        {
          color: getColor(value),
        },
      ]}
    >
      {formattedValue}
    </Subheading>

    // <Button
    //   {...props}
    //   mode="contained"
    //   icon={props.iconName}
    //   onPress={props.onPress}
    //   style={styles.buttonLarge}
    // >
    //   <Text style={styles.buttonText}>{props.text}</Text>
    // </Button>
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

export default withTheme(MediumCurrencyText);
