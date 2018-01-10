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

const GOOGLE_API_KEY = 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8';

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
      waiting: false,
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
    this._getGeoPoint = this._getGeoPoint.bind(this);
  }
  onPress() {
    this.setState({ waiting: true });
    //this._toggleAlert('NOTICE', 'hha312ew', 'ok');
    this._getGeoPoint();
    setTimeout(() => {
      this.setState({ waiting: false });
    }, 500);
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
    if (key == 'address'){
      console.log(value);
      this.setState({['address']: value.text.text.description});
      this.setState({['city']: value.text.text.terms[2].value});
      // this.setState({['postal']: value.text.text.terms[2].value});
      return;
    }
    this.setState({[key]: value.text.text});
  }

  async _getGeoPoint(){
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?key='
                 + GOOGLE_API_KEY
                 + '&address='
                 + this.state.address;
    const response = await fetch(url);
    const jsonResponse = await response.json();

    let coord = jsonResponse.results[0].geometry.location;
    console.log(coord);
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
            onChangeText={(text) => this.handleChangeValue('city', {text})}
            value={this.state.city}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='Postal'
            onChangeText={(text) => this.handleChangeValue('postal', {text})}
            value={this.state.postal}>>
          >
          </FormCell>
          <ESTFormCell
            style={styles.ESTcell}
            title='Estimate Time'
            onPress={(value) => this.onPressEST({value})}
            selected={this.state.selected}>
          </ESTFormCell>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPress}
            disabled={this.state.waiting}>
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
