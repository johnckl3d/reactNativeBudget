import Colors from "@Styles/colors";
import { centered } from "@Styles/presentation";
import Styles from "@Styles/styles";
import { generateMonthArrayList } from "@Utils/dates";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
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
import { Pagination } from "react-native-snap-carousel";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import BudgetCarousel from "../../components/carousell/BudgetCarousel";
import MonthCarousel from "../../components/carousell/MonthCarousel";
import BudgetAccordion from "@Accordion/BudgetAccordion";
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "../../store/actions/budgets";
import * as costCategoriesActions from "../../store/actions/costCategories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import FloatingActionButton from "../../navigation/FloatingActionButton";
import moment from "moment";
import { highlightRed } from "../../styles/presentation";
import { connect } from "react-redux";
import i18n from '@I18N/i18n';

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const isOutlined = false;
const mode = isOutlined ? "outlined" : "elevated";

const BudgetsScreen = (props) => {
  const [isFocus, setFocus] = useState(true);
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [monthIndex, setMonthsIndex] = useState(0);
  const dispatch = useDispatch();
  const monthsList = generateMonthArrayList();
  const theme = useTheme();

  const FABActions = [
    {
      icon: "plus",
      label: i18n.t('budget.addCostItem'),
      onPress: () => {
        addCostItemHandler(props.budgets[budgetIndex].budgetId);
      },
    },
    {
      icon: "email",
      label: i18n.t('budget.addCategory'),
      onPress: () => {
        addCostCategoryHandler(props.budgets[budgetIndex].budgetId);
      },
    },
    {
      icon: "star",
      label: i18n.t("budget.deleteBudget"),
      onPress: () => {
        deleteBudgetHandler(
          props.budgets[budgetIndex].budgetId,
          props.budgets[budgetIndex].name
        );
      },
    },
    {
      icon: "bell",
      label: i18n.t("budget.addBudget"),
      onPress: () => {
        addBudgetHandler();
      },
    },
  ];

  useEffect(() => {
    loadBudgets();
  }, [dispatch, loadBudgets]);

  const loadBudgets = useCallback(async () => {
    console.log("BudgetsScreen::loadBudgets");
    dispatch(budgetsActions.fetchBudgets());
    setFocus(true);
  }, [dispatch]);

  const handleBudgetSwipeCallback = (childData) => {
    if (childData >= props.budgets[budgetIndex].length - 1) {
      setBudgetIndex(0);
    }
    setBudgetIndex(childData);
  };

  const handleMonthsSwipeCallback = (childData) => {
    setMonthsIndex(childData);
  };

  const selectItemHandler = (costCategoryId, name, totalAmount) => {
    setFocus(false);
    props.navigation.navigate("CostCategory", {
      costCategoryId: costCategoryId,
      name: name,
      totalAmount: totalAmount,
    });
  };

  const addCostItemHandler = (budgetId) => {
    props.navigation.navigate("EditCostItemScreen", { budgetId: budgetId });
  };

  const addCostCategoryHandler = (budgetId) => {
    props.navigation.navigate("EditCostCategoryScreen", {
      budgetId: budgetId,
      onComplete: loadBudgets,
    });
  };

  const deleteCostCategoryHandler = (costCategoryId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteCostCategory(costCategoryId);
        },
      },
    ]);
  };

  const deleteCostCategory = useCallback(
    async (budgetId) => {
      dispatch(costCategoriesActions.deleteCostCategory(budgetId));
      loadBudgets();
    },
    [dispatch, loadBudgets]
  );

  const editBudgetHandler = (budgetId) => {
    props.navigation.navigate("EditBudgetScreen", { budgetId: budgetId });
  };

  const addBudgetHandler = () => {
    props.navigation.navigate("EditBudgetScreen");
  };

  const deleteBudgetHandler = (budgetId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteBudget(budgetId);
        },
      },
    ]);
  };

  const deleteBudget = useCallback(
    async (budgetId) => {
      dispatch(budgetsActions.deleteBudget(budgetId));
    },
    [dispatch]
  );

  if (props.hasError) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadBudgets}
          color={Colors.primary}
        ></Button>
      </View>
    );
  }
  console.log(props.isLoading);
  if (props.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (props.budgets.length == 0) {
    return (
      <View style={styles.centered}>
        <Text> No budgets found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (!isFocus) {
    return <View />;
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <Card mode={mode}>
          <Card mode={mode}>
            <Card.Title
              title={props.budgets[budgetIndex].name}
              subtitle={props.budgets[budgetIndex].description}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {
                    editBudgetHandler(props.budgets[budgetIndex].budgetId);
                  }}
                />
              )}
            />

            <Card.Content style={styles.summary}>
              <View style={styles.centered}>
                <Subheading>
                  {i18n.t("common.currency") + props.budgets[budgetIndex].totalBudgetAmount.toFixed(2)}
                </Subheading>
                <Caption>Budget</Caption>
              </View>
              <View style={styles.centered}>
                <Subheading>
                  {i18n.t("common.currency") + props.budgets[budgetIndex].totalCostAmount.toFixed(2)}
                </Subheading>
                <Caption>Cost</Caption>
              </View>
            </Card.Content>
          </Card>
          <BudgetCarousel
            data={props.budgets}
            parentCallback={handleBudgetSwipeCallback}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").height * 0.3}
          />
          <MonthCarousel
            data={monthsList}
            parentCallback={handleMonthsSwipeCallback}
            width={Dimensions.get("window").width}
          />
        </Card>
        <BudgetAccordion
          costCategories={props.budgets[budgetIndex].costCategories}
          deleteCallback={deleteCostCategoryHandler}
        ></BudgetAccordion>

        <FloatingActionButton actions={FABActions}></FloatingActionButton>
        <Pagination
          dotsLength={props.budgets.length}
          activeDotIndex={budgetIndex}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
  summary: {
    flexDirection: "row",
    height: hp(9),
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  mainContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100,
  },
  costSnapShotContainer: {
    ...Styles.costSnapShotContainer,
  },
  paginationContainer: {
    height: 50,
  },
  paginationDot: {
    ...Styles.paginationDot,
  },
  image: {
    height: 40,
    width: 40,
    margin: 8,
  },
  subHeading: {
    marginHorizontal: wp(3),
    marginVertical: wp(3),
  },
});
export default connect((state) => ({
  isLoading: state.FSM.isLoading,
  hasError: state.FSM.hasError,
  budgets: state.budgets,
}))(BudgetsScreen);
