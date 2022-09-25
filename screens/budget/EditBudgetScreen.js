import React, { useCallback, useReducer } from "react";
import { LogBox } from "react-native";
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
import * as budgetsActions from "../../store/actions/budgets";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import * as Animatable from "react-native-animatable";
import CustomBottomButton from "@UIComponents/CustomBottomButton";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import ExtraBoldText from "@CustomText/ExtraBoldText";
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

const EditBudgetScreen = ({ route, navigation }) => {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const budgetIndex = budgets.selectedBudgetIndex;
  //console.log("EditBudgetScreen::" + budgetId);
  var editedBudget = null;
  const dispatch = useDispatch();

  if (budgetIndex) {
    editedBudget = budgets.find((b) => b.budgetId === budgetId);
  }

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedBudget ? editedBudget.title : "",
      description: editedBudget ? editedBudget.description : "",
      totalBudgetAmount: editedBudget ? editedBudget.description : "",
    },
    inputValidities: {
      title: editedBudget ? true : false,
      description: editedBudget ? true : false,
      totalBudgetAmount: editedBudget ? true : false,
    },
    formIsValid: editedBudget ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (SETTINGS.MOCK_DATA === false && !formState.formIsValid) {
      Alert.alert(
        i18n.t("editBudget.wrongInputTitle"),
        "Please check the errors in the form.",
        [{ text: "Okay" }]
      );
      return;
    }

    var token = login.accessToken;
    var title = formState.inputValues.title;
    var description = formState.inputValues.description;
    var totalBudgetAmount = formState.inputValues.totalBudgetAmount;
    if (SETTINGS.MOCK_DATA) {
      title = "entertainment";
      description = "movie";
      totalBudgetAmount = 1000.2;
    }
    try {
      dispatch(budgetsActions.createBudget(token, title, description, 0));
      navigation.goBack();
    } catch {
      throw err;
    }
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
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.white }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={{ backgroundColor: Colors.white }}>
          <View style={styles.form}>
            <CustomTextInput
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
              minLength={5}
            />
            <CustomTextInput
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
            <CustomTextInput
              id="amount"
              label="Budget Amount"
              errorText="Please enter a valid amount!"
              keyboardType="numeric"
              autoCapitalize="sentences"
              autoCorrect
              multiline
              numberOfLines={3}
              onInputChange={inputChangeHandler}
              initialValue={
                editedBudget ? editedBudget.totalBudgetAmount.toString() : ""
              }
              initiallyValid={!!editedBudget}
              required
              minLength={1}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonBottom}>
        <CustomBottomButton
          text={i18n.t("editBudget.add")}
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

export default withTheme(EditBudgetScreen);
