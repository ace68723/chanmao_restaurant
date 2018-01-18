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

export default class HistoryPage extends Component {

    render() {
        return (
            <ScrollableTabView
              initialPage={0}
              style={styles.container}
              renderTabBar={() => <TabBar />}
              tabBarTextStyle = {{fontSize: 20, fontWeight: 'bold'}}
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}>
              <OrderHistory  tabLabel='Order History'/>
              <PaymentHistory   tabLabel='Payment History'/>
            </ScrollableTabView>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
