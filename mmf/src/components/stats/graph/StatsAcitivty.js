/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
import TableActivity from '../table/TableActivity';
import WeekBtn from '../Weekbtn';
import { Authentication } from '../../utils/Auth';

// Calculates current week
var weekOfYear = function(date) {
  var d = new Date(+date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
};

function getThursday(date) {
  d = new Date(date);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 4); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function DateOfWeek(w, y) {
  var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week

  return new Date(y, 0, d);
}

let currentdate = new Date();
currentdate.getDate();

export default class StatsActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekID: weekOfYear(getThursday(currentdate)),
      steps: [0],
      ticks: [],
      goal: [],
    };
    this.refetch = this.refetch.bind(this);
  }

  async refetch(week) {
    const token = await Authentication();
    return fetch('https://us-central1-mmfapp-3603c.cloudfunctions.net/getFitbit?weekID=' + week, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        {
          this.child.refetch(week);
        }

        console.log(week);
        date = new Date(DateOfWeek(week, currentdate.getFullYear()));

        if (responseJson.Fitbit === undefined || responseJson.Fitbit.length == 0) {
          // array empty or does not exist
          this.setState({
            steps: [0],
            goal: [0],
            ticks: [0],
            showData: false,
          });
        } else {
          this.setState({
            steps: [0],
            ticks: [0],
            showData: true,
          });

          responseJson.Fitbit.forEach(item => {
            this.setState({
              steps: [...this.state.steps, parseInt(item.steps)],
              ticks: [...this.state.ticks, item.weekday],

              goal: item.goals.steps,
            });

            console.log(item.weekday);
            console.log('JSON OBJECT IF POPULATED' + responseJson.Fitbit);
          });
        }

        this.setState({
          isLoading: false,
          showData: true,
          dataSource: responseJson.Fitbit,
          weekID: week,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.refetch(this.state.weekID);
  }

  render() {
    return (
       // If there is no data for the week, the graph area gets replaced with a view with feedback.
      <View>
         {!this.state.dataSource ? 
       <View style={{
          backgroundColor: '#272B2C',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '48%',
          zIndex: 5,
       }}>
         <Text style={{fontSize: 25, color: 'white'}}> There is no data for this week </Text>
       </View> : null}
        <ScrollView style={{flex:1}}>
        <View style={styles.Content}>
          <VictoryChart height={280} domainPadding={25}>
            <VictoryAxis
              // Values on the X-axis.
              tickValues={[1, 2, 3, 4, 5, 6, 7]}
              tickFormat={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
              style={this.whiteStyle}
            />
            <VictoryLabel
              // Title text for the values on the Y-axis.
              style={{ fill: '#fff', fontWeight: 'bold' }}
              x={23}
              y={45}
              text={'Steps'}
            />
            <VictoryAxis
              // Values on the Y-aksis. Formates values to 'K', 3000 = 3k.
              dependentAxis
              tickValues={[3000, 6000, 9000, 12000, 15000]}
              tickFormat={x => `${x / 1000}k`}
              style={this.grid}
            />
            <VictoryBar
              // Style and provides data to the bars.
              data={this.state.steps}
              x="quarter"
              y="earnings"
              style={{ data: { fill: '#FF3D3D' } }}
              labelComponent={<VictoryLabel dy={30} />}
              cornerRadius={4}
            />
          </VictoryChart>    
          <View>
            <WeekBtn refetch={this.refetch} />
          </View>
          <View>
            <TableActivity
              ref={child => {
                this.child = child;
              }}
              {...this.props}
            />
          </View>
        </View>     
      </ScrollView> 
      </View> 
    );
  }

  // Provides white style to the graph.
  whiteStyle = {
    axis: { stroke: 'white' },
    axisLabel: { fontSize: 20, padding: 30, fill: 'white' },
    ticks: { stroke: 'white', size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: 'white' },
  };

  // Graph grid.
  grid = {
    axis: { stroke: 'none' },
    axisLabel: { fontSize: 20, padding: 30, fill: 'white' },
    ticks: { stroke: 'none', size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: 'white' },
    grid: { stroke: 'grey' },
  };
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#272B2C',
  },
});
