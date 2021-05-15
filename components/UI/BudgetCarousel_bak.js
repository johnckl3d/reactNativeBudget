import React, { useEffect, Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import Chart from "../../components/UI/Chart";
import CustomButton from "../../components/UI/CustomButton";

const DEVICE_WIDTH = Dimensions.get("window").width;

class BudgetCarousel_bak extends React.Component {
  scrollRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  setSelectedIndex = (event) => {
    
    // width of the viewSize
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    console.log("setSelectedIndex::viewSize::" + viewSize);

    // get current position of the scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;
    console.log("setSelectedIndex::contentOffset::" + contentOffset);

    const selectedIndex = Math.floor(contentOffset / viewSize);

    console.log("setSelectedIndex::selectedIndex2::" + selectedIndex);
    this.setState({ selectedIndex });
  };

  componentDidMount = () => {
    const { data } = this.props;
    const { selectedIndex } = this.state;
    // setInterval(() => {
    //   console.log(
    //     "componentDidMount::setInterval::data.length::" + data.length
    //   );
    //   this.setState(
    //     (prev) => ({
    //       selectedIndex:
    //         prev.selectedIndex === data.length - 1 ? 0 : prev.selectedIndex + 1,
    //     }),
    //     () => {
    //       this.scrollRef.current.scrollTo({
    //         animated: true,
    //         y: 0,
    //         x: DEVICE_WIDTH * this.state.selectedIndex,
    //       });
    //     }
    //   );
    // }, 10000);
  };

  render() {
    const { data } = this.props;

    console.log("data::" + JSON.stringify(data));
    const { selectedIndex } = this.state;
    console.log(
      "render::data[selectedIndex].budgetId::" + data[selectedIndex].budgetId
    );

    return !data ? (
      <View></View>
    ) : (
      <View style={styles.mainContent}>
        <ScrollView
          horizontal
          key={data[selectedIndex].budgetId}
          pagingEnabled
          onMomentumScrollEnd={this.setSelectedIndex}
          scrollEnabled={false}
          ref={this.scrollRef}
        >
          {data.map((item) => (
            <View>
              <Text style={styles.title}>{data[selectedIndex].name}</Text>
              <Chart snapshots={item.costSnapShots} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.navigationDiv}>
        <CustomButton
          iconName={Platform.OS === "android" ? "arrow-dropleft" : "ios-arrow-dropleft"}  onPress={() => {
            console.log("left");
          }}
        />
        <CustomButton
          iconName={Platform.OS === "android" ? "arrow-dropright" : "ios-arrow-dropright"} onPress={() => {
            console.log("right");
          }}
        />
         </View>
        {/* <Button style={styles.button} color={Colors.primary} title="Edit" />
        <Button style={styles.button} color={Colors.primary} title="Delete" /> */}

        {/* <View style={styles.circleDiv}>
          {data.map((item, i) => (
            <View>
              key={item.budgetId}
              style=
              {(styles.whiteCircle, { opacity: i === selectedIndex ? 0.5 : 1 })}
            </View>
          ))} 
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: { justifyContent: "center", alignItems: "center", flex: 1 },
  mainContent: {
    borderWidth: 1,
    borderColor: "red",
    height: "100%", 
    width: "100%",
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
  navigationDiv: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff",
  },
});

export default BudgetCarousel_bak;
