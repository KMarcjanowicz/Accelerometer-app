import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class AccelerometerSensor extends React.Component {

  state = {
    accelerometerData: {},
    fontloaded: false,
    acc: false,
    send: false
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      'myfont': require('./Roboto-Thin.ttf'),
    });
    this.setState({ fontloaded: true })
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
      this.setState({ acc: !this.state.acc });
    } else {
      this._subscribe();
      this.setState({ acc: !this.state.acc });
    }
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  _data = () => {
    sendToAll = (data) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;
    if (this.state.fontloaded) {
      return (
        <View style={styles.container}>
          <View style={styles.sensor}>
            <Text style={styles.font}>Accelerometer:</Text>
            <Text style={styles.font}>x: {round(x)}</Text>
            <Text style={styles.font}>y: {round(y)}</Text>
            <Text style={styles.font}>z: {round(z)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._toggle} style={styles.button}>
              <Text style={styles.font2}>Accelerometer: {this.state.acc ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._data} style={styles.button}>
              <Text style={styles.font2}>Sending data: {this.state.send ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <Text>Accelerometer</Text>
      );
    }
  }
}

const WebSocket = require('ws');

const ws = new WebSocket('ws://192.168.1.106:1337');

//wysłanie danych na serwer przy podłączeniu klienta do serwera

ws.onopen = () => {
  ws.send(this.state.accelerometerData);
}

//odebranie danych z serwera i reakcja na nie po sekundzie

ws.onmessage = (e) => {
  console.log(e.data);
  setTimeout(function () {
    ws.send("timestamp z klienta: " + Date.now());
  }, 1000);
}

ws.onerror = (e) => {
  console.log(e.message);
};

ws.onclose = (e) => {
  console.log(e.code, e.reason);
};


function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'myfont',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#DECBB7',
    padding: 20,
    //height: 300,
    width: 500,
    borderRadius: 30,
  },
  sensor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'myfont',
    backgroundColor: '#5C5552'
  },
  font: {
    fontFamily: 'myfont',
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
  },
  font2: {
    fontFamily: 'myfont',
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
  }
});