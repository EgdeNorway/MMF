import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { Text, Card } from 'native-base';
import * as Progress from 'react-native-progress';
import { Authentication } from '../utils/Auth';

class SimpleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  // Get data for cards and populate them
  async refetch() {
    const token = await Authentication();
    const response = await fetch(
      'https://us-central1-mmfapp-3603c.cloudfunctions.net/getAllFrontpage?timestamp=' +
        this.props.propdate,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const responseJson = await response.json();

    let calories = 0;
    let caloriesGoal = 0;
    let caloriesProgress = 0;

    let sleep = 0;
    let sleepGoal = 0;
    let sleepProgress = 0;

    let steps = 0;
    let stepsGoal = 0;
    let stepProgress = 0;

    if (responseJson.result[0].activity !== undefined) {
      responseJson.result[0].activity.forEach(item => {
        steps = steps + item.steps;
        stepsGoal = item.goals.steps;
        stepProgress = steps / stepsGoal;
      });
    } else if (responseJson.result[0].activity.length === 0) {
      steps = 0;
      stepsGoal = 0;
      stepProgress = 0;
    } else {
      steps = 0;
      stepsGoal = 0;
      stepProgress = 0;
    }

    if (responseJson.result[1].sleep !== undefined) {
      responseJson.result[1].sleep.forEach(item => {
        sleep = sleep + item.duration;
        sleepGoal = item.goals.duration;
        sleepProgress = sleep / sleepGoal;
      });
    } else if (responseJson.result[1].sleep.length === 0) {
      sleep = 0;
      sleepGoal = 0;
      sleepProgress = 0;
    } else {
      sleep = 0;
      sleepGoal = 0;
      sleepProgress = 0;
    }

    if (responseJson.result[2].nutrition !== undefined) {
      responseJson.result[2].nutrition.forEach(item => {
        calories = item.calories;
        caloriesGoal = item.goals.calories;
        caloriesProgress = calories / caloriesGoal;
      });
    } else if (responseJson.result[2].nutrition.length === 0) {
      calories = 0;
      caloriesGoal = 0;
      caloriesProgress = 0;
    } else {
      calories = 0;
      caloriesGoal = 0;
      caloriesProgress = 0;
    }

    this.setState({
      cardList: [
        (steps = {
          image: require('../../img/Steps.png'),
          title: 'Steps',
          value: steps,
          goal: 'Goal',
          goalValue: stepsGoal,
          progress: stepProgress,
          barColor: '#FF3D3D',
        }),
        (sleep = {
          image: require('../../img/Sleep.png'),
          title: 'Sleep',
          value: sleep,
          goalValue: sleepGoal,
          progress: sleepProgress,
          goal: 'Goal',
          barColor: '#45aaf2',
        }),
        (kcal = {
          value: calories,
          goalValue: caloriesGoal,
          progress: caloriesProgress,
          image: require('../../img/Nutrition.png'),
          title: 'Kcal',
          goal: 'Goal',
          barColor: '#FF9D3D',
        }),
      ],
    });

    this.setState(
      {
        isLoading: false,
        dataSource: responseJson.result,
      },
      function() {}
    );
  }

  componentDidMount() {
    this.refetch();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#272b2c' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        {this.state.cardList.map(item => {
          return (
            <Card
              key={item.title}
              style={{
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                borderBottomWidth: 3,
              }}
            >
              <View style={styles.container}>
                <View style={styles.iconcontainer}>
                  <Image
                    source={item.image}
                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                  />
                </View>
                <View style={styles.title}>
                  <Text style={{ fontSize: 14 }}>{item.title}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.value}</Text>
                  <Text style={{ fontSize: 14 }}>{item.goal}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.goalValue}</Text>
                </View>
                <View style={styles.progresscontainer}>
                  <View style={styles.bar}>
                    <Progress.Bar
                      progress={item.progress}
                      style={styles.shadow}
                      height={14}
                      width={200}
                      color={item.barColor}
                      unfilledColor={'#fff'}
                      borderWidth={1}
                      borderColor={'#fff'}
                    />
                  </View>
                  <View style={styles.barPercent}>
                    <Text> {Math.round(item.progress * 100)}%</Text>
                  </View>
                </View>
              </View>
            </Card>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    padding: 3,
    borderWidth: 0,
    margin: 3,
  },
  progresscontainer: {
    flex: 8,
    alignItems: 'center',
  },
  iconcontainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 2.5,
    justifyContent: 'center',
  },
  barPercent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default SimpleCard;
