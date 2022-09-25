import CostItem from "@Accordion/CostItem";
import i18n from "@I18N/i18n";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import { nFormatter } from "@Utils/commonUtils";
import { heightPercentageToDP as hp } from "@Utils/scalingUtils";
import { Divider, IconButton, List, withTheme } from "react-native-paper";
import { centered } from "../../styles/presentation";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import * as costCategoriesActions from "../../store/actions/costCategories";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const CostCategoryItem = ({ item }) => {
  console.log("CostCategoryItem::costCategoryId::" + item.costCategoryId);
  const login = useSelector((store) => store.login);
  const token = login.accessToken;
  const FSM = useSelector((store) => store.FSM);
  const dispatch = useDispatch();

  const renderCostItem = ({ item }) => {
    return <CostItem costCategoryId={costCategoryId} item={item}></CostItem>;
  };

  const deleteCostCategoryHander = (costCategoryId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteCostCategory(login.accessToken, costCategoryId);
        },
      },
    ]);
  };

  const deleteCostCategory = useCallback(
    async (token, costCategoryId) => {
      dispatch(costCategoriesActions.deleteCostCategory(token, costCategoryId));
    },
    [dispatch]
  );

  return item.costItems.length > 0 ? (
    <List.Section>
      <List.Accordion
        style={[
          styles.layoutList,
          styles.listItemTight,
          styles.highlightRed,
          { height: hp(7) },
        ]}
        title={item.name}
        titleStyle={styles.textHeading5}
        description={
          `Amount: ${i18n.t("common.currency")}` +
          `${nFormatter(item.totalAmount)}`
        }
        descriptionStyle={[
          { color: Colors.red },
          styles.centered,
          styles.textCitation,
        ]}
      >
        <FlatList
          data={item.costItems}
          keyExtractor={(item) => item.costItemId}
          renderItem={renderCostItem}
        />
      </List.Accordion>
      <Divider />
    </List.Section>
  ) : (
    <List.Item
      title={item.name}
      titleStyle={styles.textCitation}
      description={item.totalAmount}
      descriptionStyle={[{ color: Colors.red }, styles.centered]}
      right={() => (
        <IconButton
          icon="dots-vertical"
          onPress={() => {
            deleteCostCategoryHander(item.costCategoryId, item.name);
          }}
        />
      )}
    />
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

export default withTheme(CostCategoryItem);
