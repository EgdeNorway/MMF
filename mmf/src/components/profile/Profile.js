import React from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Content, Text, StyleProvider, Body, Container, Icon } from 'native-base';

export default class Profile extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Body>
            <Content>
              <Text>Profiles</Text>
              <Icon
                name="flame"
                style={{ color: 'red' }}
                size={30}
                // eslint-disable-next-line react/prop-types
                onPress={() => this.props.navigation.push('ProfileDetails')}
              />
            </Content>
          </Body>
        </Container>
      </StyleProvider>
    );
  }
}
