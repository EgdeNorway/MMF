import React, { Component } from 'react';
import { Container, StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import SwitchNavigator from '../navigation/SwitchNavigator';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <SwitchNavigator />
        </Container>
      </StyleProvider>
    );
  }
}
