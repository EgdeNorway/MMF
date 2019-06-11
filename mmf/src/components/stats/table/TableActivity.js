import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Authentication } from "../../utils/Auth";

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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default class TableActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalsteps: 0,
      isLoading: true,
      weekID: weekOfYear(getThursday(currentdate)),
      date: "",
      dataSource: []
    };
  }

  async componentDidMount() {
    const token = await Authentication();
    return fetch(
      "https://us-central1-mmfapp-3603c.cloudfunctions.net/getFitbit?weekID=" +
        this.state.weekID,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            totalsteps: 0,
            isLoading: false,
            dataSource: responseJson.Fitbit
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  async refetch(week) {
    const token = await Authentication();
    return fetch(
      "https://us-central1-mmfapp-3603c.cloudfunctions.net/getFitbit?weekID=" +
        week,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let tempsteps = 0;
        console.log(responseJson);

        if (
          responseJson.Fitbit === undefined ||
          responseJson.Fitbit.length == 0
        ) {
          this.setState({
            steps: null,
            isLoading: false,
            dataSource: responseJson.Fitbit
          });
        } else {
          responseJson.Fitbit.forEach(item => {
            tempsteps = tempsteps + item.steps;
          });

          this.setState({
            steps: tempsteps,
            isLoading: false,
            dataSource: responseJson.Fitbit
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // returns images to the different moods.
  moodSwitch(mood) {
    formattedMood = mood.toLowerCase();
    if (formattedMood === "excellent") {
      return (
        <Image
          style={styles.iconStyle}
          source={require("../../../img/excited.png")}
        />
      );
    } else if (mood === "happy") {
      return (
        <Image
          style={styles.iconStyle}
          source={require("../../../img/happy.png")}
        />
      );
    } else if (mood === "neutral") {
      return (
        <Image
          style={styles.iconStyle}
          source={require("../../../img/neutral.png")}
        />
      );
    } else if (mood === "sad") {
      return (
        <Image
          style={styles.iconStyle}
          source={require("../../../img/Sad.png")}
        />
      );
    } else if (mood === "terrible") {
      return (
        <Image
          style={styles.iconStyle}
          source={require("../../../img/verysad.png")}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.dayContainer}>
              <Image
                source={require("../../../img/Calendar.png")}
                style={{ height: 28, width: 28 }}
              />
              <Text style={styles.iconText}>Date</Text>
            </View>
            <View style={styles.stepsContainer}>
              <Image
                source={require("../../../img/Steps.png")}
                style={{ height: 28, width: 28, resizeMode: "contain" }}
              />
              <Text style={styles.iconText}>Steps</Text>
            </View>
            <View style={styles.goalContainer} />
            <View style={styles.kcalContainer}>
              <Image
                source={require("../../../img/Flame.png")}
                style={{ height: 28, width: 28, resizeMode: "contain" }}
              />
              <Text style={styles.iconText}>Kcal</Text>
            </View>
            <View style={styles.moodContainer}>
              <Image
                source={require("../../../img/Mood.png")}
                style={{ height: 28, width: 28 }}
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
                    {item.date.split("-")[2] +
                      "." +
                      monthNames[item.date.split("-")[1] - 1]}
                  </Text>
                </View>
                <View style={styles.stepsContainer}>
                  <Text style={styles.rowText}>{item.steps}</Text>
                </View>
                <View style={styles.goalContainer}>
                  {item.steps >= item.goals.steps ? (
                    <Image
                      style={{ width: 18, height: 18, marginTop: 2 }}
                      source={require("../../../img/trophy.png")}
                    />
                  ) : null}
                </View>
                <View style={styles.kcalContainer}>
                  <Text style={styles.rowText}>{item.calories}</Text>
                </View>
                <View style={styles.moodContainer}>
                  {this.moodSwitch(item.mood)}
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.totalSteps}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 8 }}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              {this.state.dataSource !== undefined? ("Total Steps: " + this.state.steps) : null}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: "#272B2C",
    color: "white"
  },
  content: {
    flex: 16
  },
  row: {
    flex: -1,
    borderBottomWidth: 1,
    borderColor: "#696969",
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 10
  },
  totalSteps: {
    flex: 6,
    paddingTop: 20,
    paddingBottom: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: "#696969"
  },
  dayContainer: {
    flex: 4,
    alignItems: "center"
  },
  stepsContainer: {
    flex: 5,
    alignItems: "center"
  },
  goalContainer: {
    flex: 1,
    alignItems: "center"
  },
  kcalContainer: {
    flex: 5,
    alignItems: "center"
  },
  moodContainer: {
    flex: 4,
    alignItems: "center"
  },
  rowText: {
    fontSize: 14,
    color: "white"
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white"
  },
  iconStyle: {
    width: 20,
    height: 20
  }
});
