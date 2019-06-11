import React, { Component } from 'react';
import { Container, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Navigators from '../navigation/Navigators';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Navigators />
        </Container>
      </StyleProvider>
    );
  }
}
