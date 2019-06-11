/* eslint-disable no-undef */
//this is the Native bridge between mmf/android/app/src/main/java and JS, which is derived from Digi.me
import { NativeEventEmitter, NativeModules } from 'react-native';
export default class NativeBridge {
  static getNativeBridge() {
    if (!NativeBridge._instance) {
      return new NativeBridge();
    }
  }
  constructor() {
    this.eventEmitter = new NativeEventEmitter(this.getBridge());
  }
  getBridge() {
    return NativeModules.NativeBridge;
  }
  initSDK() {
    if ('initSDK' in this.getBridge()) {
      this.getBridge().initSDK();
    }
  }
  addListener(eventType, listener, context) {
    return this.eventEmitter.addListener(eventType, listener, context);
  }
}
