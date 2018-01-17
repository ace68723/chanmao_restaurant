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
    // renderTabBar={() => <TabBar />}
   
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
              renderTabBar={() => <TabBar />}
              tabBarTextStyle = {{fontSize: 20, fontWeight: 'bold'}}
              style={{marginTop: 10,flex:0.925,}}
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}
            >
            <OrderHistory  tabLabel='Order History'/>
            <PaymentHistory   tabLabel='Payment History'/>

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
