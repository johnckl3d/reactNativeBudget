import { scaleLinear, scaleQuantile, scaleTime } from "d3-scale";
import * as shape from "d3-shape";
import Moment from "moment";
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
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { XAxis, YAxis } from "react-native-svg-charts";
import * as path from "svg-path-properties";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateMonthArrayFromMonth,
  getDayOfMonthFromDate,
} from "../../helpers/helpers";
import { highlightYellow, centered, shadow } from "../../styles/presentation";

const verticalPadding = 0;
const cursorRadius = 10;
const labelWidth = 100;
const xAxisHeight = 30;
const yAxesSvg = { fill: "black", fontSize: 8, fontWeight: "bold" };
const verticalContentInset = { left: 10, right: 10, top: 10, bottom: 10 };

const d3 = {
  shape,
};

const scaleLabel = scaleQuantile().domain([0, 300]).range([0, 200, 300]);

export default class Chart extends Component {
  cursor = React.createRef();

  label = React.createRef();

  constructor(props) {
    super(props);

    Moment.locale("en");

    const x = new Animated.Value(0);

    //const data = this.normalizeChart(rawData);
    const rawData = this.props.snapshots.map((snapshot) => ({
      x: new Date(snapshot.dateTime),
      y: snapshot.amount,
    }));
    
    const data = this.normalizeChartData(rawData);
    //const data = this.testNormalize(rawData);
    const height = this.props.height - 50;
    const width = this.props.width;
    const maxY = Math.max.apply(
      Math,
      data.map(function (o) {
        return o.y;
      })
    );
    console.log("data::" + JSON.stringify(data));
    console.log("MaxY::" + maxY);
    const scaleX = scaleLinear()
      .domain([data[0].x, data[data.length - 1].x])
      .range([0, width]);
    const scaleY = scaleLinear().domain([0, maxY]).range([height, 0]);
    console.log("scaleX::" + scaleX);
    console.log("scaleY::" + scaleY);
    const line = d3.shape
      .line()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .curve(d3.shape.curveBasis)(data);
    const properties = path.svgPathProperties(line);

    const lineLength = properties.getTotalLength();

    this.state = {
      x: new Animated.Value(0),
      data: data,
      ready: false,
      height: height,
      width: width,
      maxY: maxY,
      scaleX: scaleX,
      scaleY: scaleY,
      line: line,
      properties: properties,
      lineLength: lineLength,
    };
  }

  moveCursor(value) {
    const { x, y } = this.state.properties.getPointAtLength(
      this.state.lineLength - value
    );
    if (this.cursor && this.cursor.current) {
      this.cursor.current.setNativeProps({
        top: y - cursorRadius,
        left: x - cursorRadius,
      });
    }
    const label = scaleLabel(this.state.scaleY.invert(y));
    if (this.label && this.label.current) {
      this.label.current.setNativeProps({ text: `${label}` });
    }
  }

  componentDidMount() {
    this.setState({ ready: true }, () => {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);
    });
  }

  componentWillUnmount() {
    this.state.x.removeAllListeners();
  }

  testNormalize() {
    var arr = [
      { x: 0, y: 0 },
      { x: 1, y: 100 },
      { x: 2, y: 30 },
      { x: 3, y: 400 },
      { x: 4, y: 50 },
    ];
    return arr;
  }

  normalizeChartData(rawData) {
    var testArr = generateMonthArrayFromMonth(Moment());
    rawData.forEach((input) => {
      const day = getDayOfMonthFromDate(Moment(input.x));
      const amount = Number(input.y);
      const index = rawData.findIndex(obj => obj.x === input.x)
      testArr[index].y = parseInt(amount);
    });
    console.log("normalizeChartData::" + JSON.stringify(testArr));
    return testArr;
  }

  render() {
    const data = this.state.data;
    const height = this.state.height;
    const width = this.state.width;
    const maxY = this.state.maxY;
    const scaleX = this.state.scaleX;
    const scaleY = this.state.scaleY;
    const line = this.state.line;
    const properties = this.state.properties;
    const lineLength = this.state.lineLength;
    const x = this.state.x;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <YAxis
              style={{ height: height }}
              data={data}
              yAccessor={({ item }) => item.y}
              contentInset={verticalContentInset}
              svg={yAxesSvg}
              formatLabel={(value) => "" + value}
            />
          </View>
          <View>
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
          </View>
          {/* <Animated.View style={[styles.label]}>
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
          /> */}
        </View>
        {/* <XAxis
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
          //formatLabel={(index) => Moment(index).format("D")}
          formatLabel={(index) => getDayOfMonthFromDate(index)}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
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
    backgroundColor: "lightgray",
    width: labelWidth,
    right: 0,
  },
});
