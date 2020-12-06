import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  TextInput,
  Text,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";
import Moment from "moment";
import { dragDisable } from "d3";

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

//console.log("Chart2::" + JSON.stringify(this.data));
// const data = [
//   { x: new Date(2018, 9, 1), y: 0 },
//   { x: new Date(2018, 9, 16), y: 0 },
//   { x: new Date(2018, 9, 17), y: 200 },
//   { x: new Date(2018, 10, 1), y: 200 },
//   { x: new Date(2018, 10, 2), y: 300 },
//   { x: new Date(2018, 10, 5), y: 300 },
// ];

export default class Chart extends Component {
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

  render() {
    if (!this.props) {
      return <Text>Loading....</Text>;
    } else {
      const data = this.props.snapshots.map((snapshot) => ({
        x: new Date(snapshot.dateTime),
        y: snapshot.amount,
      }));

      console.log(JSON.stringify(data));
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
      console.log("line:" + JSON.stringify(line));
      console.log("width:" + JSON.stringify(width));
      console.log("height:" + JSON.stringify(height));
      return (
        <View style={{flexDirection: "row"}}>
          <View style={{ paddingLeft:20, flex:1}}>
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
            <Animated.ScrollView
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
          />
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={data}
              formatLabel={(value, index) => Moment(data[index].x).format("dd")}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
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
