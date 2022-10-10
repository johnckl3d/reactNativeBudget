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
  Icon,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import CustomDatePicker from "@UIComponents/CustomDatePicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import {
  generateMonthRange,
  getMonthIndexFromMonthArray,
  generateMondayStringFromMonth,
  generateAmountFromMonth,
  formatDate,
} from "@Utils/dates";
import moment from "moment";
import { KEY } from "@Constants/key";

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
    console.log(
      "EditCostItemScreen::formReducer::state::" + JSON.stringify(state)
    );
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
      category: editedCostItem ? editedCostItem.category : "",
      date: editedCostItem ? editedCostItem.date : "",
      amount: editedCostItem ? editedCostItem.amount : "",
    },
    inputValidities: {
      title: editedCostItem ? true : false,
      description: editedCostItem ? true : false,
      category: editedCostItem ? true : false,
      date: editedCostItem ? true : false,
      amount: editedCostItem ? true : false,
    },
    formIsValid: editedCostItem ? true : false,
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
      const dateTime = formatDate(
        moment(formState.inputValues.dateTime),
        KEY.FORMAT_DATETIME_MSSQL
      );
      console.log("EditCostItemScreen::submitHandler::dateTime::" + dateTime);
      await dispatch(
        costItemActions.createCostItem(
          token,
          category,
          formState.inputValues.title,
          formState.inputValues.description,
          dateTime,
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
          <Text style={styles.textHeading1}>
            {editedBudget ? editedBudget.name : ""}
          </Text>
          {/* <CustomTextInput
            id="budget"
            label={i18n.t("editCostItem.budget") + }
            initialValue={
              selectedBudgetIndex ? budgets[selectedBudgetIndex].name : ""
            }
            initiallyValid={!!editedCostItem}
            disabled={true}
          /> */}
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
            placeholderText={i18n.t("editCostItem.namePlaceholder")}
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
            placeholderText={i18n.t("editCostItem.descriptionPlaceholder")}
          />
          <View
            style={{ flexDirection: "row", marginTop: 15, marginBottom: 15 }}
          >
            <Text style={styles.label}>{i18n.t("editCostItem.category")}</Text>
            <View style={{ paddingLeft: hp(2) }}>
              <SelectDropdown
                data={extractCostCategoryList(budgets[selectedBudgetIndex])}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <IconButton
                      disabled={true}
                      icon={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={hp(3)}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
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
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.label, marginRight: hp(5) }}>
              {i18n.t("editCostItem.date")}
            </Text>
            <CustomDatePicker onInputChange={inputChangeHandler} id="date" />
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
            placeholderText={i18n.t("editCostItem.amountPlaceholder")}
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
  textHeading1: {
    ...Styles.textHeading1,
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp(2) },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown1BtnStyle: {
    width: wp(70),
    height: hp(5),
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default EditCostItemScreen;
