import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { Authentication } from '../../utils/Auth';

currentdate = new Date();
currentdate.getDate();

// Calculates current week
function weekOfYear(date) {
  var q = new Date(+date);
  q.setHours(0, 0, 0);
  q.setDate(q.getDate() + 4 - (q.getDay() || 7));
  return Math.ceil(((d - new Date(q.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}
function getThursday(date) {
  q = new Date(date);
  var day = q.getDay(),
    diff = q.getDate() - day + (day == 0 ? -6 : 4); // adjust when day is sunday
  return new Date(q.setDate(diff));
}

// In order to exchange monthnumbers with letters.
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export default class TableMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      weekday: weekOfYear(getThursday(currentdate)),
      dataSource: [],
    };
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
        if (responseJson.MusicStats === undefined || responseJson.MusicStats.length == 0) {
          this.setState({
            isLoading: false,
            dataSource: responseJson.MusicStats,
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: responseJson.MusicStats,
          });
          console.log(this.state.dataSource);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.refetch(weekOfYear(this.state.weekday));
  }

  // Counts and adds moods to an array.
  moodIcon(Mood) {

    
    let array = [];
    let happycounter = 0;
    let neturalcounter = 0;
    let sadcounter = 0;

    Mood.forEach(item => {
      item = item.toLowerCase();
      if (item === 'happy') {
        happycounter++;
      } else if (item === 'excellent') {
        happycounter++;
      } else if (item === 'sad') {
        sadcounter++;
      } else if (item === 'terrible') {
        sadcounter++;
      } else {
        neturalcounter++;
      }
    });
    array.push({ happycounter }, { neturalcounter }, { sadcounter });

    // Prioritizes which image/mood to return based on counts. 
    if (happycounter > sadcounter) {
      return <Image style={styles.iconStyle} source={require('../../../img/happy.png')} />;
    } else if (happycounter < sadcounter) {
      return <Image style={styles.iconStyle} source={require('../../../img/Sad.png')} />;
    } else {
      return <Image style={styles.iconStyle} source={require('../../../img/neutral.png')} />;
    }
  }
  
  // Convert percentage to low, medium or high based on the percentage value.
  precentageToName(percent) {
    if (percent < 33) {
      return 'low';
    } else if (percent > 66) {
      return 'high';
    } else {
      return 'medium';
    }
  }

  // Provides the right format to date in the table.
  convertZeroes(number) {
    if (number.length == 1) {
      newNumber = '0' + number;
    } else {
      newNumber = number;
    }
    return newNumber;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#272B2C' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.dayHeadContainer}>
              <Image
                source={require('../../../img/Calendar.png')}
                style={{ height: 28, width: 28, bottom: 4 }}
              />
              <Text style={styles.iconText}>Date</Text>
            </View>
            <View style={styles.positivityContainer}>
              <Image
                source={require('../../../img/Positivity.png')}
                style={{ height: 31, width: 31 }}
              />
              <Text style={styles.svgText}>Positivity</Text>
            </View>
            <View style={styles.energyContainer}>
              <Image
                source={require('../../../img/Energy.png')}
                style={{ height: 31, width: 31 }}
              />
              <Text style={styles.svgText}>Energy</Text>
            </View>
            <View style={styles.danceabilityContainer}>
              <Image
                source={require('../../../img/Danceability.png')}
                style={{ height: 31, width: 31 }}
              />
              <Text style={styles.svgText}>Danceability</Text>
            </View>
            <View style={styles.moodHeadContainer}>
              <Image 
                source={require('../../../img/Mood.png')} 
                style={{height: 28, width: 28, bottom: 3, resizeMode: 'contain'}}
              />
              <Text style={styles.iconText}>Mood</Text>
            </View>
          </View>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.dayContainer}>
                  <Text style={styles.rowText}>
                    {this.convertZeroes(item.date.split('-')[2]) +
                      '.' +
                      monthNames[item.date.split('-')[1] - 1]}
                  </Text>
                </View>
                <View style={styles.positivityRowText}>
                  <Text style={styles.rowText}>{this.precentageToName(item.Valence)}</Text>
                </View>
                <View style={styles.energyRowText}>
                  <Text style={styles.rowText}>{this.precentageToName(item.Energy)}</Text>
                </View>
                <View style={styles.danceabilityRowText}>
                  <Text style={styles.rowText}>{this.precentageToName(item.Danceability)}</Text>
                </View>
                <View style={styles.moodContainer}>{this.moodIcon(item.mood)}</View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: '#272B2C',
    color: 'white',
    paddingTop:10,
    marginBottom: 80,
  },
  content: {
    flex: 16,
  },
  row: {
    flex: -1,
    borderBottomWidth: 1,
    borderColor: '#696969',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: '#696969',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 10,
  },
  dayHeadContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 4.2,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  positivityContainer: {
    flex: 1,
    alignItems: 'center',
  },
  positivityRowText: {
    flex: 1,
    alignItems: 'center',
  },
  danceabilityContainer: {
    flex: 1,
    alignItems: 'center',
  },
  danceabilityRowText: {
    flex: 1,
    alignItems: 'center',
  },
  energyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  energyRowText: {
    flex: 1,
    alignItems: 'center',
  },
  moodHeadContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5.2,
  },
  moodContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rowText: {
    fontSize: 14,
    color: 'white',
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  svgText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    paddingTop: 2.5,
  },
});
