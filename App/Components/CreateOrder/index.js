/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Setting from '../../Config/Setting.js'
import FormCell from './FormCell'
import AutoComplete from './AutoComplete.js'

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {address: '', city: '', postal: ''};
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    console.log(this.state);
  }
  handleChangeValue(key, value) {
    console.log(key, value.text.text);
    this.setState({[key]: value.text.text});
  }

  render() {
    return (
      <View style={styles.container}>
        <FormCell
          style={styles.cell}
          title='Address'
          isAddress='true'
          onChangeText={(text) => this.handleChangeValue('address', {text})}
        >
        </FormCell>
          <FormCell
            style={styles.cell}
            title='City'
            onChangeText={(text) => this.handleChangeValue('city', {text})}
          >
          </FormCell>
          <FormCell
            style={styles.cell}
            title='Postal'
            onChangeText={(text) => this.handleChangeValue('postal', {text})}>
          >
          </FormCell>

          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonTitle}>Next</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Setting.getY(10)
  },
  button:{
    marginTop: Setting.getY(116),
    height: Setting.getY(66),
    width: Setting.getX(214),
    backgroundColor: '#E2661A',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTitle:{
    color: '#ffffff',
    fontSize: 33,
    fontFamily: 'Noto Sans CJK SC(Regular)',
  },
  cell:{
    marginTop: Setting.getY(34),
  },
});
