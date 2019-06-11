import React, { Component } from "react";
import {
  Modal,
  View,
  Alert,
  StyleSheet,
  Platform,
  TouchableHighlight
} from "react-native";
import { Icon } from "native-base";
import MoodTable from "../tables/MoodTable";

class MoodModal extends Component {
  constructor(props){
    super(props);
  
    this.state = {
      modalVisible: false,
      modalMood: "test",
      sliderValue: "15"
    };
 

}
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
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.ModalInsideView}>
            <View style={styles.content}>
              <MoodTable propdate={this.props.dateprop}/>
            </View>
            <View style={styles.footer}>
              <TouchableHighlight
                style={styles.exitbutton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Icon name="close" style={{ color: "white" }} />
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
        <Icon name="arrow-dropright" style={{ color: "white" }} />
      </TouchableHighlight>
    </View>
  );
}
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0
  },
  footer: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  content: {
    flex: 6,
  },
  ModalInsideView: {
    justifyContent: 'flex-start',
    backgroundColor: '#272B2C',
    height: '90%',
    width: '90%',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#aaa',
  },

  TextStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
    padding: 20,
    textAlign: "center"
  },
  exitbutton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  entrybutton: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    height: 50
  }
});
export default MoodModal;
