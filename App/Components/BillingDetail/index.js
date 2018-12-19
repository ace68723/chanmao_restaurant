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
import LoginModule from '../../Module/Login/LoginModule';
export default class BillingDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      record: props.record,
      settle_type:props.settleType
    }
    this.pressGo = this.pressGo.bind(this);
  }
  pressGo() {
    console.log('her')
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
    this.props.pressProxy(this.state.record)
  }
  _renderHeader() {
    return(
      <View style={{
        backgroundColor:'white',
        flex:0.1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center',
      }}>
      <View style={{flex:0.5,marginLeft:30}}>
       <Text style={{
          color:'#EA7B21',
          fontSize:18,
        }}>
          No. {this.state.record.billing_id}
        </Text>
      </View>
      <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
       <Text style={{
          color:'black',
          fontSize:18,
        }}>
          {this.state.record.cycle}
        </Text>  
      </View>
      </View>
    )
   
  }
  _renderReport() {
     if(this.state.settle_type == "1") {
       return(
        <View style={{
          backgroundColor:'white',
          flex:0.1,
          borderBottomColor: '#f4f4f4',
          borderBottomWidth: 1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
        }}>
        <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
        <Text style={{
            color:'black',
            fontSize:18,
            fontWeight:'bold',
          }}>
            Payment
          </Text>
        </View>
        <View style={{flex:0.3,alignItems:'flex-start',marginLeft:30}}>
        <Text style={{
            color:'black',
            fontSize:18,
            fontWeight:'bold',
          }}>
            ${this.state.record.charge}
          </Text>
        </View>
        <TouchableOpacity style = {{flex:0.2}} onPress = {() => this.pressGo()}>
        <Text>Order Report</Text>
        </TouchableOpacity>
        </View>
       )
     } else if (this.state.settle_type == "2") {
      return(
        <View style={{
          backgroundColor:'white',
          flex:0.15,
          borderBottomColor: '#f4f4f4',
          borderBottomWidth: 1,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
        }}>
              <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
                <Text style={{
                  color:'black',
                  fontSize:18,
                  fontWeight:'bold',}}>
                    Remittance
                </Text>
              </View>
              <View style={{flex:0.3,alignItems:'flex-start',marginLeft:30}}>
        <Text style={{
            color:'black',
            fontSize:18,
            fontWeight:'bold',
          }}>
            ${this.state.record.bill}
          </Text>
        </View>
        <TouchableOpacity style = {{flex:0.2}} onPress = {() => this.pressGo()}>
        <Text>Order Report</Text>
        </TouchableOpacity>
        </View>
       )
     }
  }
  renderSales() {
    return(
      <View style={{
        backgroundColor:'white',
        flex:0.1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center',
      }}>
            <View style={{flex:0.5,marginLeft:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18,}}>
                    Sales
                </Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
                 <Text style={{
                      color:'black',
                      fontSize:18,}}>
                    ${this.state.record.total}
                 </Text>
            </View>
      </View>
    )
  }
  renderServiceFee() {
    return(
      <View style={{
        backgroundColor:'white',
        flex:0.1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center',
      }}>
            <View style={{flex:0.5,marginLeft:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18}}>
                    Contributuion Fee
                </Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18}}>
                    ${this.state.record.srvfee}
                </Text>
            </View>
      </View>
    )
  }
  renderPromotion() {
    return(
      <View style={{
        backgroundColor:'white',
        flex:0.1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center',
      }}>
            <View style={{flex:0.5,marginLeft:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18}}>
                    Promotion Costs
                </Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
            <Text style={{
                      color:'black',
                      fontSize:18}}>
                    ${this.state.record.promo}
                </Text>
            </View>
      </View>
    )
  }
  renderAdjustment() {
    if(!this.state.record.adjustment[0].adjust) {
      return
    } else {
      return this.state.record.adjustment.map((item,index)=>{
        return(
          <View key={index} style={{
            backgroundColor:'white',
            flex:0.05,
            flexDirection:'row',
            alignItems:'center',
          }}>
            <View style={{flex:0.5,marginLeft:50}}>
              <Text  style={styles.tpFont}>{item.adjust_note}</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
              <Text  style={styles.tpFont}>${item.adjust}</Text>
            </View>
          </View>
        )
      }
    )
    }
  }
  renderAdjust() {
    return(
      <View style={{
       backgroundColor:'white',
       flex:0.1,
       borderBottomColor: '#f4f4f4',
       borderBottomWidth: 1,
       flexDirection:'row',
       alignItems:'center',
      }}>
            <View style={{flex:0.5,marginLeft:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18}}>
                    Adjustment
                </Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
                <Text style={{
                      color:'black',
                      fontSize:18}}>
                    ${this.state.record.adjust_total}
                </Text>
            </View>
      </View>
    )
  }
  renderBalance() {
    return(
      <View style={{
       backgroundColor:'lightgrey',
       flex:0.15,
       borderBottomColor: '#f4f4f4',
       borderBottomWidth: 1,
       flexDirection:'row',
       alignItems:'center',
       marginTop:10
      }}>
            <View style={{flex:0.5,marginLeft:30}}>
                <Text style={{
                      color:'black',
                      fontWeight:'bold',
                      fontSize:20}}>
                    Balance
                </Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end',marginRight:30}}>
                <Text style={{
                      color:'black',
                      fontWeight:'bold',
                      fontSize:20}}>
                    ${this.state.record.total_balance}
                </Text>
            </View>
      </View>
    )
  }
  renderComment() {
    return(
      <View style={{
       flex:0.1,
       marginTop:10,
       marginHorizontal:30
      }}>
                <Text style={styles.tpFont}>
                    * The calculation displayed reflects the activity based on the date above.
                </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
         {this._renderHeader()}
         {this._renderReport()}
         {this.renderSales()}
         {this.renderServiceFee()}
         {this.renderPromotion()}
         {this.renderAdjust()}
         {this.renderAdjustment()}
         {this.renderBalance()}
         {this.renderComment()}
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
  },
  tpFont:{
    fontFamily:'Noto Sans CJK SC',
    fontSize:15,
    color:'grey'
  },
});
