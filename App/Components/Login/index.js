/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';
import Loading from '../Loading';
import Setting from '../../Config/Setting';
import LoginModule from '../../Module/Login/LoginModule';
import { GetDeviceInfo } from '../../Module/Database';

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
      ver:''
    }
    this._setUsername = this._setUsername.bind(this);
    this._setPassword = this._setPassword.bind(this);
    this._submit = this._submit.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount(){
      this.auth();
      const {version} = GetDeviceInfo();
      this.setState({
        ver: version,
      })

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
  async auth(){
    try{
       const data = await LoginModule.auth();
       this.props.navigator.resetTo({
           screen: 'Tab',
           navigatorStyle: {
             navBarHidden: true
           },
           passProps: {},
           animationType: 'slide-down'
         });
      }catch(error){
        return
      }
  }
  async login(username, password){
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
    }, 300);//add loading if request more than 200ms
    try{
       const data = await LoginModule.login(username, password);
       clearTimeout(loadingTimeout);
       this.refs.loading.endLoading();
       this.props.navigator.resetTo({
           screen: 'Tab',
           navigatorStyle: {
             navBarHidden: true
           },
           passProps: {},
           animationType: 'slide-down'
         });
      }catch(error){
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
        if(error == 'LOGIN_FAIL') {
         console.log(error)
         Alert.alert(
           "ERROR",
           'Login failed. Please check your account information and try again',
           [
             {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
           ],
           { cancelable: false }
         )
        } else if (error == '用户名或密码错误'){
         Alert.alert(
           "ERROR",
           '用户名或密码错误',
           [
             {text: 'Ok', onPress:()=>this.refs.loading.endLoading()},
           ],
           { cancelable: false }
         )
        } else {
          return
        }
      }
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.iconView}>
          <Image source={require('./src/cmbottom.png')} style={styles.iconStyle}/>
        </View>
        <View style={styles.infoView}>
          <TextInput style={[styles.textInputStyle,{borderBottomColor:'#EA7B21', borderBottomWidth:2}]}
              onChangeText={(username) => this._setUsername(username)}
              value={this.state.username}
              placeholder={this.state.usPlaceholder}
              underlineColorAndroid={'transparent'}>
          </TextInput>
          <TextInput style={styles.textInputStyle}
              onChangeText={(password)=> this._setPassword(password)}
              placeholder={this.state.pwPlaceholder}
              secureTextEntry={true}
              value={this.state.password}
              underlineColorAndroid={'transparent'}>
          </TextInput>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonStyle}
                            activeOpacity={0.4}
                            disabled={this.state.waiting}
                            onPress={() => this.login(this.state.username, this.state.password)}>
              <Text style={{fontSize:22, color:'white', fontFamily:'Noto Sans CJK SC'}}>{this.state.buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyrightView}>
          <Text style={styles.copyrightFont}>Chanmao Inc. 版权所有</Text>
          <Text style={styles.copyrightFont}>版本号 V{this.state.ver}</Text>
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
    textAlign: 'left',

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
