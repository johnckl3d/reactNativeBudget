import { scaleLinear, scaleQuantile, scaleTime } from "d3-scale";
import * as shape from "d3-shape";
import Moment from "moment";
import React, { useEffect,Component } from "react";
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
} from "../../helpers/helpers";

const height = 300;
const width = Dimensions.get("window").width- 50;
const verticalPadding = 5;
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

    const data = this.props.snapshots.map((snapshot) => ({
      x: new Date(snapshot.dateTime),
      y: snapshot.amount,
    }));
    //const data = this.normalizeChart(rawData);
    console.log("Chart::data::" + JSON.stringify(data));
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
      .curve(d3.shape.curveMonotoneX)(data);
    const properties = path.svgPathProperties(line);

    const lineLength = properties.getTotalLength();

    this.state = {
      x: new Animated.Value(0),
      data: data,
      lineLength: lineLength,
      scaleX: scaleX,
      scaleY: scaleY,
      line: line,
      maxY: maxY,
      properties: properties,
      ready: false,
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
    console.log("mount");
    this.setState({ ready: true }, () => {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);
    });
  }

  componentWillUnmount() {
    console.log("unmount");
    this.state.x.removeAllListeners();
  }


  normalizeChart = (rawData) => {
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
  };

  render() {

    const x = this.state.x;
    if (!this.state.ready) {
      return <View/>;
    }
    const translateX = x.interpolate({
      inputRange: [0, this.state.lineLength],
      outputRange: [width - labelWidth, 0],
      extrapolate: "clamp",
    });
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <View >
              <YAxis
                style={{ marginHorizontal: -10, height: height }}
                data={this.state.data}
                yAccessor={({ item }) => item.y}
                contentInset={verticalContentInset}
                svg={yAxesSvg}
                formatLabel={(value) => "" + value}
              />
            </View>
            <View style={{borderBottomWidth: 1, borderLeftWidth: 1, left: 20 }}>
            <Svg {...{ width, height}}>
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
                d={this.state.line}
                fill="transparent"
                stroke="#367be2"
                strokeWidth={5}
              />
              <Path
                d={`${this.state.line} L ${width} ${height} L 0 ${height}`}
                fill="url(#gradient)"
              />
              <View ref={this.cursor} style={styles.cursor} />
            </Svg>
            </View>
            <Animated.View style={[styles.label]}>
              <TextInput ref={this.label} />
            </Animated.View>
            <Animated.ScrollView
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{ width: this.state.lineLength * 2 }}
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
          </View>
          <XAxis
            data={this.state.data}
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "green",
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
    backgroundColor: "lightgray",
    width: labelWidth,
    right: 0,
  },
});
