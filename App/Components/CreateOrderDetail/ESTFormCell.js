/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Setting from '../../Config/Setting.js'

const wtf = '< ';
const wtf2 = '> ';

export default class Formcell extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    let {id, title, value, selected} = this.props;
    return (
      <View style={[this.props.style, styles.container ]}>
        <Text style={ styles.title }>{this.props.title}</Text>
          <View style={ styles.buttons }>
            {selected == '0' ? (
              <TouchableOpacity style={styles.buttonSelected} onPress={() => { this.props.onPress('0') }}>
                <Text style={styles.buttonTitleSelected}>{wtf}10</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => { this.props.onPress('0') }}>
                <Text style={styles.buttonTitle}>{wtf}10</Text>
              </TouchableOpacity>
            )}

            {selected == '1' ? (
              <TouchableOpacity style={styles.buttonSelected} onPress={() => { this.props.onPress('1') }} >
                <Text style={styles.buttonTitleSelected}>20</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => { this.props.onPress('1') }} >
                <Text style={styles.buttonTitle}>20</Text>
              </TouchableOpacity>
            )}
            {selected == '2' ? (
              <TouchableOpacity style={styles.buttonSelected} onPress={() => { this.props.onPress('2') }} >
                <Text style={styles.buttonTitleSelected}>30</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => { this.props.onPress('2') }} >
                <Text style={styles.buttonTitle}>30</Text>
              </TouchableOpacity>
            )}

            {selected == '3' ? (
              <TouchableOpacity style={styles.buttonSelected} onPress={() => { this.props.onPress('3') }} >
                <Text style={styles.buttonTitleSelected}>{wtf2}40</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => { this.props.onPress('3') }} >
                <Text style={styles.buttonTitle}>{wtf2}40</Text>
              </TouchableOpacity>
            )}


          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:Setting.getY(100),
  },
  title:{
    color: '#6D6E71',
    fontSize: 22,
    color:'black',
    textAlign: 'left',
    fontFamily: 'Noto Sans CJK SC(Regular)',
    marginLeft: Setting.getX(28),
    width: Setting.getX(250),
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
    height: Setting.getY(40),
    backgroundColor: 'white',
    marginRight: Setting.getX(24)
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
    marginRight: Setting.getX(24)
  },
  buttons:{
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Setting.getY(30),
    marginLeft: Setting.getX(28)
  }
});
