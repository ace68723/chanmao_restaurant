/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import OrderHistory from '../OrderHistory/index';
import PaymentHistory from '../PaymentHistory/index';
import Setting from '../../Config/Setting';

import TabBar from './TabBar';
export default class Tab extends Component {
    render() {
        return (
            <ScrollableTabView
              tabBarPosition = "bottom"
              initialPage={0}
              style={{marginTop: 20, }}
              renderTabBar={() => <TabBar />}
            >
              <View tabLabel="home">
              </View>
              <View tabLabel="History">
              </View>
              <View tabLabel="Create Order">
              </View>
              <View tabLabel="About">
              </View>
            </ScrollableTabView>

        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// <OrderHistory tabLabel='Order History'>
//    <Image source={require('./Image/print.png')} style={{
//                   width:Setting.getX(42),
//                   height:Setting.getY(42),
//                   marginBottom:Setting.getY(5),
//                  }}
//  />
//  </OrderHistory>
//    <PaymentHistory tabLabel='Payment History'>Payment History</PaymentHistory>
//    <OrderHistory tabLabel='Order History'>Order History</OrderHistory>
//    <PaymentHistory tabLabel='Payment History'>Payment History</PaymentHistory>
