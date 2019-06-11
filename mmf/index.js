/* eslint-disable no-undef */
/* eslint-disable no-console */
import { NativeModules, NativeEventEmitter, AppRegistry } from 'react-native';
import Events from './src/components/events/Events';
import App from './src/components/startnavigators/StartSwitchNavigator';
//import App from './src/components/support/Support';
import { name as appName } from './app.json';

const { NativeBridge } = NativeModules;
const emitter = new NativeEventEmitter(NativeBridge);
const logEvent = event => {
  console.log(`event: ${event}`);
};
const init = () => {
  emitter.addListener(Events.FILE_DATA, data => logEvent(Events.FILE_DATA));
  emitter.addListener(Events.USER_AUTH_ACCEPT, () => logEvent(Events.USER_AUTH_ACCEPT));
  emitter.addListener(Events.USER_AUTH_REJECT, () => logEvent(Events.USER_AUTH_ACCEPT));

  AppRegistry.registerComponent(appName, () => App);
};
init();

console.disableYellowBox = true;
