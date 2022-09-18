import i18n from "@I18N/i18n";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import { nFormatter } from "@Utils/commonUtils";
import { heightPercentageToDP as hp } from "@Utils/scalingUtils";
import moment from "moment";
import { Alert, StyleSheet, View } from "react-native";
import { IconButton, List, withTheme } from "react-native-paper";
import { centered } from "../../styles/presentation";
import React, { useCallback, useEffect, useState } from "react";
import * as budgetsActions from "@Actions/budgets";
import { useDispatch, useSelector } from "react-redux";

const CostItem = ({ costCategoryId, item }) => {
  console.log("CostItem::costCategoryId::" + costCategoryId);
  const dispatch = useDispatch();
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);

  const deleteHandler = (name, costItemId) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteCostItem(login.accessToken, costCategoryId, costItemId);
        },
      },
    ]);
    return;
  };

  const deleteCostItem = useCallback(
    async (token, costCategoryId, costItemId) => {
      dispatch(
        budgetsActions.deleteCostItem(token, costCategoryId, costItemId)
      );
    },
    [dispatch]
  );

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
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={() => {
              deleteHandler(item.name, item.costItemId);
            }}
          />
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
          `Amount: ${i18n.t("common.currency")}` + `${nFormatter(item.amount)}`
        }
        descriptionStyle={styles.textCitation}
      />
      <View></View>
    </List.Section>
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

export default withTheme(CostItem);
