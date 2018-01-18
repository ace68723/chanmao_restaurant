'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import OrderHistory from '../OrderHistory/index';
import PaymentHistory from '../PaymentHistory/index';
import Setting from '../../Config/Setting';
import TabBar from './TabBar';
import Loading from '../Loading';
import PaymentHistoryModule from '../../Module/PaymentHistory/PaymentHistoryModule';

export default class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
    this._goGetSummary = this._goGetSummary.bind(this);
    this.getSummary = this.getSummary.bind(this);
  }
  

  componentDidMount() {
    
  }
  _goGetSummary(record) {
    console.log(record)
    this.getSummary(record)
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
        list: data
      })
       clearTimeout(loadingTimeout);  
       this.refs.loading.endLoading();    
       this.refs.Tabs.goToPage(0);
       
    }catch(error){
      console.log(error);
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();
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
              <OrderHistory list = {this.state.list}  tabLabel='Order History'/>
              <PaymentHistory onPress={(record) => this._goGetSummary(record)}   tabLabel='Payment History'/>
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
