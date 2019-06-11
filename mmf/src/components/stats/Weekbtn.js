import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'native-base';

currentdate = new Date();
currentdate.getDate();


// Calculates current week
function weekOfYear(date) {
  var d = new Date(+date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
}

function getThursday(date) {
  d = new Date(date);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 4); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

// In order to exchange monthnumbers with letters.
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class WeekBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: weekOfYear(getThursday(currentdate)),
      month: monthNames[currentdate.getMonth()],
      year: currentdate.getFullYear()
    };
  }

  componentDidMount() {
    this.props.refetch(this.state.week);
  }


  increaser() {
    var d = new Date(currentdate);
    var day = d.getDay(),
      diff = d.getDate() - day + (day + 7);
    currentdate.setDate(diff);

    return getThursday(currentdate);
  }
  
   decreaser() {
    var d = new Date(currentdate);
    var day = d.getDay(),
      diff = d.getDate() - day + (day - 7);
    currentdate.setDate(diff);

    return getThursday(currentdate);
  }

    // Increase weeknubmer by one.
  increaseWeek = () => {
    this.increaser();
    this.setState({
      isLoading: true,
      week: weekOfYear(getThursday(currentdate)),
      month: monthNames[currentdate.getMonth()],
      year: currentdate.getFullYear()
    });
    this.props.refetch(this.state.week + 1);  
  };

  // Decrease weeknubmer by one.
  decreaseWeek = () => {
    this.decreaser();
    this.setState({
      isLoading: true,
      week: weekOfYear(getThursday(currentdate)),
      month: monthNames[currentdate.getMonth()],
      year: currentdate.getFullYear()
    });
    this.props.refetch(this.state.week - 1);
  };

  render() {
    return (
      <View style={styles.topmenu}>
      <View style={styles.weekbtn}>
        <View>
          <Button
            onPress={this.decreaseWeek}
            style={{ flex: 1, justifyContent: "flex-start" }}
            transparent>
            <Icon name="arrow-dropleft" style={{ color: "white" }} />
          </Button>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            Week {this.state.week}, {this.state.month}, {this.state.year}
          </Text>
        </View>
        <View>
          <Button
            onPress={this.increaseWeek}
            style={{ flex: 1, justifyContent: "flex-end" }}
            transparent>
            <Icon name="arrow-dropright" style={{ color: "white" }} />
          </Button>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  topmenu: {
    flex: 1,
    flexDirection: "row"
  },
  weekbtn: {
    flex: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#696969",
    flexDirection: "row",
    height: 50,
    marginLeft: 45,
    marginRight: 45,
    backgroundColor: "#1C2224"
  },
});
