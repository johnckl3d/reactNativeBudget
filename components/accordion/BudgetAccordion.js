import React, { useCallback, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
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
import ScreenWrapper from "@UIComponents/ScreenWrapper";
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
  highlightYellow,
  centered,
  shadow,
  highlightRed,
  highlightGreen,
} from "../../styles/presentation";
import moment from "moment";

const BudgetAccordion = (props) => {
  const withScrollView = false;
  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  const renderCostItem = ({ item }) => {
    return (
      // <List.Section>
      //   <List.Subheader>{moment(item.dateTime).format("LL")}</List.Subheader>
      //   <List.Item
      //     left={() => <IconButton icon="camera" size={24} onPress={() => {}} />}
      //     right={(props) => <List.Icon {...props} icon="information" />}
      //     title={item.name}
      //     description={`Amount: ${item.amount.toFixed(2)}`}
      //   />
      // </List.Section>
      <List.Section>
        <List.Subheader>{moment(item.dateTime).format("LL")}</List.Subheader>
        <List.Item
          left={() => <IconButton icon="camera" size={24} onPress={() => {}} />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
          title={item.name}
          style={styles.centered}
          description={item.amount.toFixed(2)}
        />
      </List.Section>
    );
  };

  const renderCostCategoriesItem = ({ item }) => {
    return (
      <List.Section>
         <Divider />
        <List.Accordion
          title={item.name}
          description={`Amount: ${item.totalAmount.toFixed(2)}`}
        >
          <FlatList
            data={item.costItems}
            keyExtractor={(item) => item.costItemId}
            renderItem={renderCostItem}
          />
          {/* <List.Item
          left={() => (
            <IconButton icon="camera" size={24} onPress={() => {}} />
          )}
          right={(props) => <List.Icon {...props} icon="information" />}
          title={`Amount: ${item.totalAmount.toFixed(2)}`}
          description="Describes item 1"
        /> */}
        </List.Accordion>
         <Divider />
        
      </List.Section>
    );
  };
  console.log("budgetAccordion::costCategories::" + JSON.stringify(props));
  return (
    <ScreenWrapper withScrollView={withScrollView}>
      <FlatList
        data={props.costCategories}
        keyExtractor={(item) => item.costCategoryId}
        renderItem={renderCostCategoriesItem}
      />
      {/* <List.Accordion
          left={(props) => <List.Icon {...props} icon="star" />}
          title="Accordion item 1"
          description="Describes the expandable list item"
        >
          <List.Item
            left={(props) => <List.Icon {...props} icon="thumb-up" />}
            title="List item 1"
          />
          <List.Item
            left={(props) => <List.Icon {...props} icon="thumb-down" />}
            title="List item 2"
          />
        </List.Accordion> */}
    </ScreenWrapper>
  );
};

// BudgetAccordion.title = "List.Accordion";
const styles = StyleSheet.create({
  centered: { ...centered, height: hp(5), flex: 1 },
});

export default BudgetAccordion;
