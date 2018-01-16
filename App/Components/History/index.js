/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import OrderHistory from '../OrderHistory/index';
import PaymentHistory from '../PaymentHistory/index';
import Setting from '../../Config/Setting';
import TabBar from './TabBar';

export default class HistoryPage extends Component {
    render() {
        return (
          <View style={styles.container}>

            <View style={{
              backgroundColor:'white',
              width:Setting.getX(540),
              height:Setting.getY(76),
              justifyContent:'center',
              flex:0.075
            }}>
              <Text style={{
                color:'black',
                fontSize:22,
                marginLeft:Setting.getX(26),
              }}>
                History
              </Text>
            </View>
            <ScrollableTabView
              initialPage={0}
              tabBarActiveTextColor = "white"
              tabBarInactiveTextColor = "#6D6E71"
              style={{marginTop: 10,flex:0.925}}
              renderTabBar={() => <TabBar />}
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}
            >
            <OrderHistory tabLabel='Order History'><Text>Order History</Text>
            </OrderHistory>
            <PaymentHistory tabLabel='Payment History'><Text>Payment History</Text></PaymentHistory>
            
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

