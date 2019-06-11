import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Container, StyleProvider, Content, CardItem, Text } from 'native-base';
import SimpleCard from './SimpleCard';
import ExpandCard from './ExpandCard';

//const myIcon = (<Icon name="fas fa-smile" size={30} color="#900" />)

let date = new Date();

let yesterday = new Date(date - 86400000);

let year = yesterday.getFullYear();
let month = yesterday.getMonth() + 1 + '';
let day = yesterday.getDate() + '';

if (month.length === 1) {
  month = '0' + month;
} else {
  month = month;
}

if (day.length === 1) {
  day = '0' + day;
} else {
  day = day;
}

let yesterdaysdate = year + '-' + month + '-' + day;

export default class MoodCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yesterdaysdate: yesterdaysdate,
    };
  }
  render() {
    return (
      <Container>
        <StyleProvider style={getTheme(material)}>
          <Content>
            <ExpandCard />
            <CardItem style={{ marginBottom: 12 }} header bordered>
              <Text style={{ alignItems: 'center' }}> Yesterdays information </Text>
            </CardItem>
            <SimpleCard propdate={this.state.yesterdaysdate} />
          </Content>
        </StyleProvider>
      </Container>
    );
  }
}
