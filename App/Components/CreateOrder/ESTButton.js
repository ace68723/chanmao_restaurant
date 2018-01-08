/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Setting from '../../Config/Setting.js'

export default class ESTButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.buttonTitle}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonTitle:{
    color: '#798BA5',
    fontSize: 20,
    alignSelf: 'center',
  },
  button:{
    borderWidth: 2,
    borderColor: '#798BA5',
    width: Setting.getX(102),
    height: Setting.getX(40),
    backgroundColor: 'white',
  },
  buttonTitleSelected:{
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  buttonSelected:{
    borderWidth: 2,
    borderColor: '#798BA5',
    width: Setting.getX(102),
    height: Setting.getX(40),
    backgroundColor: '#798BA5',
  }
});
