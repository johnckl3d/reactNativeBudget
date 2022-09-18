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

  const renderCostItem = ({ item }) => {
    return (
      <List.Section style={[styles.layoutList, styles.highlightRed]}>
        <List.Subheader
          style={[
            styles.textHeading5,
            styles.listItemTight,
            styles.highlightRed,
            { height: hp(3) },
          ]}
        >
          {moment(item.dateTime).format("LL")}
        </List.Subheader>
        <List.Item
          left={() => (
            <IconButton icon="camera" size={hp(3)} onPress={() => {}} />
          )}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
          title={item.name}
          titleStyle={styles.textCitation}
          style={[
            styles.centered,
            styles.listItemTight,
            styles.highlightRed,
            { height: hp(8) },
          ]}
          description={
            `Amount: ${i18n.t("common.currency")}` +
            `${nFormatter(item.amount)}`
          }
          descriptionStyle={styles.textCitation}
        />
        <View></View>
      </List.Section>
    );
  };

  const renderCostCategoriesItem = ({ item }) => {
    console.log("BudgetAccordion::renderCostCategoriesItem");
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
