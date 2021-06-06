import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Text, FAB, Portal, useTheme} from "react-native-paper";
import { ThemeColors } from "react-navigation";

const FloatingActionButton = ({actions}) => {
  const theme = useTheme();

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
        visible={true}
      />
      {/* <FAB.Group
        open={open}
        icon={open ? "calendar-today" : "plus"}
        actions={[
          { icon: "plus", onPress: () => {} },
          { icon: "star", label: "Star", onPress: () => {} },
          { icon: "email", label: "Email", onPress: () => {} },
          { icon: "bell", label: "Remind", onPress: () => {} },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        visible={true}
      /> */}
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

export default FloatingActionButton;
