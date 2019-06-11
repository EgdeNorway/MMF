import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Button
} from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { Icon, Content, Body, Container } from "native-base";
import { withNavigation } from "react-navigation";
import { Authentication } from "../utils/Auth";

LocaleConfig.locales["en"] = {
  monthNames: [
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
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S","M", "T", "W", "T", "F", "S"]
};

//Add the markings as constants with colors and ID
const music = { key: "music", color: "#B544F3" };
const mood = { key: "mood", color: "#FFD53D" };
const activity = { key: "activity", color: "#FF3D3D" };
const sleep = { key: "sleep", color: "#45AAF2" };
const nutrition = { key: "nutrition", color: "#FF9D3D" };

//Sets up all the different arrays
let marks = [];
let checker = [];
let moodDate = [];
let musicDate = [];
let activityDate = [];
let sleepDate = [];
let nutritionDate = [];


//Creates date-object for today
let date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1 + "";
let day = date.getDate() + "";

//adds a zero in front of single digits month to match the format: YYYY-MM-DD
if (month.length === 1) {
  month = "0" + month;
} else {
  month = month;
}
//adds a zero in front of signle digit days to match the format: YYYY-MM-DD
if (day.length === 1) {
  day = "0" + day;
} else {
  day = day;
}

//Puts the date in the format: YYYY-MM-DD
fulldate = year + "-" + month + "-" + day;

//Function that creates a date from UNIX-timestamp
function secondsToDate(seconds) {
  let dato = new Date(seconds * 1000);

  let year = dato.getFullYear();
  let month = dato.getMonth() + 1 + "";
  let day = dato.getDate() + "";

  if (month.length === 1) {
    month = "0" + month;
  } else {
    month = month;
  }

  if (day.length === 1) {
    day = "0" + day;
  } else {
    day = day;
  }

  return (thisdate = year + "-" + month + "-" + day);
}

LocaleConfig.defaultLocale = "en";

class Calendar extends Component {
  constructor(props) {
    super(props);
    //Adds a counter for each variable.
    //isLoading is a boolean value, if true it will show an acitivity indicator when fetching data from the database
    //date holds todays date, and is used to indicate in the calendar
    this.state = {
      markings: [],
      isLoading: true,
      moodCounter: 0,
      musicCounter: 0,
      activityCounter: 0,
      sleepCounter: 0,
      nutritionCounter: 0,
      date: fulldate
    };
  }

  
  async componentDidMount() {
    //Get a token from the user through authentication
    const token = await Authentication();
    //Try catch with a fetch function to the database with the getAllMarkings endpoint.
    try {
      const response = await fetch(
        "https://us-central1-mmfapp-3603c.cloudfunctions.net/getAllMarkings",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      //The results arrive in a JSON format: responseJSON
      const responseJson = await response.json();
       //Temporary counters for all variables.
      let moodCounter = 0;
      let musicCounter = 0;
      let activityCounter = 0;
      let sleepCounter = 0;
      let nutritionCounter = 0;

      //checks if all the arrays are undefined, If not add the date to the array if its not in already.
      //checks if it is in a common array for all dates: the array is called checker 
      if (responseJson.result[0].Music !== undefined) {
        responseJson.result[0].Music.forEach(item => {
          if (!musicDate.includes(secondsToDate(item._seconds))) {
            musicDate.push(secondsToDate(item._seconds));
          }

          if(!checker.includes(secondsToDate(item._seconds))){
            checker.push(secondsToDate(item._seconds));
          }

        });
      } else {
        this.setState({
          isLoading: false
        });
 
      }

      if (responseJson.result[1].Mood !== undefined) {
        responseJson.result[1].Mood.forEach(item => {
          if (!moodDate.includes(secondsToDate(item._seconds))) {
            moodDate.push(secondsToDate(item._seconds));
          }

          if(!checker.includes(secondsToDate(item._seconds))){
            checker.push(secondsToDate(item._seconds));
          }

        });
      } else {
        this.setState({
          isLoading: false
        });
      }

      if (responseJson.result[2].Activity !== undefined) {
        responseJson.result[2].Activity.forEach(item => {
          if (!activityDate.includes(secondsToDate(item._seconds))) {
            activityDate.push(secondsToDate(item._seconds));
          }

          if(!checker.includes(secondsToDate(item._seconds))){
            checker.push(secondsToDate(item._seconds));
          }

        });
      } else {
        this.setState({
          isLoading: false
        });
      }

      if (responseJson.result[3].Nutrition !== undefined) {
        responseJson.result[3].Nutrition.forEach(item => {
          if (!nutritionDate.includes(secondsToDate(item._seconds))) {
            nutritionDate.push(secondsToDate(item._seconds));
          }

          if(!checker.includes(secondsToDate(item._seconds))){
            checker.push(secondsToDate(item._seconds));
          }

        });
      } else {
        this.setState({
          isLoading: false
        });
        
      }


      if (responseJson.result[4].Sleep !== undefined) {
        responseJson.result[4].Sleep.forEach(item => {
          if (!sleepDate.includes(secondsToDate(item._seconds))) {
            sleepDate.push(secondsToDate(item._seconds));
          }

          if(!checker.includes(secondsToDate(item._seconds))){
            checker.push(secondsToDate(item._seconds));
          }

        });
      } else {
        this.setState({
          isLoading: false
        });

      }
   

      //Goes through all the common dates which was added to: checker
      //Then adds the correct markings to the spesific date.
      //Goes through the different arrays and checks the date with the common 
      //If the date in the variable array and the common array, add the marking
      // In the end of the foreach it adds the markings to the mark 
      checker.forEach(item =>{
        this.setState({
            markings: []
        })

        moodDate.forEach(element=>{
          if(item.includes(element)){
            this.state.markings.push(mood);
            moodCounter++;
          }
        });

        musicDate.forEach(element=>{
          if(item.includes(element)){
            this.state.markings.push(music);
            musicCounter++;
          }
        });

        activityDate.forEach(element=>{
          if(item.includes(element)){
            this.state.markings.push(activity);
            activityCounter++;
          }
        });

        sleepDate.forEach(element=>{
          if(item.includes(element)){
            this.state.markings.push(sleep);
            sleepCounter++;
          }
        });

        nutritionDate.forEach(element=>{
          if(item.includes(element)){
            this.state.markings.push(nutrition);
            nutritionCounter ++;
          }
        });

        marks = {
          ...marks,
          [item]: {
            marked: true,
            dots: this.state.markings
          }
        };
      })

      //Oppdates the states with the results, and the counter object
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.result,
          moodCounter: moodCounter,
          musicCounter: musicCounter,
          activityCounter: activityCounter,
          sleepCounter: sleepCounter,
          nutritionCounter: nutritionCounter,
        },
        function() {}
      );
    } catch (err) {
      console.error(err);
    }
  }

   //render function which contains a if statement with the activity indicator, and the return functions with the JSX code
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#272b2c" }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Container>
          <Body>
            <Content>
              <View style={styles.content}>
              
                <CalendarList
                //Calender object with its variables
                  horizontal={true}
                  pagingEnabled={true}
                  futureScrollRange={0}
                  maxDate={this.state.date}
                  firstDay={1}
                  //when you click on a day it sends you to calenderview with information for that day.
                  //Using props sending the date for that day.
                  onDayPress={day => {
                    this.props.navigation.navigate("CalendarView", {
                      dayID: day.dateString
                    });
                  }}
                  //Markings added as: marks
                  markedDates={marks}
                  markingType={"multi-dot"}
                  //Styling for the calendar.
                  theme={{
                    backgroundColor: "#",
                    calendarBackground: "#272B2C",
                    textSectionTitleColor: "#b6c1cd",
                    selectedDayTextColor: "blue",
                    todayTextColor: "#E84A5F",
                    dayTextColor: "white",
                    textDisabledColor: "#525252",
                    dotColor: "#99B898",
                    selectedDotColor: "#ffffff",
                    arrowColor: "orange",
                    monthTextColor: "white",
                    textDayFontFamily: "monospace",
                    textMonthFontFamily: "monospace",
                    textDayHeaderFontFamily: "monospace",
                    textMonthFontWeight: "bold",
                    textDayFontSize: 20,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 20,
                  }}
                />
              </View>
              <View style={styles.bottom}>
                <View style={{ flex: 1 }} />
                
                <View
                  style={{ flex: 3, marginTop: 15, flexDirection: "column" }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 35,
                        color: "white"
                      }}
                    >
                      {this.state.moodCounter}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#FFD53D",
                        height: 8
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14
                      }}
                    >
                      Mood
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 1 }} />

                <View
                  style={{ flex: 3, marginTop: 15, flexDirection: "column" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 35,
                        color: "white"
                      }}>
                      {this.state.musicCounter}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#B544F3",
                        height: 8
                      }}/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14
                      }}>
                      Music
                    </Text>
                  </View>
          
                </View>

                <View style={{ flex: 1 }} />

                <View
                  style={{ flex: 3, marginTop: 15, flexDirection: "column" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 35,
                        color: "white"
                      }}>
                      {this.state.activityCounter}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#FF3D3D",
                        height: 8
                      }}/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14
                      }}>
                      Activity
                    </Text>
                  </View>
                  
          
                </View>

                <View style={{ flex: 1 }} />

                <View
                  style={{ flex: 3, marginTop: 15, flexDirection: "column" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 35,
                        color: "white"
                      }}>
                      {this.state.sleepCounter}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#45AAF2",
                        height: 8
                      }}/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14
                      }}>
                      Sleep
                    </Text>
                  </View>

                  
                
                </View>

                <View style={{ flex: 1 }} />

                <View
                  style={{ flex: 3, marginTop: 15, flexDirection: "column" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 35,
                        color: "white"
                      }}>
                      {this.state.nutritionCounter}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "#FF9D3D",
                        height: 8
                      }}/>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14
                      }}>
                      Nutrition
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </Content>
          </Body>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272b2c"
  },
  content: {
    flex: 1,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#696969"
  },
  bottom: {
    flex: 1,
    flexDirection: "row"
  }
});

export default withNavigation(Calendar);