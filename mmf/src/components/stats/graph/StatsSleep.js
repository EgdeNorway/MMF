/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import TableSleep from "../table/TableSleep";

export default class StatsSleep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Graph data.
      sleepData: [
        { day: 1, sleep: 4 },
        { day: 2, sleep: 11 },
        { day: 3, sleep: 8 },
        { day: 4, sleep: 8 },
        { day: 5, sleep: 6 },
        { day: 6, sleep: 5 },
        { day: 7, sleep: 9 }
      ]
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.Content} pointerEvents="none">
          <VictoryChart height={280} domainPadding={25}>
            <VictoryAxis
              // Values on the X-axis.
              tickValues={[1, 2, 3, 4, 5, 6, 7]}
              tickFormat={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
              style={this.whiteStyle}
            />
            <VictoryLabel
              // Title text for the values on the Y-axis.
              style={{ fill: "#fff", fontWeight: "bold" }}
              x={20}
              y={50}
              text={"Hours"}
            />
            <VictoryAxis
              // Values on the Y-aksis. Formates values.
              dependentAxis
              tickValues={[2, 4, 6, 8, 10]}
              tickFormat={x => `${x}h`}
              style={this.grid}
            />
            <VictoryBar
              // Style and provides data to the bars.
              data={this.state.sleepData}
              x="day"
              y="sleep"
              barRatio={0.7}
              style={{ data: { fill: "#45aaf2" } }}
              cornerRadius={8}
            />
          </VictoryChart>
          <View>
            <TableSleep />
          </View>
        </View>
      </ScrollView>
    );
  }

  // Provides white style to the graph.
  whiteStyle = {
    axis: { stroke: "white" },
    axisLabel: { fontSize: 20, padding: 30, fill: "white" },
    ticks: { stroke: "white", size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: "white" }
  };

  // Graph grid
  grid = {
    axis: { stroke: "none" },
    axisLabel: { fontSize: 20, padding: 30, fill: "white" },
    ticks: { stroke: "none", size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: "white" },
    grid: { stroke: t => (t == this.state.goal ? "#26de81" : "grey"), strokeWidth: 1 }
  };
}

const styles = StyleSheet.create({
  Content: {
    backgroundColor: "#272B2C"
  }
});
