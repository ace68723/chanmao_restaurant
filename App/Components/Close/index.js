/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import Settings from '../../Config/Setting';
import DatePicker from 'react-native-datepicker'
import CloseModule from '../../Module/Close/CloseModule';
const {height, width} = Dimensions.get('window');

export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {
      start_time:'',
      end_time:'',
      waiting:false,
      closeInfo:[]
    }
   this.getCloseInfo = this.getCloseInfo.bind(this);
   this.createRRClose = this.createRRClose.bind(this);
   this.renderRecords = this.renderRecords.bind(this);
   this.renderListTitle = this.renderListTitle.bind(this);
   this.renderDetialList = this.renderDetialList.bind(this);
   this.getDate = this.getDate.bind(this);
   this.closeForToday = this.closeForToday.bind(this);
   this.deleteClose = this.deleteClose.bind(this);
  }
  componentDidMount() {
     this.getCloseInfo();
  }
  getDate(){
    const Appendzero = (obj) =>
    {
        if(obj < 10) return "0" +""+ obj;
        else return obj;
    }
    let date = new Date();
    let todayStr = date.getFullYear()+ '-' + Appendzero(date.getMonth()+1) + '-' + Appendzero(date.getDate()) ;
    return todayStr;
  }
  async closeForToday() {
    let date = this.getDate();
    const start_time = date + ' ' + '00:00:00';
    const end_time = date + ' ' + '23:59:59';
    try {
      const data = await CloseModule.createRRClose(start_time, end_time);
      if(data.ev_error == 0) {
        this.getCloseInfo()
        Alert.alert(
          "Success",
          '今日关店成功',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
      }
 } catch (e) {
   console.log(e)
   Alert.alert(
    "Error",
    '关店失败',
    [
      {text: 'Ok'},
    ],
    { cancelable: false }
  )
 }
  }
  async getCloseInfo() {
    try {
         const data = await CloseModule.getRRClose();
         this.setState({
           closeInfo: data
         })
    } catch (e) {
      console.log(e)
    }
  }
  async createRRClose() {
    try {
         const data = await CloseModule.createRRClose(this.state.start_time, this.state.end_time);
         if(data.ev_error == 0) {
           this.getCloseInfo()
           Alert.alert(
            "Success",
            '添加关店成功',
            [
              {text: 'Ok'},
            ],
            { cancelable: false }
          )
         }
    } catch (e) {
      console.log(e)
      Alert.alert(
        "Error",
        '关店失败',
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      )
    }
  }
  async deleteClose(record) {
    try {
      const start_time = '2016-01-01 00:00:00';
      const end_time = '2016-01-02 00:00:00';
      const data = await CloseModule.updateRRClose(record.id,start_time,end_time);
      if(data.ev_error == 0) {
        this.getCloseInfo();
        Alert.alert(
          "Success",
          '删除成功',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
      }
    } catch (e) {
      console.log(e)
      Alert.alert(
        "Error",
        '删除失败',
        [
          {text: 'Ok'},
        ],
        { cancelable: false }
      )
    }
  }
  renderQuickClose() {
    return (
      <View style={styles.quickClose}>
      <TouchableOpacity disabled = {true} 
        style = {{alignItems:'center',
        justifyContent:'center'}}>
      <Text  style={styles.listTitleFont}>Click to CLOSE the restaurant for today.</Text>
      <Text  style={styles.listTitleFont}>Automatically REOPEN tomorrow</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style = {styles.quickCloseButton}
                        onPress = {() => this.closeForToday()}>
        <Text style={styles.listTitleFont}>Close for Today</Text>
      </TouchableOpacity>
     </View>
     
     
    )
  }
  renderClosePeriod() {
    return(
      <View style={styles.closePeriod}>
      <TouchableOpacity disabled = {true} 
        style = {{flex:1,alignItems:'center',
        justifyContent:'center'}}>
      <Text  style={styles.listTitleFont}>Close for a period</Text>
      </TouchableOpacity>
      <View style = {{flex:1,
            marginHorizontal: 10,
            padding:10,
            justifyContent:'center',
            flexDirection:'row'}}>
          <View style = {{flex:0.4,alignItems:'flex-start',justifyContent:'center'}}>
            <Text style = {styles.cmInfoFont}> Start Time</Text>
          </View>
          <View style = {{flex:0.6,alignItems:'center',justifyContent:'center'}}>
            <DatePicker
              style={{width: 200}}
              date={this.state.start_time}
              mode="datetime"
              androidMode='spinner'
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({start_time: date})}}
            />
          </View>
      </View>
      <View style = {{flex:1,
            marginHorizontal: 10,
            padding:10,
            justifyContent:'center',
            flexDirection:'row'}}>
          <View style = {{flex:0.4,alignItems:"flex-start",justifyContent:'center'}}>
            <Text style = {styles.cmInfoFont}> End Time</Text>
          </View>
          <View style = {{flex:0.6,alignItems:'center',justifyContent:'center'}}>
              <DatePicker
                style={{width: 200}}
                date={this.state.end_time}
                mode="datetime"
                androidMode='spinner'
                placeholder="select date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({end_time: date})}}
              />
          </View>
      </View>
     </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.4, alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Start</Text>
        </View>
        <View style={{flex:0.4,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>End</Text>
        </View>
        <View style={{flex:0.2,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Delete</Text>
        </View>
      </View>
      
    )
  }
  renderDetialList(){
    return(
      <View style={styles.listDetailView}>
        {this.renderListTitle()}
        <View style={{flex:0.9}}>
          <ScrollView style={{
                    flex:0.9,
                    height:400,
                    width: width,
                    paddingHorizontal:Settings.getX(12)
                    }}>
            {this.renderRecords()}
          </ScrollView>
        </View>
      </View>
    )
  }
  renderRecords(){
    let orders;
    orders=this.state.closeInfo;
    return orders.map((record, index)=>{
      return(
        <View style={styles.recordView}
                key={index}>
          <View style={{flex:0.4}}>
            <Text style={styles.recordTitleFont}>{record.start_time}</Text>
          </View>
          <View style={{flex:0.4,}}>
            <Text style={styles.recordTitleFont}>{record.end_time}</Text>
          </View>
          <TouchableOpacity style = {{flex:0.2}} onPress = {() => this.deleteClose(record)}>
                  <Image
                      style={styles.button}
                      source={require('./src/icon-delete.png')}
                  />
          </TouchableOpacity>
        </View>
      )
    })
  }
  render(){
    return (
      <View style={styles.container}>
       {this.renderQuickClose()}
       <View style={{
            borderBottomColor: '#EA7B21',
            borderBottomWidth: 1,
            marginHorizontal:10,
          }}
        />
        {this.renderClosePeriod()}
        <TouchableOpacity   onPress={() => this.createRRClose()}  style={styles.confirmButtonStyle} activeOpacity={0.4}>
                  <Text style={styles.listTitleFont}>Add</Text>
        </TouchableOpacity>
        <View style={{
            borderBottomColor: '#EA7B21',
            borderBottomWidth: 1,
            marginHorizontal:10,
          }}
        />
        {this.renderDetialList()}
      </View>
     
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chanmaoView:{
    flex:0.3,
    paddingLeft:Settings.getX(26),
    paddingTop:Settings.getY(30),
    flexDirection:'row',

  },
  QRCodeStyle:{
    width:Settings.getX(202),
    height:Settings.getY(208),
  },
  iconStyle:{
    width:Settings.getX(162),
    height:Settings.getY(76),
  },
  cmInfoFont:{
    fontSize: 18,
    fontFamily:'Noto Sans CJK SC',
    color:'black',
    fontWeight:'bold',
    alignItems:'center',
    justifyContent:'center',
  },
  cmFont:{
    fontSize: 18,
    fontFamily:'Noto Sans CJK SC',
    color:'black',
    fontWeight:'bold',
    alignSelf:'center',
    justifyContent:'center',
  },
  rotatingView:{
    flex:0.3,
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:'#D1D3D4',
    marginHorizontal: Settings.getX(26),
  },
  rotatingIconStyle:{
    width:Settings.getX(158),
    height:Settings.getY(158),
    marginLeft:Settings.getX(8)
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
    height:Settings.getY(66),
    width:Settings.getX(274),
    backgroundColor:'#EA7B21',
    alignItems:'center',
    justifyContent:'center',
  },
  copyrightView:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center'
  },
  confirmButtonStyle:{
    flex:0.08,
    width:Settings.getX(150),
    width:Settings.getX(120),
    marginTop:15,
    backgroundColor:'#EA7B21',
    alignSelf:'center',
    justifyContent:'center',
    marginBottom:15
  },
  quickCloseButton:{
      marginHorizontal:10,
      backgroundColor:'#EA7B21',
      alignItems:'center',
      justifyContent:'center',
      padding:10,
      marginBottom:15,
      marginTop:15
  },
  listTitles:{
    flexDirection:'row',
    flex:0.1,
    marginHorizontal: Settings.getX(33),
    paddingTop:Settings.getY(30),
  },
  quickClose:{
    flex:0.2,
    marginBottom:15,
    marginTop:15,
    marginHorizontal: Settings.getX(33),
    paddingTop:Settings.getY(30),
    justifyContent:'center',
  },
  closePeriod:{
    flex:0.3,
    marginHorizontal: Settings.getX(33),
    marginTop:Settings.getY(15),
    justifyContent:'center',
  },
  button: {
    width:Settings.getX(22),
    height:Settings.getY(28),
  },
  recordView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    borderBottomWidth:1,
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
  recordTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    color:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  listDetailView:{
    flex:0.5,
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'black',
    alignSelf:'center',
    justifyContent:'center',
  },
  recordView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    borderBottomWidth:1,
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
});
