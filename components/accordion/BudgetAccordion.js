import React, { useCallback, useEffect, useState } from "react";
import Colors from "@Styles/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import {
  Avatar,
  Button,
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
  TouchableRipple,
  withTheme,
} from "react-native-paper";
import ScreenWrapper from "@UIComponents/ScreenWrapper";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  highlightYellow,
  centered,
  shadow,
  highlightRed,
  highlightGreen,
} from "../../styles/presentation";
import moment from "moment";
import i18n from "@I18N/i18n";
import { nFormatter } from "@Utils/commonUtils";
import Styles from "@Styles/styles";
import CostCategoryItem from "@Accordion/CostCategoryItem";

const BudgetAccordion = (props) => {
  const withScrollView = false;
  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  const renderCostCategoriesItem = ({ item }) => {
    return <CostCategoryItem item={item}></CostCategoryItem>;
  };

  return (
    <ScreenWrapper withScrollView={withScrollView} style={styles.container}>
      <FlatList
        data={props.costCategories}
        keyExtractor={(item) => item.costCategoryId}
        renderItem={renderCostCategoriesItem}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: hp(20) },
  layoutList: { ...Styles.layoutList },
  textHeading5: { ...Styles.textHeading5, borderColor: Colors.red },
  textCitation: { ...Styles.textCitation },
  centered: { ...centered, height: hp(5), flex: 1 },
  highlightRed: { ...Styles.highlightRed },
  listItemTight: { ...Styles.listItemTight },
});

export default withTheme(BudgetAccordion);
