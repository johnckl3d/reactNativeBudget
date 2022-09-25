//import useContextMenu from "@UIComponents/useContextMenu";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";

const CostCategoryContextMenu = ({ name, deleteCostCategory }) => {
  //const { anchorPoint, show } = useContextMenu();

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

  if (show) {
    return (
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} mode="outlined">
              Show menu
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              Alert.alert("Action : ", "Print");
            }}
            title="Print"
          />
          <Menu.Item
            onPress={() => {
              Alert.alert("Action : ", "Forward");
            }}
            title="Forward"
          />
          <Menu.Item onPress={deleteCostCategoryHander} title="Delete" />
          <Menu.Item
            onPress={() => {
              Alert.alert("Action :", "Save");
            }}
            title="Save"
          />
        </Menu>
      </View>
    );
  }
  return <></>;
};

export default CostCategoryContextMenu;
