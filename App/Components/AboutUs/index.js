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
export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {
      usPlaceholder:'User Name',
      username:'',
      pwPlaceholder:'Password',
      password:'',
      buttonText:'Log Out',
      waiting:false
    }
    this._logOut = this._logOut.bind(this);
  }
  _logOut(){
    this.setState({waiting:true});
    setTimeout(()=>this.setState({waiting:false}),500);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chanmaoView}>
          <Image source={require('./src/chanmaoqr.png')} style={styles.QRCodeStyle}/>
          <View style={{marginLeft:Setting.getX(20)}}>
            <Image source={require('./src/cmbottom.png')} style={styles.iconStyle}/>
            <Text style={[styles.cmInfoFont, {marginTop:Setting.getY(25)}]}>Tel: 647-515-6699</Text>
            <Text style={[styles.cmInfoFont, {marginTop:Setting.getY(25)}]}>Wechat: chanmaoweixin</Text>
          </View>
        </View>
        <View style={styles.rotatingView}>
          <Image source={require('./src/rotating.png')} style={styles.rotatingIconStyle}/>
          <View style={{marginLeft:Setting.getX(40)}}>
            <Text style={styles.rotatingInfoFont}>Business Collaboration</Text>
            <Text style={styles.rotatingInfoFont}>Inquire</Text>
            <Text style={[styles.cmInfoFont,{marginTop:Setting.getY(12)}]}>Tel: 647-123-4567</Text>
            <Text style={[styles.cmInfoFont,{marginTop:Setting.getY(14)}]}>Email: info@rotating.ca</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.buttonStyle}
                            activeOpacity={0.4}
                            onPress={()=>this._logOut()}
                            disabled={this.state.waiting}>
              <Text style={{fontSize:22, color:'white',fontFamily:'Noto Sans CJK SC'}}>{this.state.buttonText}</Text>
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
  chanmaoView:{
    flex:0.3,
    paddingLeft:Setting.getX(26),
    paddingTop:Setting.getY(30),
    flexDirection:'row',

  },
  QRCodeStyle:{
    width:Setting.getX(202),
    height:Setting.getY(208),
  },
  iconStyle:{
    width:Setting.getX(162),
    height:Setting.getY(76),
  },
  cmInfoFont:{
    fontSize: 16,
    fontFamily:'Noto Sans CJK SC',
    color:'black',
  },
  rotatingView:{
    flex:0.3,
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:'#D1D3D4',
    marginHorizontal: Setting.getX(26),
  },
  rotatingIconStyle:{
    width:Setting.getX(158),
    height:Setting.getY(158),
    marginLeft:Setting.getX(8)
  },
  rotatingInfoFont:{
    fontFamily:'Noto Sans CJK SC',
    fontWeight:'bold',
    color:'black',
    fontSize: 18,
  },
  buttonView:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonStyle:{
    height:Setting.getY(66),
    width:Setting.getX(274),
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
