/* @flow */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import Home from '../Home';
import CreateOrder from '../CreateOrder';
import HistoryPage from '../History';
import AboutUs from '../AboutUs';
import TabBar from './TabBar';

import Setting from '../../Config/Setting';

export default class Tab extends Component {
    render() {
        return (
            <ScrollableTabView
              tabBarPosition = "bottom"
              initialPage={0}
              style={{flex:1, }}
              renderTabBar={() => <TabBar />}
              tabBarActiveTextColor="#EA7B21"
              tabBarUnderlineStyle = {{backgroundColor:"#EA7B21"}}
            >
              <Home tabLabel="home"
                    activeIconImage={require("./Image/homeorange.png")}
                    inactiveIconImage={require("./Image/homegrey.png")}
                    navigator={this.props.navigator}/>
              <HistoryPage tabLabel="History"
                    activeIconImage={require("./Image/historyorange.png")}
                    inactiveIconImage={require("./Image/historygrey.png")}
                    navigator={this.props.navigator}/>
              <CreateOrder tabLabel="Create Order"
                    activeIconImage={require("./Image/neworange.png")}
                    inactiveIconImage={require("./Image/newgrey.png")}
                    navigator={this.props.navigator}/>
              <AboutUs
                    tabLabel="About"
                    activeIconImage={require("./Image/aboutorange.png")}
                    inactiveIconImage={require("./Image/aboutgrey.png")}
                    navigator={this.props.navigator}
                    />
            </ScrollableTabView>

        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
