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
  TouchableRipple,
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
    return item.costItems.length > 0 ? (
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
        </List.Accordion>
        <Divider />
      </List.Section>
    ) : (
      <List.Item
        title={item.name}
        description={item.totalAmount}
        style={styles.centered}
        right={() => (
          <IconButton
            icon="dots-vertical"
            onPress={() => {
              console.log("TouchableRipple::" + JSON.stringify(item));
              props.deleteCallback(item.costCategoryId, item.name);
            }}
          />
        )}
      />
    );
  };

  return (
    <ScreenWrapper withScrollView={withScrollView}>
      <FlatList
        data={props.costCategories}
        keyExtractor={(item) => item.costCategoryId}
        renderItem={renderCostCategoriesItem}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, height: hp(5), flex: 1 },
});

export default BudgetAccordion;
