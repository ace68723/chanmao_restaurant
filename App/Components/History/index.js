'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import OrderHistory from '../OrderHistory/index';
import PaymentHistory from '../PaymentHistory/index';
import Setting from '../../Config/Setting';
import TabBar from './TabBar';
import LoginModule from '../../Module/Login/LoginModule';
import Loading from '../Loading';
import PaymentHistoryModule from '../../Module/PaymentHistory/PaymentHistoryModule';
var today=new Date(Date.now()-24*60*60*1000);
export default class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      startDate:(today.getDate()) + "/" + (today.getMonth()+1) + "/" + today.getFullYear(),
      endDate:(today.getDate()+1) + "/" + (today.getMonth()+1) + "/" + today.getFullYear(),
    }
    this._goGetSummary = this._goGetSummary.bind(this);
    this.getSummary = this.getSummary.bind(this);
    this._logOut = this._logOut.bind(this);
  }
  

  componentDidMount() {
    console.log(this.state)
  }
  _goGetSummary(record) {
    console.log(record)
    this.getSummary(record)
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
  async getSummary(record){
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
    }, 300);//add loading if request more than 200ms
    try{ 
       const bill_start = record.bill_range_start;
       const bill_end = record.bill_range_end;
       const data = await PaymentHistoryModule.getSummary(bill_end,bill_start);
       this.setState({
        list: data,
        startDate:bill_start,
        endDate:bill_end,
      })
       clearTimeout(loadingTimeout);  
       this.refs.loading.endLoading();    
       this.refs.Tabs.goToPage(0);
       
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
      }
    }
  }
    render() {
        return (
          <View  style={styles.container}>
             <Loading ref="loading" size={60}/>
             <ScrollableTabView
              initialPage={0}
              ref="Tabs"
              renderTabBar={() => <TabBar />}
              tabBarTextStyle = {{fontSize: 20, fontWeight: 'bold'}}
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}>
              <OrderHistory 
                    onPressLogout = {() => this._logOut()} 
                    list = {this.state.list} 
                    startDate = {this.state.startDate} 
                    endDate = {this.state.endDate} 
                    tabLabel='Order History'/>
              <PaymentHistory 
                    onPress={(record) => this._goGetSummary(record)} 
                    onPressLogout = {() => this._logOut()}  
                    tabLabel='Payment History'/>
            </ScrollableTabView>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
