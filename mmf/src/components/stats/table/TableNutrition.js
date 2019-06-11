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

export default class TableNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Table data.
      dataArray: [
        {
          day: "20.may",
          kcal: 3000,
          goal: 3000,
          macros: 30,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/excited.png")
        },
        {
          day: "21.may",
          kcal: 2000,
          goal: 3000,
          macros: 10,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/happy.png")
        },
        {
          day: "22.may",
          kcal: 4000,
          goal: 3000,
          macros: 45,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/Sad.png")
        },
        {
          day: "23.may",
          kcal: 5000,
          goal: 3000,
          macros: 0,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/verysad.png")
        },
        {
          day: "24.may",
          kcal: 3900,
          goal: 3000,
          macros: 0,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/neutral.png")
        },
        {
          day: "25.may",
          kcal: 5000,
          goal: 3000,
          macros: 15,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/neutral.png")
        },
        {
          day: "26.may",
          kcal: 3000,
          goal: 3000,
          macros: 10,
          carbs: 172,
          fat: 130,
          protein: 45,
          image: require("../../../img/happy.png")
        }
      ]
    };
    // Finds total kcal.
    this.state.dataArray.forEach(item => {
      total = total + item.kcal;
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
                style={{ height: 28, width: 28 }}
              />
              <Text style={styles.iconText}>Date</Text>
            </View>
            <View style={styles.kcalHeadContainer}>
              <Image
                source={require("../../../img/Nutrition.png")}
                style={{
                  height: 33,
                  width: 33,
                  resizeMode: "contain",
                  bottom: 6
                }}
              />
              <Text style={styles.iconText2}>Kcal</Text>
            </View>
            <View style={styles.goalContainer} />
            <View style={styles.macroContainer}>
              <Image
                source={require("../../../img/Pie.png")}
                style={{ height: 28, width: 28 }}
              />
              <Text style={styles.iconText}>Macros</Text>
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
            data={this.state.dataArray}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.dayContainer}>
                  <Text style={styles.rowText}>{item.day}</Text>
                </View>
                <View style={styles.kcalContainer}>
                  <Text style={styles.rowText}>{item.kcal}</Text>
                </View>
                <View style={styles.goalContainer}>
                  {item.kcal == item.goal ? (
                    <Image
                      style={{ width: 18, height: 18, marginTop: 2 }}
                      source={require('../../../img/trophy.png')}
                    />
                  ) : null}
                </View>
                <View style={styles.macroContainer}>
                  <Text style={styles.macroText}>Carbs: {item.carbs}g</Text>
                  <Text style={styles.macroText}>Fat: {item.fat}g</Text>
                  <Text style={styles.macroText}>Protein: {item.protein}g</Text>
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

        <View style={styles.totalKcal}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 8 }}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Total Kcal: {total}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272B2C",
    color: "white"
  },
  content: {
    flex: 13
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
  totalKcal: {
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
  kcalHeadContainer: {
    flex: 5,
    alignItems: "center",
    paddingTop: 4.3
  },
  kcalContainer: {
    flex: 5,
    alignItems: "center"
  },
  goalContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  macroContainer: {
    flex: 5,
    alignItems: "center"
  },
  moodContainer: {
    flex: 5,
    alignItems: "center"
  },
  rowText: {
    fontSize: 14,
    color: "white"
  },
  macroText: {
    flex: 1,
    fontSize: 14,
    color: "#fff"
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 14,
    color: 'white',
  }, 
  //Adjustment for one of the icons
  iconText2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    bottom: 10
  }
});
