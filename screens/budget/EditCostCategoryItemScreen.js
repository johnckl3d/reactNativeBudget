import React, { useCallback, useReducer } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, withTheme } from "react-native-paper";
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
import { SETTINGS } from "@Constants/settings";
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

const EditCostCategoryItemScreen = ({ route, navigation }) => {
  const login = useSelector((store) => store.login);
  const FSM = useSelector((store) => store.FSM);
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;
  const editedBudget = budgets[selectedBudgetIndex];
  const costCategoryId = route.params?.costCategoryId;
  let editedCostCategory = null;
  editedCostCategory = editedBudget.costCategories.find(
    (c) => c.costCategoryId === costCategoryId
  );

  const dispatch = useDispatch();

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
            label="Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCostCategory ? editedCostCategory.name : ""}
            initiallyValid={!!editedCostCategory}
            required
            minLength={5}
          />
          <CustomTextInput
            id="description"
            label={i18n.t("editCostCategory.description")}
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={
              editedCostCategory ? editedCostCategory.description : ""
            }
            initiallyValid={!!editedCostCategory}
            required
            minLength={5}
          />
        </View>
      </KeyboardAvoidingView>
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

export default withTheme(EditCostCategoryItemScreen);
