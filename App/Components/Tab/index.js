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
import TabBar from './TabBar';

import Setting from '../../Config/Setting';

export default class Tab extends Component {
    render() {
        return (
            <ScrollableTabView
              tabBarPosition = "bottom"
              initialPage={0}
              style={{marginTop: 20, }}
              renderTabBar={() => <TabBar />}
              tabBarActiveTextColor="#EA7B21"
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}
            >
              <View tabLabel="home"
                    activeIconImage={require("./Image/homeorange.png")}
                    inactiveIconImage={require("./Image/homegrey.png")}>
              </View>
              <View tabLabel="History"
                    activeIconImage={require("./Image/historyorange.png")}
                    inactiveIconImage={require("./Image/historygrey.png")}>
              </View>
              <View tabLabel="Create Order"
                    activeIconImage={require("./Image/neworange.png")}
                    inactiveIconImage={require("./Image/newgrey.png")}>
              </View>
              <View tabLabel="About"
                    activeIconImage={require("./Image/aboutorange.png")}
                    inactiveIconImage={require("./Image/aboutgrey.png")}>
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
