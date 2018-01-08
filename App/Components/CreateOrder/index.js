/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

import Setting from '../../Config/Setting.js'
import FormCell from './FormCell'
import ESTFormCell from './ESTFormCell'
import AutoComplete from './AutoComplete.js'

import Alert from '../Alert'

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      postal: '',
      est: '',
      selected: '',
      showAlert: false,
      alert:{
        message: '',
        title: '',
        buttonTitle: '',
      }
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressEST = this.onPressEST.bind(this);
    this.onPressAlert = this.onPressAlert.bind(this);
    this._toggleAlert = this._toggleAlert.bind(this);
  }
  onPress() {
    // console.log(this.state);
    //this._toggleAlert('NOTICE', 'hha312ew', 'ok');
  }
  onPressAlert() {
    this._toggleAlert();
  }
  onPressEST(value) {
    // console.log(value);
    const options = ['<10', '20', '30', '>40'];
    this.setState({['est']: options[Number.parseInt(value.value, 10)]});
    this.setState({['selected']: value.value});
  }
  handleChangeValue(key, value) {
    // console.log(key, value.text.text);
    this.setState({[key]: value.text.text});
  }
  _toggleAlert(title, message, buttonTitle){
    if (this.state.showAlert == true){
      this.setState({['showAlert']: false});
    }
    else{
      this.setState({['showAlert']: true});
      this.state.alert.title = title;
      this.state.alert.message = message;
      this.state.alert.buttonTitle = title;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showAlert}>
            <Alert
              message={this.state.alert.message}
              title={this.state.alert.title}
              buttonTitle={this.state.alert.buttonTitle}
              onPressAlert={this.onPressAlert}>
            </Alert>
        </Modal>

        <FormCell
          style={styles.cell}
          title='Address'
          isAddress='true'
          onChangeText={(text) => this.handleChangeValue('address', {text})}>
        </FormCell>
          <FormCell
            style={styles.cell}
            title='City'
            onChangeText={(text) => this.handleChangeValue('city', {text})}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='Postal'
            onChangeText={(text) => this.handleChangeValue('postal', {text})}>
          >
          </FormCell>
          <ESTFormCell
            style={styles.ESTcell}
            title='Estimate Time'
            onPress={(value) => this.onPressEST({value})}
            selected={this.state.selected}>
          </ESTFormCell>
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
  ESTcell:{
    marginTop: Setting.getY(60),
  },

});
