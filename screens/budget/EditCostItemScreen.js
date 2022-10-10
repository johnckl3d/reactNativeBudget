import Colors from "@Styles/colors";
import React, { useCallback, useEffect, useState, useReducer } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "@UIComponents/CustomTextInput";
import * as costItemActions from "../../store/actions/costItems";
import i18n from "@I18N/i18n";
import CustomBottomButton from "@UIComponents/CustomBottomButton";
import Styles from "@Styles/styles";
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
import { extractCostCategoryList } from "@Utils/commonUtils";
import SelectDropdown from "react-native-select-dropdown";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
import {
  ActivityIndicator,
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
  withTheme,
  FAB,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import CustomDatePicker from "@UIComponents/CustomDatePicker";

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

const EditCostItemScreen = ({ route, navigation }) => {
  const login = useSelector((store) => store.login);
  const FSM = useSelector((store) => store.FSM);
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;
  const dispatch = useDispatch();
  let costCategoryId = null;
  let costItemId = null;
  const editedBudget = budgets[selectedBudgetIndex];
  let selectedCostCategoryIndex = route.params?.selectedCostCategoryIndex;
  let selectedCostItemIndex = route.params?.selectedCostItemIndex;
  let editedCostCategory = null;
  let editedCostItem = null;
  if (editedBudget != null && selectedCostCategoryIndex != null) {
    editedCostCategory = editedBudget.costCategories[selectedCostCategoryIndex];

    if (editedCostCategory != null && selectedCostItemIndex != null) {
      editedCostItem = editedCostCategory[selectedCostItemIndex];
    }
  }
  const [showDropDown, setShowDropDown] = useState(false);
  const [category, setCategory] = useState("");

  // const setCategory = (val) => {
  //   console.log("editCostItemScreen::setCategory::val::" + val);
  //   const result = costCategoryArr.find((item) => item.value === val);
  //   console.log(
  //     "editCostItemScreen::setCategory::result::" + JSON.stringify(result)
  //   );
  //   category = result.value;
  //   console.log(
  //     "editCostItemScreen::setCategory::category::" + JSON.stringify(category)
  //   );
  // };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedCostItem ? editedCostItem.title : "",
      description: editedCostItem ? editedCostItem.description : "",
      amount: editedCostItem ? editedCostItem.amount : "",
      date: editedCostItem ? editedCostItem.date : "",
    },
    inputValidities: {
      title: editedCostItem ? true : true,
      description: editedCostItem ? true : true,
      amount: editedCostItem ? true : true,
      date: editedCostItem ? true : true,
    },
    formIsValid: editedCostItem ? true : true,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    try {
      var token = login.accessToken;
      var costCategoryArr = [];
      if (editedBudget != null && editedBudget.costCategories.length > 0) {
        costCategoryArr = extractCostCategoryList(budgets[selectedBudgetIndex]);
      }
      const obj = costCategoryArr.find((item) => item.value === category);
      console.log(
        "EditCostItemScreen::submitHandler::obj::" + JSON.stringify(obj)
      );
      console.log(
        JSON.stringify(
          "editCostItemScreen::category::" + JSON.stringify(category)
        )
      );
      await dispatch(
        costItemActions.createCostItem(
          token,
          category,
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.amount
        )
      );
    } catch (err) {
      throw err;
    }
    navigation.goBack();
  }, [dispatch, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log("inputChangeHandler::inputIdentifier::" + inputIdentifier);
      console.log("inputChangeHandler::inputValue::" + inputValue);
      console.log("inputChangeHandler::inputValidity::" + inputValidity);
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
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={[styles.form, { backgroundColor: Colors.white }]}>
          <CustomTextInput
            id="title"
            label={i18n.t("editCostItem.name")}
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCostItem ? editedCostCategory.name : ""}
            initiallyValid={!!editedCostItem}
            required
            minLength={5}
          />
          <CustomTextInput
            id="description"
            label={i18n.t("editCostItem.description")}
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCostItem ? editedCostCategory.description : ""}
            initiallyValid={!!editedCostItem}
            required
            minLength={5}
          />
          <SelectDropdown
            data={extractCostCategoryList(budgets[selectedBudgetIndex])}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem.value);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.label;
            }}
          />
          <View>
            <Text style={styles.label}>{i18n.t("editCostItem.date")}</Text>
            <CustomDatePicker id="date" onInputChange={inputChangeHandler} />
          </View>
          <CustomTextInput
            id="amount"
            label={i18n.t("editCostItem.amount")}
            errorText="Please enter a valid amount!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={
              editedCostItem ? editedCostItem.amount.toString() : ""
            }
            initiallyValid={!!editedCostItem}
            required
            min={0.1}
          />
        </View>
        <View style={styles.buttonBottom}>
          <CustomBottomButton
            text={i18n.t("editCostCategory.add")}
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

export default EditCostItemScreen;
