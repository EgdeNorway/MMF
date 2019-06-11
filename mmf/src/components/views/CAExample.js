/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import { createElement } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import Constants from '../constants/Constants';
import Events from '../events/Events';
import NativeBridge from '../native/NativeBridge';
import { clone } from 'lodash';
import { Authentication } from '../utils/Auth';

export default class CAExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //isLoading: true,
    };
  }
  componentWillUnmount() {
    if (this.fileData) {
      this.fileData.remove();
    }
    this.setState({ data: [] });
  }
  /*
   * Listenes for event of accept or reject
   * If rejected => send to home
   * If accepted => Get data from listener and nativebridge,
   * and send data to DB
   * Adds data as json
   */

  async componentDidMount() {
    this.accept = NativeBridge.getNativeBridge().addListener(Events.USER_AUTH_ACCEPT, () => {
      // this.changeView('results');
      this.fileData = NativeBridge.getNativeBridge().addListener(
        Events.FILE_DATA,
        addDataString.bind(this)
      );
      console.log('Is empty: ', this.state.data);
      //  console.log('Length på state er: ', this.state.data.length);
      if (this.state.data.length === 5) {
        console.log('Has data', this.state.data);
        const responseJson = sendData(this.state.data);
        if (responseJson.status === 200) {
          console.log('RESPONSE JSON', responseJson);
        }
      }

      async function sendData(data) {
        try {
          const token = await Authentication();
          const response = await fetch(
            'https://us-central1-mmfapp-3603c.cloudfunctions.net/tempDigiMe',
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data }),
            }
          );
          // Promise.resolve(response);
          console.log('FETCH: ', response);
        } catch (err) {
          console.error(err);
        }
      }
      function addDataString(jsonString) {
        const newdata = clone(this.state.data);
        newdata.push(jsonString.toString());
        console.log(newdata);
        this.setState({ data: newdata });
        console.log('Length på state er: ', this.state.data.length);
        //TODO: Hardcodet for length of 5, needs to be updated for dynamic check of how many files are actualy fetched
        if (this.state.data.length === 5) {
          console.log('Has data', this.state.data);
          const responseJson = sendData(this.state.data);
          if (responseJson.status === 200) {
            console.log('RESPONSE JSON', responseJson);
          }
        }
        this.changeView('Home');
      }
    });
    this.reject = NativeBridge.getNativeBridge().addListener(Events.USER_AUTH_REJECT, () => {
      this.changeView('Home');
    });
  }
  render() {
    return createElement(
      View,
      { style: [Styles.centered, Styles.fill] },
      createElement(Image, {
        source: require('../../assets/images/digime-app-icon-256.png'),
      }),
      createElement(Text, { style: Styles.h1 }, 'Digi.me Consent Access'),
      createElement(
        Text,
        { style: Styles.text },
        'Thank you for Signing Up. In order to utilize Feelios full potential, you need to use Digi.me. If you dont have Digi.me installed, click Start, and you will be directed to PlayStore. We need your consent to import your private data via Digi.me.'
      ),
      createElement(Button, {
        title: 'Start',
        onPress: () => {
          NativeBridge.getNativeBridge().initSDK();
        },
      })
    );
  }
  changeView(view) {
    this.accept.remove();
    this.reject.remove();
    this.props.navigation.navigate(view);
  }
}

const Styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  fill: {
    flex: 1,
  },
  h1: {
    fontSize: 30,
    justifyContent: 'center',
    margin: 10,
    color: 'white',
  },
  h2: {
    fontSize: 20,
    margin: 10,
  },
  lightgrey: {
    backgroundColor: '#fcfcfc',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    color: 'white',
  },
});
