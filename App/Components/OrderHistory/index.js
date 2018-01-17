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
import Loading from '../Loading';
import PaymentHistoryModule from '../../Module/PaymentHistory/PaymentHistoryModule';
import PrintModule from '../../Module/Print/PrintModule';
const {height, width} = Dimensions.get('window');

export default class OrderHistory extends Component {
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
       
      ],
      waiting: false,
      "page_num" :1,
      "page_size":50,
      token: '',
    }
    this.setDate = this.setDate.bind(this);
    this._printHistory = this._printHistory.bind(this);
  }
  componentDidMount() {
  }
  async getSummary(){
    try{
       const rid = 5;
       const token = '';
       const bill_start = this.state.startDate;
       const bill_end = this.state.endDate;
       this.refs.loading.startLoading();
       const data = await PaymentHistoryModule.getSummary(token,rid,bill_end,bill_start);
       console.log(data);
       this.setState({
         list: data
       })
       this.refs.loading.endLoading();

    }catch(error){
      console.log(error);
    }
  }
  _printHistory(){
  let data = {
    type:'history',
    restaurantName:'西北楼',
    restaurantAddress:'3212 Yonge Street',
    restaurantPhoneNumber: '647-684-6483',
    timeTerm: this.state.startDate + " ~ " + this.state.endDate,
    orderAmount:this.state.list.length.toString(),
    total:this.state.totalAmount.toString(),
    orderArray:this.state.list,

  }
  this.setState({waiting:true});
  PrintModule.printContent(data);
  setTimeout(()=>this.setState({waiting:false}),500);
}
  render(){
    return(
      <View style={styles.container}>
              <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {this.renderSelectDate()}
          {this.renderListFunction()}
          {this.renderDetialList()}
          <TouchableOpacity
            style={{
               position:'absolute',
               top: height*0.74,
               left: width*0.77,
               height: Settings.getX(84),
               width: Settings.getX(84),
               flex:0.5,
               borderColor: '#EA7B21',
               backgroundColor:'#EA7B21',
               borderWidth: 1,
               borderRadius: 8,
               alignItems:'center',
               justifyContent: 'center',
               opacity: 0.85
               }}
            onPress={()=>{this._printHistory()}}
            disabled={this.state.waiting}>
            <Image source={require('./Image/print.png')} style={{
              width:Settings.getX(42),
              height:Settings.getY(42),
              marginBottom:Settings.getY(5),
             }}
              />
            <Text style = {{color:'white',fontWeight:'bold'}}>
              Print
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  renderSelectDate(){
    return(
      <View style={styles.timeView} >

        <TouchableOpacity style={[{
           marginLeft: Settings.getX(30),
           marginRight: Settings.getX(10),
           paddingLeft:10},
           styles.timeSelectButton]}
           onPress={()=>this.openDatePicker('start','YYYY/MM/DD')}>
            <Text style={{
              fontSize:15,
               color:'#EA7B21',
               fontFamily:'Noto Sans CJK SC'
            }}>{this.state.startTitle}</Text>
            <Text style={{fontSize:12,
              color:'#6D6E71',
              fontFamily:'Noto Sans CJK SC',
              paddingLeft:Settings.getX(20)
          }}>{this.state.startDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{
          marginRight: Settings.getX(30),
          marginLeft: Settings.getX(10),
          paddingLeft:10},styles.timeSelectButton]}
                      onPress={()=>this.openDatePicker('end','YYYY/MM/DD')}>
            <Text style={{
              fontSize:15,
               color:'#EA7B21',
               fontFamily:'Noto Sans CJK SC'
            }}>{this.state.endTitle}</Text>
            <Text style={{fontSize:12,
              color:'#6D6E71',
              fontFamily:'Noto Sans CJK SC',
              paddingLeft:Settings.getX(20)
          }}>{this.state.endDate}</Text>
        </TouchableOpacity>

      </View>
    )
  }
  setDate(dateType,dateStr) {
    if(dateType == 'start'){
      this.setState({
        startDate: dateStr,
      })
      console.log(startDate)
    }else{
      this.setState({
        endDate: dateStr,
      })
      console.log(endDate)

    }
  }
  async openDatePicker(dateType, date){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(date)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        //return date = new Date(year,month, day).getTime() / 1000;
        month = month + 1;
        dateString = year + '/' + month + '/' + day;
        this.setDate(dateType,dateString)
      }
    } catch ({code, message}) {
      console.log(message)
    }

  }
  renderListFunction(){
    return(
      <View style={styles.listFunctionView}>
        <View style={{flex:0.7, paddingTop:Settings.getY(40),paddingLeft:Settings.getX(10)}}>
          <Text style={{fontSize:16, fontFamily: 'Noto Sans CJK SC', color:'black'}}>
            Order Amount：{this.state.list.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.searchButtonStyle}
        onPress={() => this.getSummary()}>
            <Image source={require('./Image/search.png')} style={{
              width:Settings.getX(26), height:Settings.getY(26)}} />
            <Text style={styles.searchButtonFont}>
              Search
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.3,paddingLeft:Settings.getX(2)}}>
          <Text style={styles.listTitleFont}>No.</Text>
        </View>
        <View style={{flex:0.5,paddingLeft:Settings.getX(35)}}>
          <Text style={styles.listTitleFont}>Time</Text>
        </View>
        <View style={{flex:0.2,paddingLeft:Settings.getX(50)}}>
          <Text style={styles.listTitleFont}>Price</Text>
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
          <View style={{flex:0.3, marginLeft:15}}>
            <Text style={styles.recordTitleFont}>{record.oid}</Text>
          </View>
          <View style={{flex:0.5,}}>
            <Text style={styles.recordTitleFont}>{record.date} {record.time}</Text>
          </View>
          <View style={{flex:0.2, marginRight:15}}>
            <Text style={styles.recordTitleFont}>{record.total}</Text>
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
    marginHorizontal: Settings.getX(33),
    paddingTop:Settings.getY(30),
    justifyContent:'center',
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
