import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import StatsMusic from './graph/StatsMusic';
import StatsActivity from './graph/StatsAcitivty';
import StatsSleep from './graph/StatsSleep';
import StatsNutrition from './graph/StatsNutrition';

export default class Statistics extends Component {
  constructor(props) {
    super(props);
  }

/**
 * Provides graph and tables for Music, Activity, Sleep and Nutrition.
 * These elements are inserted into the Swiper which makes it possible 
 * to change/swipe between the different categories.
 * Style to the category header.
 */ 

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          dotColor={'#272B2C'}
          activeDotColor={'#fff'}
          paginationStyle={{ marginBottom: 475}}
          swipeEnabled={false}
          lazyLoad={true}
          animationEnabled={false}
          showsButtons={true}
          nextButton= {<Text style={styles.buttonText}>›</Text>}
          prevButton= {<Text style={styles.buttonText}>‹</Text>}
          buttonWrapperStyle={{alignItems: 'flex-start', marginTop: -10, paddingHorizontal: 50, paddingVertical: 0, color: '#fff' }}
        >
          <View style={styles.slide1}>
            <View style={styles.musicBox}>
              <Text style={styles.text}>Music</Text>
            </View>
            <StatsMusic />
          </View>
          <View style={styles.slide2}>
            <View style={styles.activityBox}>
              <Text style={styles.text}>Activity</Text>
            </View>
            <StatsActivity />
          </View>
          <View style={styles.slide3}>
            <View style={styles.sleepBox}>
              <Text style={styles.text}>Sleep</Text>
            </View>
            <StatsSleep />
          </View>
          <View style={styles.slide4}>
            <View style={styles.nutritionBox}>
              <Text style={styles.text}>Nutrition</Text>
            </View>
            <StatsNutrition />
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272B2C',
  },
  buttonText: {
    fontSize: 50,
    color: '#fff'
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#272B2C',
  },
  musicBox: {
    alignItems: 'center',
    backgroundColor: '#B544F3',
    borderBottomWidth: 2,
    borderColor: '#9307E0',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    elevation: 10,
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#272B2C',
  },
  activityBox: {
    alignItems: 'center',
    backgroundColor: '#FF3D3D',
    borderBottomWidth: 2,
    borderColor: '#FF0000',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    elevation: 10,
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#272B2C',
  },
  sleepBox: {
    alignItems: 'center',
    backgroundColor: '#45aaf2',
    borderBottomWidth: 2,
    borderColor: '#0885DE',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    elevation: 10,
  },
  slide4: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#272B2C',
  },
  nutritionBox: {
    alignItems: 'center',
    backgroundColor: '#FF9D3D',
    borderBottomWidth: 2,
    borderColor: '#FF7F00',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    elevation: 10,
  },
  text: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
  },
});
