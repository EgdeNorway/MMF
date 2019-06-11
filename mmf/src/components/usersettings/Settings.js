import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Content, Text, StyleProvider, Body, Container, Icon } from 'native-base';

export default class Settings extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Body>
            <Content>
              <Text>Settings</Text>
              <Icon
                name="flame"
                size={30}
                // eslint-disable-next-line react/prop-types
                onPress={() => this.props.navigation.push('SettingsDetails')}
              />
            </Content>
          </Body>
        </Container>
      </StyleProvider>
    );
  }
}
