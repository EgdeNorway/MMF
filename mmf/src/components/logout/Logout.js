/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    };
  }

  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user logged');
      }
    });
  }

  render() {
    const { currentUser } = this.state;
    let button;

    if (currentUser) {
      button = <Button onPress={this.handleLogOut} color="#ff5c5c" title="Logout" />;
      console.log('email/password logout');
    }
    return <View style={styles.container}>{button}</View>;
  }
}
//Firebase logout handle. Is exported to Navigators.js for logout in drawer component
export const handleLogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: 'white',
  },
  blakText: {
    color: 'black',
  },
});
