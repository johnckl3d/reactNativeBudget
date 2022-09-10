import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Colors, Text, FAB, Portal } from "react-native-paper";

const FloatingActionButton = ({ visible, actions }) => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? "calendar-today" : "plus"}
        actions={actions}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        visible={visible}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 4,
  },

  row: {
    justifyContent: "center",
    alignItems: "center",
  },

  fab: {
    margin: 8,
  },
});

export default withTheme(FloatingActionButton);
