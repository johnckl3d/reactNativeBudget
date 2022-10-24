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
import { ICON_ARRAY } from "@Constants/common";

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

const ExpensesCategoryView = ({ route, navigation }) => {
  const login = useSelector((store) => store.login);
  const FSM = useSelector((store) => store.FSM);
  const dispatch = useDispatch();
  let editedCostCategory = route.params?.data;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedCostCategory ? editedCostCategory.title : "",
      color: editedCostCategory ? editedCostCategory.color : "black",
      icon: editedCostCategory ? icon : "",
    },
    inputValidities: {
      title: editedCostCategory ? true : false,
      color: editedCostCategory ? true : false,
      icon: editedCostCategory ? true : false,
    },
    formIsValid: false,
  });

  const deleteExpenseCategoryHander = (name, costItemId) => {
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

  const deleteExpenseCategory = useCallback(
    async (token, costCategoryId, costItemId) => {},
    [dispatch]
  );

  const selectIcon = () => {
    console.log("select icon");
  };

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.white,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-start" }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={[styles.form, { backgroundColor: Colors.white }]}>
          <CustomTextInput
            id="title"
            label={i18n.t("expenseCategory.name")}
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCostItem ? editedCostItem.name : ""}
            initiallyValid={!!editedCostItem}
            required
            minLength={5}
            placeholderText={i18n.t("editCostItem.namePlaceholder")}
          />
          <SafeAreaView style={styles.container}>
            <FlatList
              data={ICON_ARRAY}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                  <IconButton icon={item} onPress={() => selectIcon(item)} />
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index}
            />
          </SafeAreaView>
        </View>
        <View style={styles.buttonBottom}>
          <CustomBottomButton
            text={i18n.t("expenseCategory.save")}
            onPress={() => {
              submitHandler();
            }}
          />
        </View>
      </KeyboardAvoidingView>
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

export default withTheme(ExpensesCategoryView);
