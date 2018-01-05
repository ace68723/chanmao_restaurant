/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Setting from '../../Config/Setting.js'

export default class Formcell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {id, title, value, isMandatory} = this.props;
    return (
      <View style={[this.props.style,styles.container ]}>
        <Text style={ styles.title }>{this.props.title}</Text>
        <TextInput
          underlineColorAndroid={"rgba(0,0,0,0)"}
          style={ styles.input }
          onChangeText={(text) => this.props.onChangeText({text})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    height:Setting.getY(60),
  },
  title:{
    color: '#6D6E71',
    fontSize: 24,
    textAlign: 'left',
    fontFamily: 'Noto Sans CJK SC(Regular)',
    marginLeft: Setting.getX(28),
    width: Setting.getX(152),
  },
  input:{
    textAlign: 'left',
    width: Setting.getX(340),
    height: Setting.getY(40),
    marginRight: Setting.getX(44),
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    // fontSize: 20,
    padding:1,
    paddingLeft:10,
  },
});
