import React, { useCallback, useEffect, useState } from "react";
import { List, Divider } from 'react-native-paper';
import ScreenWrapper from '@UIComponents/ScreenWrapper';

const BudgetAccordion = (props) => {
  const withScrollView = true;
  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <ScreenWrapper withScrollView={withScrollView}>
      <List.Section title="Expandable list with icons">
        <List.Accordion
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
        </List.Accordion>
      </List.Section>
    </ScreenWrapper>
  );
};

BudgetAccordion.title = 'List.Accordion';

export default BudgetAccordion;
