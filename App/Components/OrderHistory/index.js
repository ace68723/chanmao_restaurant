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
  constructor(props){
    super(props);
    this.state={
      totalAmount: 0,
      printButtonName:'Print',
      startTitle:'Start',
      endTitle:'End',
      startDate:props.startDate,
      endDate:props.endDate,
      list: props.list,
      waiting: false,
      page_num :1,
      page_size:50,
      token: '',
    }
    this.setDate = this.setDate.bind(this);
    this._printHistory = this._printHistory.bind(this);
    this._logOut = this._logOut.bind(this);
    this._convertTime = this._convertTime.bind(this);
  }

  componentDidMount() {
    this.getSummary();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({
        list: nextProps.list,
        startDate: nextProps.startDate,
        endDate: nextProps.endDate
       });
    }
  }
  _logOut(){
    this.props.onPressLogout()
    }
    _convertTime(date) {
      date=date.split("-");
      var newDate=date[0]+"/"+date[1]+"/"+date[2];
      return new Date(newDate).getTime()
    }
  async getSummary(){
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
     }, 300);//add loading if request more than 200ms
    try{
      this.setState({waiting:true});
      setTimeout(()=>this.setState({waiting:false}),500);
       const bill_start = this.state.startDate;
       const bill_end = this.state.endDate;

       const data = await PaymentHistoryModule.getSummary(bill_end,bill_start);
       console.log(data);
       if(data.orders.length == 0) {
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
        Alert.alert(
          "ERROR",
          '所选日期内没有任何记录',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
       } else {
        this.setState({
          list: data.orders,
          restaurantName:data.restaurant_name,
          restaurantAddress:data.restaurant_address,
          restaurantPhoneNumber:data.restaurant_cel,
          totalAmount:data.summary_total.toFixed(2),
        })
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
       }
    }catch(error){
      console.log(error)
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();
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
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
        return
      }

    }
  }
  _printHistory(){
    let order;
    let total = 0;
    if (this.state.list.orders) {order=this.state.list.orders} else {order=this.state.list}
    order.forEach(item => {
      total = total + parseFloat(item.total);
      item.oid = item.order_id.toString();
      item.dltype = item.deliver_type;
      item.date = item.created;
      item.total = item.total.toFixed(2).toString();
   });
  let data = {
    type:'history',
    restaurantName:this.state.restaurantName,
    restaurantAddress:this.state.restaurantAddress,
    restaurantPhoneNumber: this.state.restaurantPhoneNumber,
    timeTerm: this.state.startDate + " ~ " + this.state.endDate,
    orderAmount:order.length.toString(),
    total:total.toFixed(2).toString(),
    orderArray:order,
  }
  console.log(data);
  PrintModule.printContent(data);
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
               top: height*0.67,
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

        <TouchableOpacity style={{
           flex:0.5,
           justifyContent:'center'}}
           onPress={()=>this.openDatePicker('start','YYYY/MM/DD')}>
           <View style = {[{
           marginLeft: Settings.getX(30),
           marginRight: Settings.getX(10)},
           styles.timeSelectButton]} >
              <Text style={{
                  fontSize:15,
                  color:'#EA7B21',
                  paddingLeft:10,
                  fontFamily:'Noto Sans CJK SC'
                }}>{this.state.startTitle}</Text>
                <Text style={{fontSize:12,
                  color:'#6D6E71',
                  fontFamily:'Noto Sans CJK SC',
                  paddingLeft:Settings.getX(20)
              }}>{this.state.startDate}</Text>
           </View>

        </TouchableOpacity>
        <TouchableOpacity style={{
          flex:0.5,
          justifyContent:'center'}}
          onPress={()=>this.openDatePicker('end','YYYY/MM/DD')}
        >
         <View style = {[{
           marginRight: Settings.getX(30),
           marginLeft: Settings.getX(10),},
           styles.timeSelectButton]} >
        <Text style={{
              fontSize:15,
               color:'#EA7B21',
               paddingLeft:10,
               fontFamily:'Noto Sans CJK SC'
            }}>{this.state.endTitle}</Text>
            <Text style={{fontSize:12,
              color:'#6D6E71',
              fontFamily:'Noto Sans CJK SC',
              paddingLeft:Settings.getX(20)
          }}>{this.state.endDate}</Text>
        </View>

        </TouchableOpacity>

      </View>
    )
  }
  setDate(dateType,dateStr) {
    if(dateType == 'start'){
      this.setState({
        startDate: dateStr,
      })
    }else{
      this.setState({
        endDate: dateStr,
      })

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
        <TouchableOpacity
            style={styles.searchButtonStyle}
            onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
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
        <View style={{flex:0.25,paddingLeft:Settings.getX(2)}}>
          <Text style={styles.listTitleFont}>No.</Text>
        </View>
        <View style={{flex:0.45,paddingLeft:Settings.getX(35)}}>
          <Text style={styles.listTitleFont}>Time</Text>
        </View>
        <View style={{flex:0.3,paddingLeft:Settings.getX(50)}}>
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
    let orders;
    if (this.state.list.orders) {orders=this.state.list.orders;} else {orders=this.state.list}
    return orders.map((record, index)=>{
      return(
        <View style={styles.recordView}
                key={index}>
          <View style={{flex:0.25, marginLeft:15}}>
            <Text style={styles.recordTitleFont}>{record.order_id}</Text>
          </View>
          <View style={{flex:0.45,}}>
            <Text style={styles.recordTitleFont}>{record.created}</Text>
          </View>
          <View style={{flex:0.3, marginRight:15}}>
            <Text style={styles.recordTitleFont}>{(record.total).toFixed(2)}({record.promo})</Text>
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
    height: '65%',
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
