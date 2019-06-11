/* eslint-disable no-undef */
//Digime check for android or ios
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
import { capitalize } from 'lodash';
import { Platform } from 'react-native';
export function getPlatformString() {
  return capitalize(Platform.OS);
}
export function isAndroid() {
  return Platform.OS === 'android';
}
//# sourceMappingURL=AppUtils.js.map
