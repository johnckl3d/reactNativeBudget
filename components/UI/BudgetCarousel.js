import React, { useEffect, Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const DEVICE_WIDTH = Dimensions.get("window").width;

class BudgetCarousel extends React.Component {
  scrollRef = React.createRef();

  constructor(props) {
    super.props();
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    const { data } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ScrollView horizontal pagingEnabled>
          {data.map((item) => (
            <Chart snapshots={item.costSnapShots} />
          ))}
        </ScrollView>
        <Button style={styles.button} color={Colors.primary} title="Edit" />
        <Button style={styles.button} color={Colors.primary} title="Delete" />

        <View style={styles.circleDiv}>
        {data.map((item, i) => (
            <View>
key={item}
style={styles.whiteCircle}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: { justifyContent: "center", alignItems: "center", flex: 1 },
  mainContent: {
    height: 600,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 50,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    height: 30,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  circleDiv: {
      position: "absolute",
      bottom: 15,
      height: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
  },
  whiteCircle: {
      width: 6,
      height: 6,
      borderRadius: 3,
      margin: 5,
      backgroundColor: "#fff"
  }
});

export default BudgetCarousel;
