import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Content, Text, StyleProvider, Body, Container } from 'native-base';
import firebase from 'react-native-firebase';
import { object } from 'prop-types';
import { Authentication } from '../utils/Auth';

export default class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    // this.state = {token: ''}
    // this.state = { currentUser: null}
  }
  //state = { currentUser: null };

  async getProfileDetails() {
    const token = await Authentication();
    return fetch(
      'https://us-central1-mmfapp-3603c.cloudfunctions.net/getProfile',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      } /*&timestamp= + this.props.propdate*/
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.Profile,
        });
        console.log(this.state.dataSource);
        console.log(responseJson.Profile);
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    // // this.setState({ currentUser });
    // if (currentUser) {
    //   const objectToken = await currentUser.getIdToken();
    //   console.log('Her er objectToken:' + objectToken);
    //   // const token = JSON.stringify(objectToken);
    //   // console.log("her er token: " + token);
    //   this.getProfileDetails(objectToken);
    //   return objectToken;
    // }
    // const res = await Authentication();
    // console.log('her er res: ', res);
    // this.getProfileDetails(res);
    this.getProfileDetails();
  }

  render() {
    //const { currentUser } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Body>
            <Content>
              <Text>ProfileDetails: </Text>
            </Content>
          </Body>
        </Container>
      </StyleProvider>
    );
  }
}
