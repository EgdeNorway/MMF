import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Content, Card, Text, StyleProvider } from 'native-base';
import MoodModal from '../modals/CalendarMoodModal';
import MusicModal from '../modals/CalendarMusicModal';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

class ExpandCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [
        {
          image: require('../../img/Mood.png'),
          title: 'Mood',
          text: 'Mood for this date',
          burder: 0,
          burdercolor: '#FFD53D'  
        },
        {
          image: require('../../img/Music.png'),
          title: 'Music',
          text: 'Music for this date',
          burder: 12,
          burdercolor: '#B544F3' 
        },
      ],
    };
  }

  titleRender(item) {
    if (item.title == 'Mood') {
      return <MoodModal dateprop={this.props.propdate} />;
    } else {
      return <MusicModal dateprop={this.props.propdate} />;
    }
  }

  render() {
    return (
      <Content>
        {this.state.cardList.map(item => {
          return (
            <Card
              key={item.title}
              style={{
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: item.burder,
                borderBottomColor: item.burdercolor,
                borderBottomWidth: 3,
              }}
            >
              <StyleProvider style={getTheme(material)}>
                <View style={styles.container}>
                  <View style={styles.iconcontainer}>
                    <Image
                      source={item.image}
                      style={{ width: 42, height: 42, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={styles.spacer} />
                  <View style={styles.content}>
                    <View style={styles.textcontainer}>
                      <Text style={styles.cardContent}> {item.text}</Text>
                    </View>
                    <View style={styles.modalcontainer}>{this.titleRender(item)}</View>
                  </View>
                </View>
              </StyleProvider>
            </Card>
          );
        })}
      </Content>
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
  iconcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: 20,
  },

  content: {
    flex: 6,
    flexDirection: 'row',
  },
  modalcontainer: {
    flex: 2,
    justifyContent: 'center',
  },
  textcontainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
export default ExpandCard;
