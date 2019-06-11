import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class datepicker extends Component {
  constructor(props) {
    super(props);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    this.state = {
      date: '',
      time: '16:20',
      //Setting the value of the date time
      // datetime: date + "-" + month + "-" + year + " " + hours + ":" + min,
      // datetime1: date + "-" + month + "-" + year + " " + hours + ":" + min
      datetime: year + '-' + month + '-' + date + ' ' + hours + ':' + min,
      datetime1: year + '-' + month + '-' + date + ' ' + hours + ':' + min,
    };
  }

  render() {
    console.log(this.state.datetime);
    return (
      <View style={styles.container}>
        <DatePicker
          style={styles.datePick}
          date={this.state.datetime1}
          mode="datetime"
          // format=""
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              color: 'white',
            },
            dateText: {
              color: 'white',
            },
          }}
          minuteInterval={10}
          onDateChange={datetime => {
            this.setState({ datetime1: datetime });
            this.props.getInput(datetime);
            // console.log(new Date(datetime))
          }}
        />
        <Text style={styles.instructions}> {/* Selected time: {this.state.datetime1} */}</Text>
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
    // color: "white"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 5,
  },
  datePick: {
    width: 200,
    backgroundColor: '#272B2C',
    color: 'white',
  },
});
