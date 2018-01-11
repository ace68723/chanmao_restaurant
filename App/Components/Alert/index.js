/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Setting from '../../Config/Setting.js'

export default class Alert extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={{height:Setting.getY(330),width:Setting.getX(400),backgroundColor:'white'}}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.message}>{this.props.message}</Text>
            <TouchableOpacity onPress={() => { this.props.onPressAlert() }} style={styles.button}>
              <Text style={styles.buttonTitle}>{this.props.buttonTitle}</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0, 0, 0, 0.3)'
  },
  title: {
    marginTop: Setting.getY(24),
    height: Setting.getY(78),
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  message: {
    marginLeft: Setting.getX(4),
    marginRight: Setting.getX(4),
    marginTop: Setting.getY(16),
    height: Setting.getY(162),
    textAlign:'center',
    fontSize: 24,
    justifyContent:'center',
    alignItems:'center',
  },
  button: {
    marginTop: Setting.getY(-24),
    width: Setting.getX(400),
    height: Setting.getY(78),
    backgroundColor: "#E2661A",
  },
  buttonTitle: {
    flex: 1,
    marginTop: Setting.getY(12),
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 26,
    color: 'white',
  },
});
