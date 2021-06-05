import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "@Styles/colors";
import HeaderButton from "../../components/UI/HeaderButton";
import * as productsActions from "../../store/actions/products";
import * as costCategoriesActions from "../../store/actions/costCategories";
import Input from "../../components/UI/Input";

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

const EditCostItemScreen = (props) => {
  const costCategoryId = props.navigation.getParam("costCategoryId");
  const costItemId = props.navigation.getParam("costItemId");
  const editedCostCategory = useSelector((state) =>
    state.costCategories.costCategories.find(
      (cc) => cc.costCategoryId === costCategoryId
    )
  );
  const costItems = [...editedCostCategory.costItems];
  const editedCostItem = costItems.find((ci) => ci.costItemId === costItemId);
  const dispatch = useDispatch();

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
        costCategoriesActions.createCostItem(
          costCategoryId,
          formState.inputValues.title,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    } catch (err) {
      throw err;
    }
    props.navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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
            initialValue={editedCostItem ? editedCostItem.name : ""}
            initiallyValid={!!editedCostItem}
            required
          />

          <Input
            id="amount"
            label="Amount"
            errorText="Please enter a valid amount!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedCostItem ? editedCostItem.amount.toString() : ""}
            initiallyValid={!!editedCostItem}
            required
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
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
          <View style={styles.button}>
            <Button
              style={styles.button}
              color={Colors.primary}
              title="Add"
              onPress={() => {
                submitHandler();
                //navData.navigation.getParam("submit");
                //addItemHandler(itemData.item.name);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditCostItemScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Cost Item",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  button: {
    paddingTop: 20,
  },
});

export default EditCostItemScreen;
