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
import Loading from '../Loading';

const GOOGLE_API_KEY = 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8';

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      postal: '',
      coord: []
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this._toggleAlert = this._toggleAlert.bind(this);
    this._getGeoPoint = this._getGeoPoint.bind(this);
    this._addressExtractor = this._addressExtractor.bind(this);
    this._goCreateOrder = this._goCreateOrder.bind(this);
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
    //this.refs.loading.startLoading();
    const {address,postal} = this.state;
    const lat = this.state.coord.lat;
    const lng = this.state.coord.lng;
    const data = await CreateOrderModule.areaCheck(lng,lat)
    //this.refs.loading.endLoading();
    console.log(data);
    if(data.result === 0) {
      const dlexp = data.dlexp;
      const area = data.area;
      console.log(dlexp);
      this.props.navigator.showModal({
        screen: 'CreateOrderDetail',
        navigatorStyle: {
          navBarHidden: true,
        },
        passProps: {address,lat,lng,area,dlexp,postal},
        animationType: 'screen'
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
    //this.refs.loading.startLoading();

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
    Alert.openAlert(title, message, buttonTitle, );
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{
          backgroundColor:'white',
          width:Setting.getX(540),
          justifyContent:'center',
          borderBottomColor: '#EA7B21',
          borderBottomWidth: 1,
          flex:0.075        }}>
          <Text style={{
            color:'black',
            fontSize:22,
            marginLeft:Setting.getX(26),
          }}>
            Create Order
          </Text>
        </View>

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
    justifyContent: 'flex-start'
  },
  cell:{
    flex:0.925,
    justifyContent: 'flex-end'
  },
  ESTcell:{
    marginTop: Setting.getY(60),
  },

});
