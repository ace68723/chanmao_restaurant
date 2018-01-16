/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Setting from '../../Config/Setting.js'
import FormCell from './FormCell.js'
import Alert from '../Alert'
import ESTFormCell from './ESTFormCell'
import CreateOrderModule from '../../Module/CreateOrder/CreateOrderModule';
export default class CreateOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address,
      preForm: {},
      dlexp: props.dlexp,
      lat: props.lat,
      lng: props.lng,
      postal: props.postal,
      unit: '',
      buzz: '',
      price: '',
      name: '',
      phone: '',
      est: '',
      selected: '',
      uid: '',
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onPress = this.onPress.bind(this);
    this._toggleAlert = this._toggleAlert.bind(this);
    this.onPressEST = this.onPressEST.bind(this);
  }

  handleChangeValue(key, value) {
    this.setState({[key]: value.text.text});
  }
  async onPress() {
    var addressSplit = this.state.address.split(',');
    const reqData = {
      token: '',
      rid: 5,
      lat : this.state.lat,
      lng : this.state.lng,
      address : this.state.address,
      postal : this.state.postal,
      apt_no : this.state.unit,
      buzz : this.state.buzz,
      city : addressSplit[1],
      dlexp : this.state.dlexp,
      comment : '',
      name : this.state.name,
      pretax : this.state.price,
      tel : this.state.phone,
      uid : this.state.uid,
    }
    
    console.log(reqData);
    const data  = await CreateOrderModule.createOrder(reqData);
    console.log(data);
  }
  onPressEST(value) {
    // console.log(value);
    const options = ['<10', '20', '30', '>40'];
    this.setState({['est']: options[Number.parseInt(value.value, 10)]});
    this.setState({['selected']: value.value});
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
          <View style={styles.infoText}>
            <Text style={styles.text}>Address: {this.state.address}</Text>
            <Text style={styles.text}>Delivery Fee: ${this.state.dlexp}</Text>
          </View>
          <FormCell
            style={styles.cell}
            title='Unit/Apt No'
            value={this.state.unit}
            onChangeText={(text) => this.handleChangeValue('unit', {text})}>
          </FormCell>
          <FormCell
            style={styles.cellReq}
            title='Buzz'
            value={this.state.buzz}
            onChangeText={(text) => this.handleChangeValue('buzz', {text})}>
          </FormCell>
          <FormCell
            style={styles.cellReq}
            title='*Price(Plus Tax)'
            value={this.state.price}
            onChangeText={(text) => this.handleChangeValue('price', {text})}>
          </FormCell>
          <FormCell
            style={styles.cellReq}
            title='*Name'
            value={this.state.name}
            onChangeText={(text) => this.handleChangeValue('name', {text})}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='*Telephone'
            value={this.state.phone}
            onChangeText={(text) => this.handleChangeValue('phone', {text})}>
          </FormCell>

          <ESTFormCell
            style={styles.ESTcell}
            title='Estimate Time'
            onPress={(value) => this.onPressEST({value})}
            selected={this.state.selected}>
          </ESTFormCell>

          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.buttonTitle} onPress={this.onPress}>Place Order</Text>
          </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  button:{
    marginTop: Setting.getY(68),
    height: Setting.getY(66),
    width: Setting.getX(274),
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
    marginTop: Setting.getY(34)
  },
  cell:{
    marginTop: Setting.getY(34)
    },
  text: {
    marginLeft: Setting.getX(28),
    marginBottom: Setting.getY(30),
    fontSize: 24,
    fontFamily: 'Noto Sans CJK SC(Regular)',
  },
  infoText: {
    marginTop: Setting.getY(26),
    marginBottom: Setting.getY(16),
  }
});
