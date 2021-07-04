import React, { useCallback, useReducer } from "react";
import {
  Alert,
  KeyboardAvoidingView, ScrollView,
  StyleSheet, View
} from "react-native";
import {
  Button
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import * as costCategoriesActions from "../../store/actions/costCategories";

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

const EditCostCategoryScreen = ({ route, navigation }) => {
  console.log("EditCostCategoryScreen::" + JSON.stringify(route.params));
  const budgetId = route.params.budgetId;
  const costCategoryId = route.params.costCategoryId;
  const editedBudget = useSelector((state) =>
    state.budgets.budgets.find((b) => b.budgetId === budgetId)
  );
  console.log(
    "EditCostCategoryScreen::editedBudget::" + JSON.stringify(editedBudget)
  );
  let editedCostCategory = null;
  if (editedBudget != null) {
    editedCostCategory = editedBudget.costCategories.find(
      (c) => c.costCategoryId === costCategoryId
    );
    console.log(
      "EditCostCategoryScreen::editedCostCategory::" +
        JSON.stringify(editedCostCategory)
    );
  }
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
      await dispatch(
        costCategoriesActions.createCostCategories(
          formState.inputValues.title,
          budgetId,
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
            initialValue={editedCostCategory ? editedCostCategory.name : ""}
            initiallyValid={!!editedCostCategory}
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
            initialValue={
              editedCostCategory ? editedCostCategory.description : ""
            }
            initiallyValid={!!editedCostCategory}
            required
            minLength={5}
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

export default EditCostCategoryScreen;
