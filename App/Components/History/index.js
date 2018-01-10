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
export default class HistoryPage extends Component {
    render() {
        return (
            <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={1}
            >
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
