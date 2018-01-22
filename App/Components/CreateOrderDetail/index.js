/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import LoginModule from '../../Module/Login/LoginModule';

import Setting from '../../Config/Setting.js'
import FormCell from './FormCell.js'
import ESTFormCell from './ESTFormCell'
import CreateOrderModule from '../../Module/CreateOrder/CreateOrderModule';
const {height, width} = Dimensions.get('window');

export default class CreateOrderDetail extends Component {
  static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor:"#EA7B21",
        navBarBackgroundColor:"D1D3D4",
        navBarButtonColor:"#EA7B21"
      }
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
      isAvoidingKeyboard: false,
    };
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.onPress = this.onPress.bind(this);
    this._toggleAlert = this._toggleAlert.bind(this);
    this.onPressEST = this.onPressEST.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this._logOut = this._logOut.bind(this);

    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);

  }

  handleChangeValue(key, value) {
    this.setState({[key]: value.text.text});
  }
  _logOut(){
    this.setState({waiting:true});
    setTimeout(()=>this.setState({waiting:false}),500);
    this.props.navigator.resetTo({
        screen: 'Login',
        navigatorStyle: {
          navBarHidden: true
        },
        passProps: {},
        animationType: 'fade'
      });
    LoginModule.logout();
    }
  async onPress() {
    try{
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
    }catch(error){
      if (error == '用户超时，请退出重新登陆') {
        Alert.alert(
          "ERROR",
          '用户超时，请退出重新登陆',
          [
            {text: 'Ok', onPress:()=>this._logOut()},
          ],
          { cancelable: false }
        )
      } else {
        Alert.alert(
          "ERROR",
          '参数不够, 请填满信息',
          [
            {text: 'Ok',},
          ],
          { cancelable: false }
        )
      }
   }

  }

  onPressEST(value) {
    // console.log(value);
    const options = ['<10', '20', '30', '>40'];
    this.setState({['est']: options[Number.parseInt(value.value, 10)]});
    this.setState({['selected']: value.value});
  }

  _toggleAlert(title, message, buttonTitle){
    Alert.openAlert(title, message, buttonTitle, );
  }

  onPressCancel(){
    this.props.navigator.dismissModal({
      navigatorStyle: {
        navBarHidden: true
      },
      animationType: 'screen'
    });
  }

  onFocusInput(){
    console.log(1);
  }
  onBlurInput(){
    console.log(2);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          backgroundColor:'white',
          flex:0.08,
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth:1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: '#EA7B21',
        }}>
            <TouchableOpacity
                  onPress={this.onPressCancel}
                  style={{
                    position:'absolute',
                    alignItems:'center',
                    justifyContent: 'center',
                    height: '100%',
                    left:0.05*width}}
            >
                  <Image style = {{
                        height:Setting.getY(34),
                        width:Setting.getY(24)}}
                        source={require('./Image/back.png')}
                  />
            </TouchableOpacity>
            <Text style={{
                  fontSize:20,
                  color:'#E2661A',
                  position:'absolute',
                  left:0.34*width}}>
              Order Detail
            </Text>
        </View>
        <KeyboardAvoidingView style={{flex:0.92}} keyboardVerticalOffset={90}>
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
            style={styles.cell}
            title='Buzz'
            value={this.state.buzz}
            onChangeText={(text) => this.handleChangeValue('buzz', {text})}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='*Price(Plus Tax)'
            value={this.state.price}
            isMandatory={true}
            onChangeText={(text) => this.handleChangeValue('price', {text})}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='*Name'
            isMandatory={true}
            value={this.state.name}
            onChangeText={(text) => this.handleChangeValue('name', {text})}>
          </FormCell>
          <FormCell
            style={styles.cell}
            title='*Telephone'
            isMandatory={true}
            value={this.state.phone}
            onFocus={this.onFocusInput()}
            onBlur={this.onBlurInput()}
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button:{
    marginTop: Setting.getY(68),
    height: Setting.getY(66),
    width: Setting.getX(274),
    backgroundColor: '#E2661A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ESTcell:{
    marginTop: Setting.getY(30),
  },
  buttonTitle:{
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Noto Sans CJK SC(Regular)',
  },
  cell:{
    marginTop: Setting.getY(14)
  },

  text: {
    marginLeft: Setting.getX(28),
    marginBottom: Setting.getY(15),
    fontSize: 19,
    fontFamily: 'Noto Sans CJK SC(Regular)',
  },
  infoText: {
    marginTop: Setting.getY(26),
  }
});
