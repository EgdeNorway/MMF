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
import TableNutrition from "../table/TableNutrition";

export default class StatsNutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // graph data.
      nutritionData: [
        { day: 1, kcal: 5000 },
        { day: 2, kcal: 2500 },
        { day: 3, kcal: 4000 },
        { day: 4, kcal: 2500 },
        { day: 5, kcal: 2500 },
        { day: 6, kcal: 3000 },
        { day: 7, kcal: 2500 }
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
              x={23}
              y={45}
              text={"Kcal"}
            />
            <VictoryAxis
              // Values on the Y-aksis. Formates values to 'K', 3000 = 3k.
              dependentAxis
              tickValues={[1000, 2000, 3000, 4000, 5000]}
              tickFormat={x => `${x / 1000}K`}
              style={this.grid}
            />
            <VictoryBar
              // Style and provides data to the bars.
              data={this.state.nutritionData}
              x="day"
              y="kcal"
              barRatio={0.7}
              style={{ data: { fill: "#FF9D3D" } }}
              cornerRadius={8}
            />
          </VictoryChart>
          <View>
            <TableNutrition />
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
  
  // Graph grid.
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
