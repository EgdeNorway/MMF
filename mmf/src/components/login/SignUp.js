/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'native-base';
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  state = { name: '', email: '', password: '', errorMessage: null };
  //Firebase handles signup of email/password. Name is not used, just a gimmick for now
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('LoggedIn'))
      .catch(error => this.setState({ errorMessage: error.errorMessage }));
    console.log('handleSignUp');
  };

  /**
   * Validating email and passord.
   * Checks if email is correctly written.
   * Checks if password contains at least 8 characters, and 1 number,
   * both large and small letters.
   */
  CheckTextInput = () => {
    var emailVal = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var passVal = /^(?=.*\d)(?=.*[a-å])(?=.*[A-Å])[0-9a-åA-Å]{8,}$/;
    if (this.state.name != '') {
      if (emailVal.test(this.state.email)) {
        if (passVal.test(this.state.password)) {
          Alert.alert('Registration Completed!', 'Welcome to Feelio', [
            { text: 'OK', onPress: () => this.handleSignUp() },
          ]);
        } else {
          Alert.alert(
            'Your password needs to:',
            '\u2022 be at least 8 character long.\n\u2022 include both lower- and uppercase characters\n\u2022 include at least one digit'
          );
        }
      } else {
        Alert.alert('Invalid email', 'Please enter a valid email address');
      }
    } else {
      Alert.alert('Name field empty', 'Please Enter your name');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: '#FF3D3D', fontFamily: 'LemonMilk' }}>Sign Up</Text>
        {this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}

        <View style={styles.iconInput}>
          <Icon name="person" style={styles.icon} />
          <TextInput
            underlineColorAndroid="transparent"
            marginLeft={18}
            placeholder="Full name"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.iconInput}>
          <Icon name="mail" style={styles.icon} />
          <TextInput
            underlineColorAndroid="transparent"
            marginLeft={13}
            placeholder="E-mail"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.iconInput}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry
            marginLeft={21}
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.CheckTextInput}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.textLink} onPress={() => this.props.navigation.navigate('Login')}>
              Already have an account? Login
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
  icon: {
    color: '#272B2C',
    fontSize: 35,
    paddingLeft: 15,
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

  textLink: {
    textDecorationLine: 'underline',
    color: '#fff',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

/**
<View style={styles.buttonContainer2}>
<GoogleSigninButton
style={{ width: 260, height: 48 }}
size={GoogleSigninButton.Size.Wide}
color={GoogleSigninButton.Color.Dark}
onPress={() => {
  this._signIn();
}}
/>
</View>



  textInput2: {
    height: 45,
    width: 300,
    borderRadius: 20,
    margin: 10,
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


  Don't have an account? Sign Up
*/
