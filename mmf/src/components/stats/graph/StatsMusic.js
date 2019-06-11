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
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup } from 'victory-native';
import TableMusic from '../table/TableMusic';
import WeekBtn from '../Weekbtn';
import { Authentication } from '../../utils/Auth';

currentdate = new Date();
currentdate.getDate();

// Calculates current week
function weekOfYear(date) {
  var q = new Date(+date);
  q.setHours(0, 0, 0);
  q.setDate(q.getDate() + 4 - (q.getDay() || 7));
  return Math.ceil(((q - new Date(q.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}
function getThursday(date) {
  q = new Date(date);
  var day = q.getDay(),
    diff = q.getDate() - day + (day == 0 ? -6 : 4); // adjust when day is sunday
  return new Date(q.setDate(diff));
}
function DateOfWeek(w, y) {
  var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week
  return new Date(y, 0, d);
}

export default class StatsActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: weekOfYear(getThursday(currentdate)),
      positivityData: [0],
      energyData: [0],
      danceabilityData: [0],
      ticks: [],
      label: null,
    };
    this.refetch = this.refetch.bind(this);
  }
  async refetch(week) {
    const token = await Authentication();
    return fetch(
      'https://us-central1-mmfapp-3603c.cloudfunctions.net/getMusicWeek?week=' + week,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        {
          this.child.refetch(week);
        }
        date = new Date(DateOfWeek(week, currentdate.getFullYear()));
        if (responseJson.MusicStats === undefined || responseJson.MusicStats.length == 0) {
          // array empty or does not exist
          this.setState({
            positivityData: [0],
            energyData: [0],
            danceabilityData: [0],
            ticks: [],
            label: date.getMonth(),
          });
        } else {
          this.setState({
            positivityData: [0],
            energyData: [0],
            danceabilityData: [0],
            ticks: [],
          });
          responseJson.MusicStats.forEach(item => {
            this.setState({
              positivityData: [...this.state.positivityData, item.Valence],
              energyData: [...this.state.energyData, item.Energy],
              danceabilityData: [...this.state.danceabilityData, item.Danceability],
              ticks: [...this.state.ticks, item.date.split('-')[2] + '.' + item.date.split('-')[1]],
              label: date.getMonth(),
            });
          });
        }

        this.setState({
          isLoading: false,
          dataSource: responseJson.MusicStats,
          week: week,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.refetch(this.state.week);
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
      <ScrollView>
        <View style={styles.Content}>
          <VictoryChart VictoryGroup offset={20} height={280}>
            <VictoryAxis
              // Values on the X-axis..
              tickValues={[1, 2, 3, 4, 5, 6, 7, 7.5]}
              tickFormat={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
              style={this.whiteStyle}
            />
            <VictoryAxis
              // Values on the Y-aksis.
              dependentAxis
              tickValues={[0, 17, 33, 50, 66, 84, 100]}
              tickFormat={['', 'LOW', '', 'MED', '', 'HIGH', '']}
              style={this.grid}
            />
            <VictoryGroup
              // Groups bars for Danceability, energy and positivity.
              offset={9}
              style={{ data: { width: 9 } }}
            >
              <VictoryBar
                // Provides data to the bars. Styles the bars.
                data={this.state.positivityData}
                x="quarter"
                y="earnings"
                label={this.state.ticks}
                style={{ data: { fill: '#26de81' } }}
                cornerRadius={3}
              />
              <VictoryBar
                data={this.state.energyData}
                x="quarter"
                y="earnings"
                style={{ data: { fill: '#fed330' } }}
                cornerRadius={3}
              />   
              <VictoryBar
                data={this.state.danceabilityData}
                x="quarter"
                y="earnings"
                style={{ data: { fill: '#B544F3' } }}
                cornerRadius={3}
              />
           
            </VictoryGroup>
          </VictoryChart>
          <View>
            <WeekBtn refetch={this.refetch} />
          </View>
          <TableMusic
            ref={child => {
              this.child = child;
            }}
            {...this.props}
          />
        </View>
      </ScrollView>
      </View>
    );
  }

  // Provides white style to the graph.
  whiteStyle = {
    axis: { stroke: 'white' },
    axisLabel: { fontSize: 20, padding: 30, fill: 'white' },
    ticks: { stroke: 'none', size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: 'white' },
  };

  // Graph grid
  grid = {
    axis: { stroke: 'none' },
    axisLabel: { fontSize: 20, padding: 30, fill: 'white' },
    ticks: { stroke: 'none', size: 5 },
    tickLabels: { fontSize: 15, padding: 5, fill: 'white' },
    grid: {
      stroke: t => (t === 84 || t === 17 || t === 50 ? '#454C4D' : 'grey'),
      strokeWidth: t => (t === 84 || t === 17 || t === 50 ? 1 : 2),
    },
  };
}

const styles = StyleSheet.create({
  Content: {
    backgroundColor: '#272B2C',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
