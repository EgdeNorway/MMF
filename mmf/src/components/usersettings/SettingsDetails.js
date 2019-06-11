import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Content, Text, StyleProvider, Body, Container } from 'native-base';

export default class SettingsDetails extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Body>
            <Content>
              <Text>SettingsDetails</Text>
            </Content>
          </Body>
        </Container>
      </StyleProvider>
    );
  }
}
