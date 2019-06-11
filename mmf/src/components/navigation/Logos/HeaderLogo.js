import React from 'react';
import { Image, View } from 'react-native';

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../img/logo.png')} style={{ height: 33, width: 101 }} />
        </View>

        <View />
      </View>
    );
  }
}