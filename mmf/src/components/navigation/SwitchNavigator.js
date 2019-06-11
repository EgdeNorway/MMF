import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import Loading from '../login/Loading';
import SignUp from '../login/SignUp';
import Login from '../login/Login';
import LoggedIn from '../startnavigators/StartNavigators';
// create our app's navigation stack

//config/credentials details between firebase and us. All information about connection is in console.firebase.google.com
const firebaseConfig = {
  apiKey: 'AIzaSyDlUBHxnKQ6MIsqe1hpqy7rUiFSzKgQtzw',
  authDomain: 'mmfapp-3603c.firebaseapp.com',
  databaseURL: 'https://mmfapp-3603c.firebaseio.com',
  projectId: 'mmfapp-3603c',
  storageBucket: 'mmfapp-3603c.appspot.com',
  //clientId: "269820171790-gaagseulf8jpkbmhctempudengot1uuf.apps.googleusercontent.com",
};
firebase.initializeApp(firebaseConfig);

//Navigator for the login flow.
const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    Login: Login,
    SignUp: SignUp,
    LoggedIn: LoggedIn,
  },
  {
    initialRouteName: 'Loading',
  }
);

export default createAppContainer(SwitchNavigator);
