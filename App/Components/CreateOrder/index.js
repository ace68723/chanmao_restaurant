/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import CreateOrderModule from '../../Module/CreateOrder/CreateOrderModule';
import Setting from '../../Config/Setting.js'
import FormCell from './FormCell'
import AutoComplete from './AutoComplete.js'

import Alert from '../Alert'

const GOOGLE_API_KEY = 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8';

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      postal: '',
      showAlert: false,
      coord: [],
      alert:{
        message: '',
        title: '',
        buttonTitle: '',
      }
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.onPressAlert = this.onPressAlert.bind(this);
    this._toggleAlert = this._toggleAlert.bind(this);
    this._getGeoPoint = this._getGeoPoint.bind(this);
    this._addressExtractor = this._addressExtractor.bind(this);
    this._goCreateOrder = this._goCreateOrder.bind(this);
  }
  onPressAlert() {
    this._toggleAlert();
  }

  _addressExtractor(data, key){
    const mapping = {'postal': "postal_code"};
    for(var i = 0; i < data.address_components.length; i++){
      if (data.address_components[i].types.includes(mapping[key])){
          return data.address_components[i].long_name;
      }
    }
  }
  async _goCreateOrder() {
    const {address,postal} = this.state;
    const lat = this.state.coord.lat;
    const lng = this.state.coord.lng;
    const data = await CreateOrderModule.areaCheck(lng,lat)
    console.log(data);
    if(data.result === 0) {
      const dlexp = data.dlexp;
      const area = data.area;
      console.log(dlexp);
      this.props.navigator.push({
        screen: 'CreateOrderDetail',
        title: 'Order Detail',
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {address,lat,lng,area,dlexp,postal},
        animationType: 'slide-down'
      });
    }
  }

  handleChangeValue(key, value) {
    // console.log(key, value.text.text);
    if (key == 'address'){
      this.setState({['address']: value.text.text.description});
      this._getGeoPoint();
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
    console.log(jsonResponse);
    this.state.coord = jsonResponse.results[0].geometry.location;
    this.state.postal = this._addressExtractor(jsonResponse.results[0], 'postal');
    console.log('final', this.state);
    this._goCreateOrder();
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

        <View style={{
          backgroundColor:'white',
          width:Setting.getX(540),
          height:Setting.getY(76),
          justifyContent:'center',
          borderBottomColor: '#EA7B21',
          borderBottomWidth: 1,
        }}>
          <Text style={{
            color:'black',
            fontSize:22,
            marginLeft:Setting.getX(26),
          }}>
            Create Order
          </Text>
        </View>

        <Modal
          onRequestClose={() => console.log('123')}
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
          keyExtractor={(item, index) => index}
          onChangeText={(text) => this.handleChangeValue('address', {text})}
          autoFocus={true}>
        </FormCell>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Setting.getY(0)
  },
  cell:{
    marginTop: Setting.getY(0),
  },
  ESTcell:{
    marginTop: Setting.getY(60),
  },

});
