/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Setting from '../../Config/Setting';
export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      usPlaceholder:'User Name',
      username:'',
      pwPlaceholder:'Password',
      password:'',
      buttonText:'GO',
      waiting: false,
    }
    this._setUsername = this._setUsername.bind(this);
    this._setPassword = this._setPassword.bind(this);
    this._submit = this._submit.bind(this);
  }
  _setUsername(username){
    this.setState({username});
  }
  _setPassword(password){
    this.setState({password});
  }
  _submit(){
    this.setState({waiting:true});

    setTimeout(()=>this.setState({waiting:false}),500);

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Image source={require('./src/cmbottom.png')} style={styles.iconStyle}/>
        </View>
        <View style={styles.infoView}>
          <TextInput style={[styles.textInputStyle,{borderBottomColor:'#EA7B21', borderBottomWidth:2}]}
              onChangeText={(username) => this._setUsername(username)}
              placeholder={this.state.usPlaceholder}
              underlineColorAndroid={'transparent'}>
          </TextInput>
          <TextInput style={styles.textInputStyle}
              onChangeText={(password)=> this._setPassword(password)}
              placeholder={this.state.pwPlaceholder}
              secureTextEntry={true}
              underlineColorAndroid={'transparent'}>
          </TextInput>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonStyle}
                            activeOpacity={0.4}
                            disabled={this.state.waiting}
                            onPress={()=>this._submit()}>
              <Text style={{fontSize:22, color:'white', fontFamily:'Noto Sans CJK SC'}}>{this.state.buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyrightView}>
          <Text style={styles.copyrightFont}>Chanmao Inc. 版权所有</Text>
          <Text style={styles.copyrightFont}>版本号 V1.0.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView:{
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  iconStyle:{
    width:Setting.getX(265),
    height:Setting.getY(122),
  },
  infoView:{
    flex:0.3,
    alignItems:'center',
    justifyContent:'center',
  },
  textInputStyle:{
    height:60,
    width:Setting.getX(274),
    fontSize:24,
    fontFamily:'Noto Sans CJK SC',
    textAlign: 'center',

  },
  buttonView:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonStyle:{
    height:Setting.getY(75),
    width:Setting.getX(250),
    backgroundColor:'#EA7B21',
    alignItems:'center',
    justifyContent:'center',
  },
  copyrightView:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center'
  },
  copyrightFont:{
    color:'#808285',
    fontSize:14
  }
});
