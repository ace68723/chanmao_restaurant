import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  DatePickerAndroid,
  Alert,
  AsyncStorage
} from 'react-native';
import Settings from '../../Config/Setting';
import Setting from '../../Config/Setting';

const {height, width} = Dimensions.get('window');

export default class PaymentHistory extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(){
    super();
    this.state={
      totalAmount: 2008.1,
      printButtonName:'Print',
      startTitle:'Start',
      endTitle:'End',
      startDate:'YYYY/MM/DD',
      endDate:'YYYY/MM/DD',
      list: [
        {
         orderNumber: 3001223,
         startTime: '2017-11-15',
         endTime: '2017-11-15',
         price: 407.23,
        },
        {
         orderNumber: 3001223,
         startTime: '2017-11-15',
         endTime: '2017-11-15',
         price: 407.23,
        },
        {
         orderNumber: 3001223,
         startTime: '2017-11-15',
         endTime: '2017-11-15',
         price: 407.23,
        },
      ],
      waiting: false,
      "page_num" :1,
      "page_size":50,
      token: '',
    }
  }
  componentDidMount() {
  }
  
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.body}>
          {this.renderDetialList()}
        </View>
      </View>
    )
  }

  
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.25}}>
          <Text style={styles.listTitleFont}>Start</Text>
        </View>
        <View style={{flex:0.25,paddingLeft:Setting.getX(10)}}>
          <Text style={styles.listTitleFont}>End</Text>
        </View>
        <View style={{flex:0.2,paddingLeft: Settings.getX(20)}}>
          <Text style={styles.listTitleFont}>Total</Text>
        </View>
        <View style={{flex:0.3,paddingLeft:Settings.getX(15)}}>
          <Text style={styles.listTitleFont}>Service Fee</Text>
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
    return this.state.list.map((record, index)=>{
      return(
        <View style={styles.recordView}
                key={index}>
          <View style={{flex:0.25}}>
            <Text style={styles.recordTitleFont}>{record.startTime}</Text>
          </View>
          <View style={{flex:0.25}}>
            <Text style={styles.recordTitleFont}>{record.endTime}</Text>
          </View>
          <View style={{flex:0.2}}>
            <Text style={styles.recordTitleFont}>{record.price}</Text>
          </View>
          <View style={{flex:0.3}}>
            <Text style={styles.recordTitleFont}>{record.price}</Text>
          </View>
        </View>
      )
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    flex:1,
    width:width,
    backgroundColor:'white',
  },
  timeView:{
    flexDirection:'row',
    flex:0.1,
  },
  timeSelectButton:{
    flex:0.5,
    marginTop: Settings.getY(25),
    borderColor: '#EA7B21',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection:'row',
    alignItems:'center'
  },
  listFunctionView:{
    flexDirection:'row',
    marginHorizontal:Settings.getX(20),
    flex:0.1,
  },
  searchButtonStyle:{
    backgroundColor:'#EA7B21',
    flex:0.3,
    marginLeft:Settings.getY(30),
    marginRight: Settings.getY(12),
    marginTop:Settings.getY(20),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  searchButtonFont:{
    fontSize:15,
    paddingLeft: Settings.getX(20),
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  },
  listDetailView:{
    flex:0.8,
  },
  listTitles:{
    flexDirection:'row',
    flex:0.1,
    marginHorizontal: Settings.getX(30),
    paddingTop:Settings.getY(30),
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'black',
    justifyContent:'center',
  },
  recordView:{
    height:50,
    paddingHorizontal:Settings.getX(12),
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
  },
  printButtonView:{
    flex:0.1,
    justifyContent:'center',
  },
  printButtonStyle:{
    marginLeft:280,
    marginRight:20,
    backgroundColor:'white',
    width:60,
    flex:1,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  printButtonFont:{
    fontSize:15,
    color:'#EA7B21'
  }
});
