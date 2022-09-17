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
import * as costCategoriesActions from "../../store/actions/costCategories";
import i18n from "@I18N/i18n";
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
  const budgetId = route.params.budgetId;
  let costCategoryId = null;
  let costItemId = null;
  let editedBudget;
  let editedCostCategory;
  let editedCostItem;
  editedBudget = useSelector((state) =>
    state.budgets.find((b) => b.budgetId === budgetId)
  );
  if (editedBudget != null && route.params.costCategoryId != null) {
    editedCostCategory = editedBudget.find(
      (cc) => cc.costCategoryId === costCategoryId
    );

    if (editedCostCategory != null && route.params.costItemId != null) {
      editedCostItem = editedCostCategory.find(
        (ci) => ci.costItemId === costItemId
      );
    }
  }
  // const costCategoryId = props.navigation.getParam("costCategoryId");
  // const costItemId = props.navigation.getParam("costItemId");
  // const editedCostCategory = useSelector((state) =>
  //   state.costCategories.costCategories.find(
  //     (cc) => cc.costCategoryId === costCategoryId
  //   )
  // );
  // const costItems = [...editedCostCategory.costItems];
  // const editedCostItem = costItems.find((ci) => ci.costItemId === costItemId);
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
    route.params.onComplete();
    navigation.goBack();
  }, [dispatch, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
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
          <View style={styles.button}>
            <Button
              style={styles.button}
              color={Colors.primary}
              title={i18n.t("editCostItem.add")}
              onPress={() => {
                submitHandler();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// EditCostItemScreen.navigationOptions = (navData) => {
//   return {
//     headerTitle: "Add Cost Item",
//   };
// };

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  button: {
    paddingTop: 20,
  },
});

export default EditCostItemScreen;
