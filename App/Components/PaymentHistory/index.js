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
import LoginModule from '../../Module/Login/LoginModule';

import Setting from '../../Config/Setting';
import Loading from '../Loading';
import PaymentHistoryModule from '../../Module/PaymentHistory/PaymentHistoryModule';
const {height, width} = Dimensions.get('window');

export default class PaymentHistory extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    this.state={
      totalAmount: 2008.1,
      printButtonName:'Print',
      startTitle:'Start',
      endTitle:'End',
      startDate:'YYYY/MM/DD',
      endDate:'YYYY/MM/DD',
      list: props.billing,
      waiting: false,
      "page_num" :1,
      "page_size":50,
      token: '',
    }
    this.goToBillingDetail = this.goToBillingDetail.bind(this);
    this.pressProxy = this.pressProxy.bind(this);
    this._logOut = this._logOut.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.billing !== this.props.billing) {
      this.setState({
        list: nextProps.billing,
       });
    }
  }

  goToBillingDetail(record) {
    this.props.navigator.push({
      screen: "BillingDetail",
      title:'Billing Report',
      passProps: {
        record,
        settleType: this.props.settleType,
        pressProxy: (record) => this.pressProxy(record),
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {
        navBarHidden: false
      },
      animationType: 'fade'
     });
  }
  _logOut(){
    this.props.onPressLogout()
    }
  pressProxy(record) {
      this.props.onPress(record)
  }
  async getBilling(){
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
    }, 300);//add loading if request more than 200ms
    try{
       const data = await PaymentHistoryModule.getBilling();
       console.log(data);
       clearTimeout(loadingTimeout);
       this.refs.loading.endLoading();
       this.setState({
         list: data
       })

    }catch(error){
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
      }
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {this.renderDetialList()}
        </View>
      </View>
    )
  }

  renderListTitle(){
      return(
        <View style={styles.listTitles}>
          <View style={{flex:0.15}}>
            <Text style={styles.listTitleFont}>No.</Text>
          </View>
          <View style={{flex:0.25}}>
            <Text style={styles.listTitleFont}>Cycle</Text>
          </View>
          <View style={{flex:0.2,paddingLeft:Setting.getX(20)}}>
            <Text style={styles.listTitleFont}>Sales</Text>
          </View>
          <View style={{flex:0.2,paddingLeft: Settings.getX(20)}}>
            <Text style={styles.listTitleFont}>Amount</Text>
          </View>
          <View style={{flex:0.2,paddingLeft:Settings.getX(15)}}>
            <Text style={styles.listTitleFont}>Balance</Text>
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
    if(this.props.settleType == "1") {
      return this.state.list.map((record, index)=>{
        return(
          <TouchableOpacity
                  style={styles.recordView}
                  key={index}
                  onPress={()=>this.goToBillingDetail(record)}
                  >
            <View style={{flex:0.15}}>
              <Text style={styles.recordTitleFont}>{record.billing_id}</Text>
            </View>
            <View style={{flex:0.3}}>
              <Text style={styles.recordTitleFont}>{record.cycle}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.total}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.charge}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.total_balance}</Text>
            </View>

          </TouchableOpacity>
        )
      })
    } else {
      return this.state.list.map((record, index)=>{
        return(
          <TouchableOpacity
                  style={styles.recordView}
                  key={index}
                  onPress={()=>this.goToBillingDetail(record)}
                  >
            <View style={{flex:0.15}}>
              <Text style={styles.recordTitleFont}>{record.billing_id}</Text>
            </View>
            <View style={{flex:0.3}}>
              <Text style={styles.recordTitleFont}>{record.cycle}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.total}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.bill}</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={styles.recordTitleFont}>{record.total_balance}</Text>
            </View>

          </TouchableOpacity>
        )
      })
    }

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
    flex:1,
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
