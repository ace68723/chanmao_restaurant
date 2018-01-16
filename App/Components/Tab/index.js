/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
// var CustomTabBar = require('./CustomTabBar');
// import OrderHistory from '../OrderHistory/index';
// import PaymentHistory from '../PaymentHistory/index';
export default class Tab extends Component {
    render() {
        return (
            <ScrollableTabView
            tabBarPosition = "bottom"
            initialPage={1}
            style={{marginTop: 20, }}
            renderTabBar={() => <CustomTabBar someProp={'here'} />
            }>
             <OrderHistory tabLabel='Order History'>
                <Image source={require('./Image/print.png')} style={{
                               width:Settings.getX(42),
                               height:Settings.getY(42),
                               marginBottom:Settings.getY(5),
                              }}
              />
              </OrderHistory>
                <PaymentHistory tabLabel='Payment History'>Payment History</PaymentHistory>
                <OrderHistory tabLabel='Order History'>Order History</OrderHistory>
                <PaymentHistory tabLabel='Payment History'>Payment History</PaymentHistory>
            </ScrollableTabView>

        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
