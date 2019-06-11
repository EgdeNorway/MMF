import React, { Component } from 'react';
import { Modal, View, Alert, StyleSheet, Platform, TouchableHighlight } from 'react-native';
import { Icon, Text } from 'native-base';
import MusicList from '../tables/MusicTable';

function getYesterdaysDate() {
  let date = new Date();

  let yesterday = new Date(date - 86400000);

  let year = yesterday.getFullYear();
  let month = yesterday.getMonth() + 1 + '';
  let day = yesterday.getDate() + '';

  if (month.length === 1) {
   month = '0' + month;
  } else {
    month = month;
  }

if (day.length === 1) {
  day = '0' + day;
} else {
  day = day;
}

return year + '-' + month + '-' + day;

}

class MusicModal extends Component {
  state = {
    modalVisible: false,
    modalMood: 'test',
    sliderValue: '15',
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.ModalInsideView}>
              <Text style={{ marginBottom: 10, marginTop: 10 }}> Select mood to see playlist</Text>

              <View style={styles.content}>
                <MusicList propdate={getYesterdaysDate()} />
              </View>
              <View style={styles.footer}>
                <TouchableHighlight
                  style={styles.exitbutton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon name="close" style={{ color: 'white' }} />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.entrybutton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon name="arrow-dropright" style={{ color: 'white' }} />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },
  content: {
    flex: 6,
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#272B2C',
  },
  ModalInsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C2224',
    height: '90%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  exitbutton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entrybutton: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    height: 50,
  },
});
export default MusicModal;
