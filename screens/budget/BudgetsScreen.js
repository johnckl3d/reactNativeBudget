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
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "../../store/actions/budgets";
import * as costCategoriesActions from "../../store/actions/costCategories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import FloatingActionButton from "../../navigation/FloatingActionButton";
import moment from "moment";

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const isOutlined = false;
const mode = isOutlined ? "outlined" : "elevated";

const BudgetsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isFocus, setFocus] = useState(true);
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [monthIndex, setMonthsIndex] = useState(0);
  const budgets = useSelector((state) => state.budgets);
  const dispatch = useDispatch();
  const monthsList = generateMonthArrayList();
  const theme = useTheme();

  const FABActions = [
    { icon: "plus", onPress: () => {} },
    {
      icon: "star",
      label: "Delete",
      onPress: () => {
        deleteBudgetHandler(
          budgets.budgets[budgetIndex].budgetId,
          budgets.budgets[budgetIndex].name
        );
      },
    },
    { icon: "email", label: "Email", onPress: () => {} },
    {
      icon: "bell",
      label: "Add",
      onPress: () => {
        addBudgetHandler(budgets.budgets[budgetIndex].budgetId);
      },
    },
  ];

  const loadBudgets = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(budgetsActions.fetchBudgets());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setFocus(true);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadBudgets();
  }, [dispatch, loadBudgets]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener("willFocus", loadBudgets);
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [loadBudgets]);

  const handleBudgetSwipeCallback = (childData) => {
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

  const addBudgetHandler = (budgetId) => {
    props.navigation.navigate("EditBudgetScreen", { budgetId: budgetId });
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
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(budgetsActions.deleteBudget(budgetId));
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
      loadBudgets();
    },
    [dispatch, setIsLoading, setError]
  );

  if (error) {
    console.log(error);
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && budgets.budgets.length == 0) {
    return (
      <View style={styles.centered}>
        <Text> No budgets found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (!isFocus) {
    return <View />;
  }

  const renderCostSnapshotItem = ({ item }) => {
    return (
      <View>
        <Divider />
        <Card>
          <List.Section>
            <List.Subheader>
              {moment(item.dateTime).format("LL")}
            </List.Subheader>
            <List.Item
              left={() => (
                <IconButton icon="camera" size={24} onPress={() => {}} />
              )}
              right={(props) => <List.Icon {...props} icon="information" />}
              title={`Amount: ${item.amount.toFixed(2)}`}
              //description="Describes item 1"
            />
          </List.Section>
        </Card>
        <Divider />
      </View>
    );
  };

  const costSnapShots = budgets.budgets[budgetIndex].costSnapShots;
  console.log("budgetsScreen::costSnapShots::" + JSON.stringify(budgets));
  console.log("budgetsScreen::costSnapShots::" + JSON.stringify(costSnapShots));
  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <Card mode={mode}>
          <Card mode={mode}>
            <Card.Title
              title={budgets.budgets[budgetIndex].name}
              subtitle="Omega Ruby"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {
                    deleteBudgetHandler(
                      budgets.budgets[budgetIndex].budgetId,
                      budgets.budgets[budgetIndex].name
                    );
                  }}
                />
              )}
            />
            <Card.Content>
              <Paragraph>
                {`Budget: ${budgets.budgets[budgetIndex].totalBudgetAmount} \n \n`}
                {`Cost: ${budgets.budgets[budgetIndex].totalCostAmount}`}
              </Paragraph>
            </Card.Content>
          </Card>
          <BudgetCarousel
            data={budgets.budgets}
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

        <FlatList
          data={budgets.budgets[budgetIndex].costSnapShots}
          keyExtractor={(item) => item.dateTime}
          renderItem={renderCostSnapshotItem}
        />

        <FloatingActionButton actions={FABActions}></FloatingActionButton>
        <Pagination
          dotsLength={budgets.budgets[budgetIndex].costSnapShots.length}
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
export default BudgetsScreen;
