import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Alert, ActivityIndicator, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Authentication } from '../utils/Auth';

export default class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      happy: null,
      neutral: null,
      sad: null,
      playlist: 'happy',
      happyBackCol: 'grey',
      sadBackCol: '#1C2224',
      neutralBackCol: '#1C2224',
    };
  }

  // Set the mood and change title display, playlist and button backgrounds to display active
  selectMood(mood) {
    if (mood == 'happy') {
      this.setState(
        {
          dataArray: [],
          happyBackCol: 'grey',
          sadBackCol: '#1C2224',
          neutralBackCol: '#1C2224',
          playlist: mood,
        },
        function() {
          this.setState({
            dataArray: this.state.dataArray.concat(this.state.happy),
          });
        }
      );
    } else if (mood == 'sad') {
      this.setState(
        {
          dataArray: [],
          happyBackCol: '#1C2224',
          sadBackCol: 'grey',
          neutralBackCol: '#1C2224',
          playlist: mood,
        },
        function() {
          this.setState({
            dataArray: this.state.dataArray.concat(this.state.sad),
          });
        }
      );
    } else if (mood == 'neutral') {
      this.setState(
        {
          dataArray: [],
          happyBackCol: '#1C2224',
          sadBackCol: '#1C2224',
          neutralBackCol: 'grey',
          playlist: mood,
        },
        function() {
          this.setState({
            dataArray: this.state.dataArray.concat(this.state.neutral),
          });
        }
      );
    }

    console.log(this.props.propdate);
  }
  async componentDidMount() {
    const token = await Authentication();
    try {
      const response = await fetch(
        'https://us-central1-mmfapp-3603c.cloudfunctions.net/getAllMusic?timestamp=' +
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
      if (responseJson.Mood === undefined) {
        this.setState({
          isLoading: false,
          happy: null,
          neutral: null,
          sad: null,
        });
      } else if (responseJson.Mood !== undefined) {
        this.setState({
          isLoading: false,
          happy: responseJson.Mood.happy,
          neutral: responseJson.Mood.neutral,
          sad: responseJson.Mood.sad,
        });
      }
      this.setState(
        {
          isLoading: false,
          playlist: this.state.happy,
        },
        function() {}
      );
    } catch (err) {
      console.error(err);
    }
  }

  // TODO: Implement backend for spotify call to:
  // Send current array state to HTTP request for user generate playlist:>
  // Spotify API calls: Create a Playlist & Add Tracks to a Playlist
  generatePlaylist() {
    //TODO: make itterator for selecting keys/spotify track ID's from active list
    let playlistname = '';

    let playlist = this.state.playlist;

    if (this.state.happyBackCol === 'grey') {
      playlistname = 'happy';
    } else if (this.state.neutralBackCol === 'grey') {
      playlistname = 'neutral';
    } else if (this.state.sadBackCol === 'grey') {
      playlistname = 'sad';
    } else {
      playlistname = 'undefined';
    }

    if (playlist === null || playlist.length === null || playlist.length <= 0) {
      Alert.alert('MMF Spotify service', 'No songs detected, playlist not generated');
    } else {
      Alert.alert(
        'MMF Spotify service',
        // "Generated playlist " + playlistname + " on spotify"
        'This feature is not implemented yet, see code comments'
      );
    }
  }

  // Set spotify analysis values to user friendly variables
  changeNumbers(num) {
    if (num < 0.33) {
      return 'low';
    } else if (num > 0.66) {
      return 'high';
    } else {
      return 'medium';
    }
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
        <View style={styles.firstline}>
          <View style={styles.cell}>
            <Button
              block
              style={{
                borderRadius: 0,
                backgroundColor: this.state.happyBackCol,
              }}
              onPress={() =>
                this.setState({
                  isLoading: false,
                  playlist: this.state.happy,
                  happyBackCol: 'grey',
                  neutralBackCol: '#1C2224',
                  sadBackCol: '#1C2224',
                })
              }
            >
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Happy</Text>
              </View>
            </Button>
          </View>

          <View style={styles.cell}>
            <Button
              block
              style={{
                borderRadius: 0,
                backgroundColor: this.state.neutralBackCol,
              }}
              onPress={() =>
                this.setState({
                  isLoading: false,
                  playlist: this.state.neutral,
                  happyBackCol: '#1C2224',
                  neutralBackCol: 'grey',
                  sadBackCol: '#1C2224',
                })
              }
            >
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Neutral</Text>
              </View>
            </Button>
          </View>

          <View style={styles.cell}>
            <Button
              block
              style={{
                borderRadius: 0,
                backgroundColor: this.state.sadBackCol,
              }}
              onPress={() =>
                this.setState({
                  isLoading: false,
                  playlist: this.state.sad,
                  happyBackCol: '#1C2224',
                  neutralBackCol: '#1C2224',
                  sadBackCol: 'grey',
                })
              }
            >
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Sad</Text>
              </View>
            </Button>
          </View>
        </View>
        <View style={styles.cards}>
          <View style={styles.firstrow}>
            <View style={styles.title}>
              <Text style={{ fontSize: 15, color: 'white' }}>Title</Text>
              <Text style={{ color: 'white' }}>artist</Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.cell}>
                <Image style={{ width: 40, height: 40 }} source={require('../../img/Energy.png')} />
              </View>

              <View style={styles.cell}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../img/Danceability.png')}
                />
              </View>

              <View style={styles.cell}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../img/Positivity.png')}
                />
              </View>
            </View>
          </View>

          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.playlist}
            extraData={this.state}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.title}>
                  <Text style={{ fontSize: 20, color: 'white' }}>{item.title}</Text>
                  <Text style={{ color: 'white' }}>{item.artist}</Text>
                </View>
                <View style={styles.stats}>
                  <View style={styles.cell}>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          textAlign: 'center',
                          marginRight: 14,
                        }}
                      >
                        {this.changeNumbers(item.energy)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cell}>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          textAlign: 'center',
                          marginRight: 14,
                        }}
                      >
                        {this.changeNumbers(item.danceability)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cell}>
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          textAlign: 'center',
                          marginRight: 14,
                        }}
                      >
                        {this.changeNumbers(item.valence)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            light
            // disabled={true}
            style={styles.BotButton}
            onPress={() => this.generatePlaylist()}
          >
            <FontAwesomeIcon name="spotify" style={{ fontSize: 40, color: 'green' }} />
            <Text style={{ color: 'white' }}> Generate playlist </Text>
          </Button>
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
  firstline: {
    flex: 1,
    flexDirection: 'row',
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttons: {
    flex: 1,
  },
  cards: {
    flex: 10,
  },
  firstrow: {
    flex: -1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  row: {
    flex: -1,
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  stats: {
    flex: 2,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 5,
  },
  precentages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bottom: {
    flex: 1,
  },
  BotButton: {
    backgroundColor: '#1C2224',
    borderColor: '#696969',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    margin: -15,
  },
});
