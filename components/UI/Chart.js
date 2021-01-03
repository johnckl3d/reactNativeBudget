import { scaleLinear, scaleQuantile, scaleTime } from "d3-scale";
import * as shape from "d3-shape";
import Moment from "moment";
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { XAxis, YAxis } from "react-native-svg-charts";
import * as path from "svg-path-properties";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
} from "../../helpers/helpers";

const height = 200;
const width = Dimensions.get("window").width * 0.9;
const tabWidth = 100;
const verticalPadding = 5;
const cursorRadius = 10;
const labelWidth = 100;
const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

const d3 = {
  shape,
};

const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

export default class Chart extends Component {
  //const [state]
  constructor(props) {
    super(props);

    this.state = {
      x: new Animated.Value(0),
    };

    this.cursor = React.createRef();
    this.label = React.createRef();

    Moment.locale("en");
  }

  moveCursor(value) {
    // const { x, y } = properties.getPointAtLength(lineLength - value);
    // if (this.cursor && this.cursor.current) {
    //   this.cursor.current.setNativeProps({
    //     top: y - cursorRadius,
    //     left: x - cursorRadius,
    //   });
    // }
    // const label = scaleLabel(scaleY.invert(y));
    // if (this.label && this.label.current) {
    //   this.label.current.setNativeProps({ text: `${label} CHF` });
    // }
  }

  componentDidMount() {
    // this.state.x.addListener(({ value }) => this.moveCursor(value));
    // this.moveCursor(0);
  }

  normalizeChart(rawData) {
    console.log("raw:" + JSON.stringify(rawData));
    var arr = [
      { x: Moment(), y: 0 },
      { x: Moment(), y: 0 },
      { x: Moment(), y: 0 },
      { x: Moment(), y: 0 },
      { x: Moment(), y: 0 },
    ];

    rawData.forEach((input) => {
      const week = getWeekOfDayWithOffset(Moment(input.x));
      const amount = Number(input.y);
      arr[week - 1].y += parseInt(amount);

      const firstDayOfWeek = getFirstDayOfWeek(Moment(input.x));
      arr[week - 1].x = firstDayOfWeek;
    });
    return arr;
  }

  render() {
    const XKeys = ["week 1", "week 2", "week 3", "week 4", "week 5"];

    if (!this.props) {
      return <Text>Loading....</Text>;
    } else {
      const rawData = this.props.snapshots.map((snapshot) => ({
        x: new Date(snapshot.dateTime),
        y: snapshot.amount,
      }));

      const data = this.normalizeChart(rawData);

      console.log("data:" + JSON.stringify(data));
      const maxY = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.y;
        })
      );

      const scaleX = scaleTime()
        .domain([data[0].x, data[data.length - 1].x])
        .range([0, width]);
      const scaleY = scaleLinear()
        .domain([0, maxY])
        .range([height - verticalPadding, verticalPadding]);

      const line = d3.shape
        .line()
        .x((d) => scaleX(d.x))
        .y((d) => scaleY(d.y))
        .curve(d3.shape.curveBasis)(data);
      const properties = path.svgPathProperties(line);

      const lineLength = properties.getTotalLength();

      const { x } = this.state;
      const translateX = x.interpolate({
        inputRange: [0, lineLength],
        outputRange: [width - labelWidth, 0],
        extrapolate: "clamp",
      });
      console.log("width:" + JSON.stringify(width));
      console.log("height:" + JSON.stringify(height));

      const yAxesSvg = { fill: "black", fontSize: 8, fontWeight: "bold" };

      const verticalContentInset = { left: 10, right: 10, top: 10, bottom: 10 };

      return (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <YAxis
              style={{ marginHorizontal: -10, height: height }}
              data={data}
              yAccessor={({ item }) => item.y}
              contentInset={verticalContentInset}
              svg={yAxesSvg}
              formatLabel={(value) => "" + value}
            />
          </View>
          <View style={{ flex: 9 }}>
            <View style={{ borderLeftWidth: 1, borderBottomWidth: 1 }}>
              <Svg {...{ width, height }}>
                <Defs>
                  <LinearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="gradient"
                  >
                    <Stop stopColor="#CDE3F8" offset="0%" />
                    <Stop stopColor="#eef6fd" offset="80%" />
                    <Stop stopColor="#FEFFFF" offset="100%" />
                  </LinearGradient>
                </Defs>
                <Path
                  d={line}
                  fill="transparent"
                  stroke="#367be2"
                  strokeWidth={5}
                />
                <Path
                  d={`${line} L ${width} ${height} L 0 ${height}`}
                  fill="url(#gradient)"
                />
                <View ref={this.cursor} style={styles.cursor} />
              </Svg>
              <Animated.View
                style={[styles.label, { transform: [{ translateX }] }]}
              >
                <TextInput ref={this.label} />
              </Animated.View>
              {/* <Animated.ScrollView
                style={StyleSheet.absoluteFill}
                contentContainerStyle={{ width: lineLength * 2 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: { x },
                      },
                    },
                  ],
                  { useNativeDriver: true }
                )}
                horizontal
              /> */}
            </View>
            <XAxis
              data={data}
              svg={{
                fill: "black",
                fontSize: 8,
                fontWeight: "bold",
                rotation: 20,
                originY: 30,
                y: 5,
              }}
              xAccessor={({ item }) => item.x}
              scale={scaleTime}
              numberOfTicks={6}
              style={{ marginHorizontal: -15, height: 20 }}
              contentInset={{ left: 10, right: 25 }}
              formatLabel={(index) => Moment(index).format("D")}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    marginTop: 60,
    height,
    width,
  },
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: "#367be2",
    borderWidth: 3,
    backgroundColor: "white",
  },
  label: {
    position: "absolute",
    top: -45,
    left: 0,
    backgroundColor: "lightgray",
    width: labelWidth,
  },
});
