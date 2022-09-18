import CostItem from "@Accordion/CostItem";
import i18n from "@I18N/i18n";
import Colors from "@Styles/colors";
import Styles from "@Styles/styles";
import { nFormatter } from "@Utils/commonUtils";
import { heightPercentageToDP as hp } from "@Utils/scalingUtils";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider, IconButton, List, withTheme } from "react-native-paper";
import { centered } from "../../styles/presentation";

const CostCategoryItem = ({ item }) => {
  console.log("CostCategoryItem::costCategoryId::" + item.costCategoryId);
  const renderCostItem = ({ item }) => {
    return (
      <CostItem costCategoryId={item.costCategoryId} item={item}></CostItem>
    );
  };

  return item.costItems.length > 0 ? (
    <List.Section>
      <List.Accordion
        style={[
          styles.layoutList,
          styles.listItemTight,
          styles.highlightRed,
          { height: hp(7) },
        ]}
        title={item.name}
        titleStyle={styles.textHeading5}
        description={
          `Amount: ${i18n.t("common.currency")}` +
          `${nFormatter(item.totalAmount)}`
        }
        descriptionStyle={[
          { color: Colors.red },
          styles.centered,
          styles.textCitation,
        ]}
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
      titleStyle={styles.textCitation}
      description={item.totalAmount}
      descriptionStyle={[{ color: Colors.red }, styles.centered]}
      right={() => (
        <IconButton
          icon="dots-vertical"
          onPress={() => {
            props.deleteCallback(item.costCategoryId, item.name);
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: hp(20) },
  layoutList: { ...Styles.layoutList },
  textHeading5: { ...Styles.textHeading5, borderColor: Colors.red },
  textCitation: { ...Styles.textCitation },
  centered: { ...centered, height: hp(5), flex: 1 },
  highlightRed: { ...Styles.highlightRed },
  listItemTight: { ...Styles.listItemTight },
});

export default withTheme(CostCategoryItem);
