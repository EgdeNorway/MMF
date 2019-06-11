import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight, Alert } from 'react-native';
import { Button, Icon } from 'native-base';

export default class MusicList extends Component {
  state = {
    // TODO: Implement population of dataArray with happy as standard display when fetcher is generated
    dataArray: [
      {
        key: '005',
        songname: 'What Is House',
        artist: 'Calippo',
        positivity: 72,
        energy: 83,
        danceability: 99,
      },
      {
        key: '006',
        songname: 'I am a God',
        artist: 'Kanye West',
        positivity: 23,
        energy: 15,
        danceability: 18,
      },
    ],
    happy: [
      {
        key: '001',
        songname: 'Africa',
        artist: 'Toto',
        positivity: 37,
        energy: 73,
        danceability: 67,
      },
      {
        key: '002',
        songname: 'Hells Bells',
        artist: 'ACDC',
        positivity: 87,
        energy: 30,
        danceability: 39,
      },
      {
        key: '003',
        songname: 'Country Roads',
        artist: 'John Denver',
        positivity: 43,
        energy: 47,
        danceability: 25,
      },
      {
        key: '004',
        songname: 'A&T',
        artist: '21 Savage',
        positivity: 58,
        energy: 83,
        danceability: 92,
      },
      {
        key: '005',
        songname: 'What Is House',
        artist: 'Calippo',
        positivity: 72,
        energy: 83,
        danceability: 99,
      },
      {
        key: '006',
        songname: 'I am a God',
        artist: 'Kanye West',
        positivity: 23,
        energy: 15,
        danceability: 18,
      },
      {
        key: '007',
        songname: 'Fake ID',
        artist: 'Riton',
        positivity: 81,
        energy: 48,
        danceability: 100,
      },
    ],
    sad: [
      {
        key: '003',
        songname: 'Country Roads',
        artist: 'John Denver',
        positivity: 43,
        energy: 47,
        danceability: 25,
      },
      {
        key: '004',
        songname: 'A&T',
        artist: '21 Savage',
        positivity: 58,
        energy: 83,
        danceability: 92,
      },
      {
        key: '005',
        songname: 'What Is House',
        artist: 'Calippo',
        positivity: 72,
        energy: 83,
        danceability: 99,
      },
      {
        key: '006',
        songname: 'I am a God',
        artist: 'Kanye West',
        positivity: 23,
        energy: 15,
        danceability: 18,
      },
      {
        key: '007',
        songname: 'Fake ID',
        artist: 'Riton',
        positivity: 81,
        energy: 48,
        danceability: 100,
      },
    ],
    neutral: [
      {
        key: '006',
        songname: 'I am a God',
        artist: 'Kanye West',
        positivity: 23,
        energy: 15,
        danceability: 18,
      },
      {
        key: '007',
        songname: 'Fake ID',
        artist: 'Riton',
        positivity: 81,
        energy: 48,
        danceability: 100,
      },
    ],
    playlist: 'happy',
    happyBackCol: 'grey',
    sadBackCol: 'transparent',
    neutralBackCol: 'transparent',
  };

  // Set the mood and change title display, playlist and button backgrounds to display active
  selectMood(mood) {
    if (mood == 'happy') {
      this.setState(
        {
          dataArray: [],
          happyBackCol: 'grey',
          sadBackCol: 'transparent',
          neutralBackCol: 'transparent',
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
          happyBackCol: 'transparent',
          sadBackCol: 'grey',
          neutralBackCol: 'transparent',
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
          happyBackCol: 'transparent',
          sadBackCol: 'transparent',
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
  }

  // Send current array state to HTTP request for user generate playlist
  generatePlaylist() {
    //TODO: make itterator for selecting keys and sending to request
    let playlist = this.state.dataArray;
    if (playlist.length <= 0) {
      Alert.alert('MMF Spotify service', 'No songs detected, playlist not generated');
    } else {
      Alert.alert(
        'MMF Spotify service',
        'Generated playlist ' + this.state.playlist + ' on spotify'
      );
    }
  }
  // Deprecated func but not deleting until confirmed logic
  setPlaylist(listName) {
    this.setState({ playlist: listName });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Playlist}> Showing playlist: {this.state.playlist} </Text>
        </View>
        <View style={styles.firstline}>
          {/* <View style={styles.title}>
            <TouchableHighlight onPress={() => this.selectMood("happy")}>
              <View style={styles.firslineButton}>
                <Text style={{ color: 'white' }}>Select mood</Text>
                <Icon name="caret-down" size={20} style={{color: 'white', paddingLeft: 5}}></Icon>  
              </View>  
            </TouchableHighlight>
          </View> */}

          <View style={styles.cell}>
            <TouchableHighlight onPress={() => this.selectMood('happy')}>
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  backgroundColor: this.state.happyBackCol,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Happy</Text>
                <Icon name="arrow-dropdown" size={20} style={{ color: 'white', paddingLeft: 5 }} />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.cell}>
            <TouchableHighlight onPress={() => this.selectMood('sad')}>
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  backgroundColor: this.state.sadBackCol,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Sad</Text>
                <Icon name="arrow-dropdown" size={20} style={{ color: 'white', paddingLeft: 5 }} />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.cell}>
            <TouchableHighlight onPress={() => this.selectMood('neutral')}>
              <View
                style={{
                  flex: -1,
                  flexDirection: 'row',
                  backgroundColor: this.state.neutralBackCol,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Neutral</Text>
                <Icon name="arrow-dropdown" size={20} style={{ color: 'white', paddingLeft: 5 }} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.dataArray}
            extraData={this.state}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.title}>
                  <Text style={{ fontSize: 20, color: 'white' }}>{item.songname}</Text>
                  <Text style={{ color: 'white' }}>{item.artist}</Text>
                </View>
                <View style={styles.cell}>
                  <View>
                    <Icon name="add" size={20} style={{ color: '#93C47D', paddingLeft: 5 }} />
                    <Text style={{ color: 'white', fontSize: 15 }}>{item.positivity}%</Text>
                  </View>
                </View>
                <View style={styles.cell}>
                  <View>
                    <Icon name="flash" size={20} style={{ color: '#FFD966', paddingLeft: 5 }} />
                    <Text style={{ color: 'white', fontSize: 15 }}>{item.energy}%</Text>
                  </View>
                </View>
                <View style={styles.cell}>
                  <View>
                    <Icon name="walk" size={20} style={{ color: '#C27BA0', paddingLeft: 5 }} />
                    <Text style={{ color: 'white', fontSize: 15 }}>{item.danceability}%</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View>
          <Button light style={styles.BotButton} onPress={() => this.generatePlaylist()}>
            <Icon name="musical-note" style={{ color: '#000' }} />
            <Text> Generate playlist </Text>
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
    width: '98%',
  },
  headertext: {
    fontSize: 30,
    marginLeft: 5,
  },
  firslineButton: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttons: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#696969',
    paddingTop: 5,
    paddingBottom: 5,
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    color: 'white',
  },
  cards: {
    flex: 6,
  },
  firstline: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#696969',
  },
  BotButton: {
    justifyContent: 'center',
    padding: 15,
  },
  Playlist: {
    justifyContent: 'center',
    marginLeft: 100,
    color: 'white',
    fontSize: 15,
  },
});
