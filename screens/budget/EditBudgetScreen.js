import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "@Styles/colors";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import * as costCategoriesActions from "../../store/actions/costCategories";
import * as budgetsActions from "../../store/actions/budgets";
import Input from "../../components/UI/Input";
import {
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
} from "react-native-paper";

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

const EditBudgetScreen = ({ route, navigation }) => {
  console.log("EditBudgetScreen::" + JSON.stringify(route.params));
  const budgetId = route.params.budgetId;
  
  const editedBudget = useSelector((state) =>
    state.budgets.budgets.find((b) => b.budgetId === budgetId)
  );
  console.log("EditBudgetScreen::editedBudget::" + JSON.stringify(editedBudget));
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedBudget ? editedBudget.title : "",
      description: editedBudget ? editedBudget.description : "",
    },
    inputValidities: {
      title: editedBudget ? true : false,
      description: editedBudget ? true : false,
    },
    formIsValid: editedBudget ? true : false,
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
        budgetsActions.createBudget(
          formState.inputValues.title,
          formState.inputValues.description,
          0
        )
      );
    } catch (err) {
      throw err;
    }
    navigation.goBack();
  }, [dispatch, formState]);

  // useEffect(() => {
  //   navigation.setParams({ submit: submitHandler });
  // }, [submitHandler]);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedBudget ? editedBudget.name : ""}
            initiallyValid={!!editedBudget}
            required
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedBudget ? editedBudget.description : ""}
            initiallyValid={!!editedBudget}
            required
            minLength={5}
          />
          <Input
            id="amount"
            label="Budget Amount"
            errorText="Please enter a valid amount!"
            keyboardType="numeric"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedBudget ? editedBudget.totalBudgetAmount.toString() : ""}
            initiallyValid={!!editedBudget}
            required
            minLength={1}
          />
          <View style={styles.button}>
            <Button
              mode="contained"
              onPress={() => {
                submitHandler();
              }}
            >
              Add
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  button: {
    paddingTop: 20,
  },
});

export default EditBudgetScreen;
