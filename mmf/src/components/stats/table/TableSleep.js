import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Icon, Button } from "native-base";

// Calculates current week.
var weekOfYear = function(date) {
  var d = new Date(+date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
};

let currentdate = new Date();
currentdate.getDate();

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

let month = new Date();
let year = new Date();
let total = 0;

export default class TableSleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Table data.
      dataArray: [
        {
          day: "20.may",
          sleep: 8,
          goal: 6,
          awake: 30,
          image: require("../../../img/neutral.png")
        },
        {
          day: "21.may",
          sleep: 4,
          goal: 6,
          awake: 10,
          image: require("../../../img/Sad.png")
        },
        {
          day: "22.may",
          sleep: 10,
          goal: 6,
          awake: 45,
          image: require("../../../img/happy.png")
        },
        {
          day: "23.may",
          sleep: 8,
          goal: 6,
          awake: 0,
          image: require("../../../img/happy.png")
        },
        {
          day: "24.may",
          sleep: 10,
          goal: 6,
          awake: 0,
          image: require("../../../img/excited.png")
        },
        {
          day: "25.may",
          sleep: 3,
          goal: 6,
          awake: 15,
          image: require("../../../img/verysad.png")
        },
        {
          day: "26.may",
          sleep: 5,
          goal: 6,
          awake: 10,
          image: require("../../../img/Sad.png")
        }
      ]
    };
    // Finds total sleep.
    this.state.dataArray.forEach(item => {
      total = total + item.sleep;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topmenu}>
          <View style={styles.weekbtn}>
            <View>
              <Button
                style={{ flex: 1, justifyContent: "flex-start" }}
                transparent
              >
                <Icon name="arrow-dropleft" style={{ color: "white" }} />
              </Button>
            </View>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 15 }}>
                Week {weekOfYear(currentdate)}, {monthNames[month.getMonth()]}{" "}
                {year.getFullYear()}
              </Text>
            </View>
            <View>
              <Button
                style={{ flex: 1, justifyContent: "flex-end" }}
                transparent
              >
                <Icon name="arrow-dropright" style={{ color: "white" }} />
              </Button>
            </View>
          </View>
          <View style={{ width: 15 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.dayContainer}>
              <Image
                source={require("../../../img/Calendar.png")}
                style={{ height: 28, width: 28, marginBottom: 1.6 }}
              />
              <Text style={styles.iconText}>Date</Text>
            </View>
            <View style={styles.sleepContainer}>
              <Image
                source={require("../../../img/Sleep.png")}
                style={{
                  height: 28,
                  width: 28,
                  resizeMode: "contain",
                  marginBottom: 2
                }}
              />
              <Text style={styles.iconText}>Sleep</Text>
            </View>
            <View style={styles.goalContainer} />
            <View style={styles.awakeContainer}>
              <Image
                source={require("../../../img/Eye.png")}
                style={{ height: 30, width: 30, resizeMode: "contain" }}
              />
              <Text style={styles.iconText}>Awake</Text>
            </View>
            <View style={styles.moodContainer}>
              <Image
                source={require("../../../img/Mood.png")}
                style={{ height: 28, width: 28, marginBottom: 3 }}
              />
              <Text style={styles.iconText}>Mood</Text>
            </View>
          </View>
          
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.dataArray}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.dayContainer}>
                  <Text style={styles.rowText}>{item.day}</Text>
                </View>
                <View style={styles.sleepContainer}>
                  <Text style={styles.rowText}>{item.sleep}h</Text>
                </View>
                <View style={styles.goalContainer}>
                  {item.sleep >= item.goal ? (
                    <Image
                      style={{ width: 18, height: 18, marginTop: 2 }}
                      source={require('../../../img/trophy.png')}
                    />
                  ) : null}
                </View>
                <View style={styles.awakeContainer}>
                  <Text style={styles.rowText}>{item.awake}m</Text>
                </View>
                <View style={styles.moodContainer}>
                  <Image
                    source={item.image}
                    style={{ height: 20, width: 20 }}
                  />
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.totalSleep}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 8 }}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Total Sleep: {total}
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
  totalSleep: {
    flex: 6,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: "#696969"
  },
  dayContainer: {
    flex: 4,
    alignItems: "center"
  },
  sleepContainer: {
    flex: 5,
    alignItems: "center"
  },
  goalContainer: {
    flex: 1,
    alignItems: "center"
  },
  awakeContainer: {
    flex: 5,
    alignItems: "center"
  },
  moodContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  rowText: {
    fontSize: 14,
    color: "white"
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white"
  }
});
