import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  withTheme,
  FAB,
} from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "@Styles/colors";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateWeekArrayFromMonth,
  generateMonthArrayFromMonth,
  getDayOfMonthFromDate,
  generateMonthArrayList,
} from "@Utils/dates";
import moment from "moment";

const Chart = (props) => {
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: generateWeekArrayFromMonth(moment().month("January")),
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Colors.chartBackgroundColor,
          backgroundGradientFrom: Colors.chartBackgroundGradientFrom,
          backgroundGradientTo: Colors.chartBackgroundGradientTo,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default withTheme(Chart);
