import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import {
  Button,
  Text,
  withTheme,
  Title,
  Paragraph,
  IconButton,
  List,
  Menu,
  Appbar,
  Provider,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "@UIComponents/CustomTextInput";
import * as costCategoriesActions from "../../store/actions/costCategories";
import CustomBottomButton from "@UIComponents/CustomBottomButton";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import i18n from "@I18N/i18n";
import {
  column,
  row,
  highlightRed,
  highlightYellow,
  centered,
  shadow,
  bottom,
  centeredStretch,
  highlightGreen,
} from "@Styles/presentation";
import SelectDropdown from "react-native-select-dropdown";
import { extractCostCategoryList } from "@Utils/commonUtils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import { SETTINGS } from "@Constants/settings";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import ScreenWrapper from "@UIComponents/ScreenWrapper";
import ExpensesCategoryView from "./ExpensesCategoryView";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditCostCategoryListScreen = ({ route, navigation }) => {
  const login = useSelector((store) => store.login);
  const FSM = useSelector((store) => store.FSM);
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;

  const dispatch = useDispatch();
  const goTo = useTabNavigation();
  const index = useTabIndex();
  let editedCostCategory = null;
  const editedBudget = budgets[selectedBudgetIndex];
  let costCategoryId = null;

  let categoryId = route.params?.costCategoryId;
  let color = route.params?.color;
  let icon = route.params?.icon;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedCostCategory ? editedCostCategory.title : "",
      description: editedCostCategory ? editedCostCategory.description : "",
    },
    inputValidities: {
      title: editedCostCategory ? true : false,
      description: editedCostCategory ? true : false,
    },
    formIsValid: editedCostCategory ? true : false,
  });

  const openMenuHandler = () => {
    console.log("openMenuHandler");
  };

  const deleteCostCategoryHander = (name, costItemId) => {
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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
      var token = login.accessToken;
      await dispatch(
        costCategoriesActions.createCostCategory(
          token,
          editedBudget.budgetId,
          formState.inputValues.title,
          formState.inputValues.description,
          editedBudget
        )
      );
    } catch (err) {
      throw err;
    }
    navigation.goBack();
  }, [dispatch, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const renderCostCategoriesItem = ({ item }) => {
    console.log("renderCostCategoriesItem::" + JSON.stringify(item));
    return (
      <List.Item
        right={() => (
          <IconButton
            icon="dots-vertical"
            onPress={openMenuHandler}
          ></IconButton>
        )}
        title={item.label}
        titleStyle={styles.textCitation}
        style={[
          styles.centered,
          styles.listItemTight,
          styles.highlightRed,
          { height: hp(8) },
        ]}
      />
    );
  };

  const ExpensesView = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={extractCostCategoryList(budgets[selectedBudgetIndex])}
          keyExtractor={(item) => item.value}
          renderItem={renderCostCategoriesItem}
        />
      </View>
    );
  };

  const IncomeView = () => {
    return (
      <View style={{ flex: 1 }}>
        <Title>{i18n.t("editCostCategory.income")}</Title>
        <Paragraph>Index: {index}</Paragraph>
        <Button onPress={() => goTo(1)}>Go to Flights</Button>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Tabs>
        <TabScreen label={i18n.t("editCostCategory.expenses")} icon="compass">
          <ExpensesCategoryView
            data={extractCostCategoryList(budgets[selectedBudgetIndex])}
          ></ExpensesCategoryView>
          <FlatList
            data={extractCostCategoryList(budgets[selectedBudgetIndex])}
            keyExtractor={(item) => item.value}
            renderItem={renderCostCategoriesItem}
          />
        </TabScreen>
        <TabScreen label={i18n.t("editCostCategory.income")} icon="airplane">
          <IncomeView />
        </TabScreen>
      </Tabs>
      <View style={styles.buttonBottom}>
        <CustomBottomButton
          text={i18n.t("editCostCategory.add")}
          onPress={() => {
            submitHandler();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutList: { ...Styles.layoutList },
  textHeading5: { ...Styles.textHeading5, borderColor: Colors.red },
  textCitation: { ...Styles.textCitation },
  centered: { ...centered, height: hp(5), flex: 1 },
  highlightRed: { ...Styles.highlightRed },
  listItemTight: { ...Styles.listItemTight },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centered: {
    ...centered,
  },
  buttonBottom: {
    ...Styles.buttonBottom,
  },
  footer: {
    ...Styles.footer,
  },
  form: {
    margin: 20,
  },
  button: {
    paddingTop: 20,
  },
});

export default withTheme(EditCostCategoryListScreen);
