import React from "react";
import getTheme from "../../native-base-theme/components";
import material from "../../native-base-theme/variables/material";
import { TextInput, View, Text, StyleSheet, TouchableHighlight, Alert } from "react-native";



export default class Support extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataSource:{},
      subject:"",
      content:"",
    }     
  }

   onChangeSubject(commentChange){
    this.setState({
        subject: commentChange
    });
  }

   onChangeContent(commentChange) {
    this.setState({
        content: commentChange
    });
  }  

  render() {
    async function sendData(data) {
      const token = await Authentication();
      try {
        const response = await fetch(
          "https://us-central1-mmfapp-3603c.cloudfunctions.net/registerFeedback",
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
        console.log("RESPONESJSON" + responseJson);
      } catch (err) {
        console.error(err);
      }
    }


    return (
      <View style={styles.container}>
        <View style={styles.fillerboxes} />
        <View style={{ flex: 12, flexDirection: "column" }}>
          <View style={styles.fillerboxes} />
          <View style={styles.content}>
            <View style={styles.textbox}>
              <View style={{flex: 1}}>
                <Text
                  style={{ textAlign: "center", fontSize: 24, color: "white" }}>
                How can we help?
                </Text>
                <Text style={{ color: "white" }}>
                  If there is any error or bugs with the application please fill
                  them out here. If you have any inquiries you can also send
                  them in below.
                </Text>
              </View>

              <View style={{flex: 3}}>
                <TextInput
                  style={styles.inputSubject}
                  underlineColorAndroid="transparent"
                  placeholder="Subject"
                  autoCapitalize="none"
                  multiline={false}
                  onChangeText={this.onChangeSubject}
                  //onChangeText = {}
                />

                <TextInput
                  style={styles.inputContent}
                  underlineColorAndroid="transparent"
                  placeholder="What is the problem? "
                  autoCapitalize="none"
                  multiline={true}
                  onChangeText = {this.onChangeContent}
                />
              </View>
              <View style={{flex: 1}}>

              <TouchableHighlight
                onPress={() => {
                  console.log(this.state.dataSource);
                  sendData(this.state.dataSource);
                  Alert.alert("Thank you for your comeback!");
                }}>
                <Text>Send</Text>
              </TouchableHighlight>
             </View>
            </View>
          </View>

          <View style={styles.fillerboxes} />
        </View>
        <View style={styles.fillerboxes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272B2C",
    flex: 1,
    flexDirection: "row"
  },
  content: {
    flex: 8
  },
  inputSubject: {
    height: 40,
    backgroundColor: "white",
    borderColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderRadius: 1
  },
  inputContent: {
    height: 160,
    textAlignVertical: "top",
    backgroundColor: "white",
    borderColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderRadius: 1
  },
  textbox: {
    flex: 1
  },
  fillerboxes: {
    flex: 1
  }
});
