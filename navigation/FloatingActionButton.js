import React, { useCallback, useState, useEffect } from "react";
import { withTheme, Colors, Text, FAB, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import i18n from "@I18N/i18n";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import * as budgetsActions from "@Actions/budgets";

const FloatingActionButton = ({ visible, actions, navigation }) => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;
  const dispatch = useDispatch();

  const FABActions = [
    {
      icon: "plus",
      label: i18n.t("budget.addCostItem"),
      onPress: () => {
        addCostItemHandler();
      },
    },
    {
      icon: "email",
      label: i18n.t("budget.addCategory"),
      onPress: () => {
        addCostCategoryHandler();
      },
    },
    {
      icon: "star",
      label: i18n.t("budget.deleteBudget"),
      onPress: () => {
        deleteBudgetHandler();
      },
    },
    {
      icon: "bell",
      label: i18n.t("budget.addBudget"),
      onPress: () => {
        addBudgetHandler();
      },
    },
  ];

  const addCostItemHandler = () => {
    navigation.navigate("EditCostItemScreen");
  };

  const addCostCategoryHandler = () => {
    navigation.navigate("EditCostCategoryScreen", {
      onComplete: loadBudgets,
    });
  };

  const editBudgetHandler = () => {
    navigation.navigate("EditBudgetScreen");
  };

  const addBudgetHandler = () => {
    navigation.navigate("EditBudgetScreen");
  };

  const deleteBudgetHandler = () => {
    const name = budgets[selectedBudgetIndex].name;
    const budgetId = budgets[selectedBudgetIndex].budgetId;
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteBudget(login.accessToken, budgetId);
        },
      },
    ]);
  };

  const deleteBudget = useCallback(
    async (token, budgetId) => {
      dispatch(budgetsActions.deleteBudget(token, budgetId));
    },
    [dispatch]
  );

  return (
    <Portal>
      <FAB.Group
        style={styles.fab}
        open={open}
        icon={open ? "calendar-today" : "plus"}
        actions={FABActions}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        visible={visible}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 4,
  },

  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
});

export default withTheme(FloatingActionButton);
