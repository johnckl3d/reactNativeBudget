import Colors from "@Styles/colors";
import React, { useCallback, useEffect, useReducer } from "react";
import {
  Alert,
  Button,
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
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

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
  console.log("EditCostItemScreen::" + JSON.stringify(route.params));
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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedCostItem ? editedCostItem.title : "",
      description: editedCostItem ? editedCostItem.description : "",
      price: "",
    },
    inputValidities: {
      title: editedCostItem ? true : false,
      description: editedCostItem ? true : false,
      price: editedCostItem ? true : false,
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
      await dispatch(
        costItemActions.createCostItem(
          costCategoryId,
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.price
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
            initialValue={editedCostItem ? editedCostItem.name : ""}
            initiallyValid={!!editedCostItem}
            required
          />
          <CustomTextInput
            id="description"
            label={i18n.t("editCostItem.description")}
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedCostItem ? editedCostItem.description : ""}
            initiallyValid={!!editedCostItem}
            required
            minLength={5}
          />
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
