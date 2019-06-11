import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import { Authentication } from '../utils/Auth';

let total = 0;
let comment = null;

function convert(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes();
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2);

  return formattedTime;
}

export default class MoodTable extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const token = await Authentication();
    try {
      const response = await fetch(
        'https://us-central1-mmfapp-3603c.cloudfunctions.net/getDailyMood?timestamp=' +
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
      console.log(responseJson);

      if (responseJson.Mood !== undefined) {
        responseJson.Mood.forEach(item => {
          console.log(item.mood);
        });
        total = responseJson.Mood.length;
      } else {
        this.setState({
          isLoading: false,
        });
        total = 0;
        console.log('error');
      }

      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.Mood,
        },
        function() {}
      );
    } catch (err) {
      console.error(err);
    }
  }

  //Setter farge basert på iconnavn.
  moodChecker(Mood) {
    let formattedMood = Mood.toLowerCase();
    if (formattedMood == 'excellent') {
      return <Image style={{ width: 30, height: 30 }} source={require('../../img/happy.png')} />;
    } else if (formattedMood == 'happy') {
      return <Image style={{ width: 30, height: 30 }} source={require('../../img/happy.png')} />;
    } else if (formattedMood == 'neutral') {
      return <Image style={{ width: 30, height: 30 }} source={require('../../img/neutral.png')} />;
    } else if (formattedMood == 'sad') {
      return <Image style={{ width: 30, height: 30 }} source={require('../../img/Sad.png')} />;
    } else if (formattedMood == 'terrible') {
      return <Image style={{ width: 30, height: 30 }} source={require('../../img/Sad.png')} />;
    }
  }

  pluralChecker(number) {
    if (number === 1) {
      return 'entry';
    } else {
      return 'entries';
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.headline}>
          <Text style={{ textAlign: 'center', fontSize: 26, color: 'white' }}>Mood</Text>
          <Text style={{ marginLeft: 9, fontSize: 18, color: 'white' }}>
            {total} {this.pluralChecker(total)}
          </Text>
        </View>
        <View style={styles.cards}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.cell}>
                <View style={styles.title}>
                  <View style={styles.emote}>{this.moodChecker(item.mood)}</View>
                </View>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.titletext}>{convert(item.timestamp._seconds)}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{item.comment}</Text>
                  </View>
                </View>
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
    flex: 1,
    backgroundColor: '#272B2C',
  },
  cell: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 10,
    marginRight: 5,
    flexDirection: 'column',
  },
  content: {
    flex: -1,
    borderColor: '#696969',
  },
  text: {
    marginBottom: 0,
    fontSize: 12,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titletext: {
    fontSize: 18,
    marginRight: 5,
    color: 'white',
    marginBottom: 0,
  },
  cards: {
    flex: 10,
    paddingTop: 4,
  },
  emote: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    flex: 1.2,
    borderBottomWidth: 2,
    borderColor: '#696969',
    marginLeft: 4,
    marginTop: 4,
    paddingBottom: 10,
    flexDirection: 'column',
  },
  headicon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
