/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  //Firebase handles the login using the email/password combo
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('LoggedIn'))
      .catch(error => this.setState({ errorMessage: error.message }));
    console.log('handleLogin');
  };

  render() {
    //isEnabled sets opacity and clickability on login button
    const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;
    return (
      <View style={styles.container}>
        <Image
          style={{ alignSelf: 'center', marginBottom: 30 }}
          source={require('../../img/logo.png')}
        />
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
        <View style={styles.iconInput}>
          <Icon name="mail" style={styles.icon} />
          <TextInput
            underlineColorAndroid="transparent"
            marginLeft={3}
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="E-mail"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.iconInput}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry
            marginLeft={10}
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // Changes the color on the button and makes it clickable if email and password is filled.
              disabled={!isEnabled}
              style={[styles.button, { backgroundColor: isEnabled ? '#FF3D3D' : '#FF8B8B' }]}
              onPress={this.handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.textLink} onPress={() => this.props.navigation.navigate('SignUp')}>
              New to Feelio? Sign up here
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272B2C',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    color: 'black',
  },
  buttonContainer: {
    flex: 0,
    width: 280,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 45,
    width: 300,
    borderRadius: 20,
    margin: 10,
  },
  icon: {
    color: '#272B2C',
    fontSize: 35,
    paddingLeft: 15,
    paddingRight: 12,
  },
  button: {
    backgroundColor: '#FF3D3D',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 13,
    paddingBottom: 13,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B60404',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textLink: {
    textDecorationLine: 'underline',
    color: '#fff',
    marginTop: 10,
  },
});
