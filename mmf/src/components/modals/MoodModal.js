import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  Alert,
  StyleSheet,
  Platform,
  TouchableHighlight
} from "react-native";
import { Icon, Item, Input } from "native-base";
import Reaction from "../cards/Reaction";
import DatePicker from "../cards/DatePicker";
import { Authentication } from "../utils/Auth";

class MoodModal extends Component {
  constructor(props) {
    super(props);
    // this.changeState = this.changeState.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.setState = this.setState.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.state = {
      modalVisible: false,
      modalMood: "Register mood and write a comment if you want to.",
      sliderValue: "15",
      colVal: "0",
      red: 255,
      green: 255,
      mood: {
        mood: "neutral",
        comment: "",
        timestamp: new Date()
      }
    };
  }
  s;

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setEmojiHue(sliderValue) {
    this.setState({ colVal: sliderValue * 100 });
  }
  updateDate(e) {
    switch (e) {
      case 0:
        this.setState({ mood: { ...this.state.mood, mood: "Terrible" } });
        break;

      case 64: {
        this.setState({ mood: { ...this.state.mood, mood: "Sad" } });
        break;
      }
      case 192: {
        this.setState({ mood: { ...this.state.mood, mood: "Happy" } });
        break;
      }
      case 256: {
        this.setState({ mood: { ...this.state.mood, mood: "Excellent" } });
        break;
      }
      default: {
        this.setState({ mood: { ...this.state.mood, mood: "Neutral" } });
      }
    }
  }
  setTime(time) {
    this.setState({ mood: { ...this.state.mood, timestamp: time } });
  }
  onChangeText(commentChange) {
    this.setState({
      mood: {
        ...this.state.mood,
        comment: commentChange
      }
    });
  }
  updateInfo(e) {
    let newDate = e.split(" ");
    const propTime = newDate[0] + "T" + newDate[1];
    console.log(propTime);
    this.setTime(propTime);
  }
  async sendData(data) {
    const token = await Authentication();
    try {
      const response = await fetch(
        "https://us-central1-mmfapp-3603c.cloudfunctions.net/registerMood",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data })
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (err) {
      console.error(err);
    }
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
              <Reaction getInput={this.updateDate} />
              <Text style={styles.TextStyle}> {this.state.modalMood} </Text>
              <DatePicker getInput={this.updateInfo} />
              <Item regular>
                <Input
                  style={styles.Input}
                  placeholder="Enter comment"
                  onChangeText={this.onChangeText}
                  // style={{ borderColor: 'white', borderWidth: 1, marginBottom: 15 }}
                />
              </Item>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <TouchableHighlight
                  style={styles.exitbutton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Icon name="close" style={{ color: "white" }} />
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.registerbutton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.sendData(this.state.mood);
                    Alert.alert("Woah! Your mood has been registered");
                  }}
                >
                  <Icon name="checkmark" style={{ color: "white" }} />
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
          <Icon name="add" style={{ color: "white" }} />
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

  ModalInsideView: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#272B2C",
    height: "90%",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa"
  },

  TextStyle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#FFFFFF",
    padding: 20,
    textAlign: "center"
  },
  Slider: {
    width: 200
  },
  BotButton: {
    justifyContent: "flex-end",
    padding: 15
  },
  IconStyle: {
    fontSize: 50,
    color: "red"
  },
  Input: {
    margin: 15,
    height: 40,
    borderColor: "#272B2C",
    borderWidth: 2,
    backgroundColor: "#272B2C"
  },
  entrybutton: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center",
    height: 50
  },
  registerbutton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  exitbutton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20
  }
});
export default MoodModal;
