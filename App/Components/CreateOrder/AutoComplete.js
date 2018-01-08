/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Setting from '../../Config/Setting.js'

export default class AutoComplete extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data.description);
          this.props.onChangeText(data.description);
        }}
        query={{
          key: 'AIzaSyD27tcH34ui-lyuJaPSlmCPAB7Kokra9Aw',
          language: 'en', // language of the results
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0,
          },
          textInput: {
            textAlign: 'left',
            width: Setting.getX(340),
            height: Setting.getY(40),
            marginRight: Setting.getX(44),
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#6D6E71',
            marginLeft: 0,
            marginRight: Setting.getX(20),
            backgroundColor: 'rgba(0,0,0,0)'
          },
          listView: {
            top: Setting.getY(43),
            height: Setting.getY(340),
            width:  Setting.getX(340),
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: 99999
          }
        }}
        currentLocation={false}
      />
    );
  }
}
