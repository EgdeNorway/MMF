import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomCalendar from "./Calendar";
import SimpleCard from "../cards/SimpleCard";
import ExpandCard from "../cards/ExpandCardCalendar";
import { Card, CardItem } from "native-base";
import { Authentication } from "../utils/Auth";

const months = [
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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

//function that handles the ending of the numbers: example: 1st, 2nd, 3rd
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  //fetcher that fetches the daily mood for the day that comes from props.
  async fetcher(day) {
    const token = await Authentication();
    try {
      const response = await fetch(
        "https://us-central1-mmfapp-3603c.cloudfunctions.net/getDailyMood?timestamp=" +
          day,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      //the result is a JSON-object as: responseJson.
      const responseJson = await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  //Render that gets the props from calendar
  render() {
    const { navigation } = this.props;
    const dayID = navigation.getParam("dayID", "NO-ID");
    this.fetcher(dayID);
    let actualdate = new Date(dayID);

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: -1,
            backgroundColor: "#424242",
            borderBottomColor: "#282828",
            borderBottomWidth: 1,
            paddingBottom: 12,
            paddingTop: 12
          }}
        >
          <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>
            {ordinal_suffix_of(actualdate.getDate())} of{" "}
            {months[actualdate.getMonth()]} {actualdate.getFullYear()}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.calendar} />
          <ScrollView style={styles.cards}>
            <View style={styles.modalcards}>
              <ExpandCard propdate={dayID} />
            </View>
            <View style={styles.staticcards}>
              <SimpleCard propdate={dayID} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272B2C"
  },
  modalcards: {
    flex: 2
  },
  staticcards: {
    flex: 2
  },
  content: {
    flex: 1
  },
  calendar: {
    height: 10
  },
  cards: {
    flex: 1
  }
});
