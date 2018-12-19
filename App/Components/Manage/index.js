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
import Setting, { Settings } from '../../Config/Setting';
import LoginModule from '../../Module/Login/LoginModule';
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
    this.goToCategory = this.goToCategory.bind(this);
    this.goToClose = this.goToClose.bind(this);
  }
  goToCategory(){
    this.setState({waiting:true});
    setTimeout(()=>this.setState({waiting:false}),500);
    this.props.navigator.push({
        screen: 'Category',
        navigatorStyle: {
          navBarHidden: true
        },
        passProps: {},
        animationType: 'fade'
      });
  }
  goToClose(){
    this.setState({waiting:true});
    setTimeout(()=>this.setState({waiting:false}),500);
    this.props.navigator.push({
        screen: 'Close',
        title:'Temporary Closure',
        navigatorStyle: {
          navBarHidden: false
        },
        passProps: {},
        animationType: 'fade'
      });
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
           Management
          </Text>
        </View>

        <View style={styles.chanmaoView}>
        <TouchableOpacity onPress={()=>this.goToCategory()}style = {{flex:1,backgroundColor:'#E3E3E3',marginRight:Setting.getX(13),alignItems:'center',justifyContent:'center',paddingVertical:Setting.getY(30)}}>
            <Image source={require('./Image/menu.png')} style={styles.QRCodeStyle}/>
            <Text style = {{marginTop:Settings.getY(15),fontWeight:'bold',fontSize: 16,fontFamily:'Noto Sans CJK SC',color:'black',}}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.goToClose()} style = {{flex:1,backgroundColor:'#E3E3E3',marginLeft:Setting.getX(13),alignItems:'center',justifyContent:'center',paddingVertical:Setting.getY(30)}}>
            <Image source={require('./Image/close.png')} style={styles.QRCodeStyle}/>
            <Text style = {{marginTop:Settings.getY(15),fontWeight:'bold',fontSize: 16,fontFamily:'Noto Sans CJK SC',color:'black',}}>Temporary Closure</Text>
        </TouchableOpacity>
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
    paddingLeft:Setting.getX(26),
    paddingRight:Setting.getX(26),
    paddingTop:Setting.getY(30),
    flexDirection:'row',

  },
  QRCodeStyle:{
    width:Setting.getX(98),
    height:Setting.getY(92),
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
