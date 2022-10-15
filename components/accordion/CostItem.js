import i18n from "@I18N/i18n";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import { nFormatter } from "@Utils/commonUtils";
import { heightPercentageToDP as hp } from "@Utils/scalingUtils";
import moment from "moment";
import { Alert, StyleSheet, View } from "react-native";
import { IconButton, List, withTheme, Menu } from "react-native-paper";
import { centered } from "../../styles/presentation";
import React, { useCallback, useEffect, useState } from "react";
import * as budgetsActions from "@Actions/budgets";
import * as costItemsActions from "@Actions/costItems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CostItem = ({ costCategoryId, item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const token = login.accessToken;
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;
  const editedBudget = budgets[selectedBudgetIndex];
  const [visible, setVisible] = useState(false);
  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  const deleteCostItemHander = (name, costItemId) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          closeMenu();
        },
        onPress: () => {
          closeMenu();
          deleteCostItem(login.accessToken, costCategoryId, costItemId);
        },
      },
    ]);
    return;
  };

  const deleteCostItem = useCallback(
    async (token, costCategoryId, costItemId) => {
      dispatch(
        costItemsActions.deleteCostItem(token, costCategoryId, costItemId)
      );
    },
    [dispatch]
  );

  const editCostItemHander = () => {
    // console.log(
    //   "CostItem::editCostItemHander::editedBudget::" +
    //     JSON.stringify(editedBudget)
    // );
    // console.log(
    //   "CostItem::editCostItemHander::costCategoryId::" + costCategoryId
    // );
    //console.log("CostItem::editCostItemHander::costItemId::" + item.costItemId);
    const selectedCostCategoryIndex = editedBudget.costCategories.findIndex(
      (obj) => obj.costCategoryId === costCategoryId
    );
    // console.log(
    //   "CostItem::editCostItemHander::selectedCostCategoryIndex::" +
    //     selectedCostCategoryIndex
    // );
    const cc = editedBudget.costCategories[selectedCostCategoryIndex];
    //console.log("CostItem::editCostItemHander::cc::" + JSON.stringify(cc));
    const selectedCostItemIndex = cc.costItems.findIndex(
      (obj) => obj.costItemId === item.costItemId
    );
    const ci = cc.costItems[selectedCostItemIndex];
    //console.log("CostItem::editCostItemHander::ci::" + JSON.stringify(ci));
    closeMenu();
    navigation.navigate("EditCostItemScreen", {
      costCategoryId: costCategoryId,
      costItem: ci,
    });
  };

  return (
    <View>
      <List.Subheader
        style={[styles.textHeading5, styles.listItemTight, { height: hp(3) }]}
      >
        {moment(item.dateTime).format("LL")}
      </List.Subheader>
      <List.Item
        style={[styles.listItemTight, { height: hp(5) }]}
        left={() => (
          <IconButton icon="camera" size={hp(3)} onPress={() => {}} />
        )}
        right={() => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                size={hp(3)}
                icon="dots-vertical"
                onPress={() => openMenu(item.name)}
              >
                Show menu
              </IconButton>
            }
          >
            <Menu.Item onPress={editCostItemHander} title="Edit" />
            <Menu.Item
              onPress={() => deleteCostItemHander(item.name, item.costItemId)}
              title="Delete"
            />
          </Menu>
        )}
        title={item.name}
        titleStyle={styles.textCitation}
        description={
          `Amount: ${i18n.t("common.currency")}` + `${nFormatter(item.amount)}`
        }
        descriptionStyle={styles.textCitation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: hp(20) },
  layoutList: { ...Styles.layoutList },
  textHeading5: { ...Styles.textHeading5, borderColor: Colors.red },
  textCitation: { ...Styles.textCitation },
  centered: { ...centered },
  highlightRed: { ...Styles.highlightRed },
  listItemTight: { ...Styles.listItemTight },
});

export default withTheme(CostItem);
