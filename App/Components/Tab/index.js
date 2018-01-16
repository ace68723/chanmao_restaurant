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
import AboutUs from '../AboutUs';
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
              <Home tabLabel="home"
                    activeIconImage={require("./Image/homeorange.png")}
                    inactiveIconImage={require("./Image/homegrey.png")}/>
              <View tabLabel="History"
                    activeIconImage={require("./Image/historyorange.png")}
                    inactiveIconImage={require("./Image/historygrey.png")}>
              </View>
              <CreateOrder tabLabel="Create Order"
                    activeIconImage={require("./Image/neworange.png")}
                    inactiveIconImage={require("./Image/newgrey.png")}/>
              <AboutUs tabLabel="About"
                    activeIconImage={require("./Image/aboutorange.png")}
                    inactiveIconImage={require("./Image/aboutgrey.png")}/>
            </ScrollableTabView>

        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
