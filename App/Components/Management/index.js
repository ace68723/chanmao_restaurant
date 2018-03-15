'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dish from '../Dish/index';
import Category from '../Category/index';
import Submenu from '../Submenu/index';
import Setting from '../../Config/Setting';
import TabBar from './TabBar';
import Loading from '../Loading';
export default class Management extends Component {
  constructor(props) {
    super(props);
    this.state = {     
    }

  }
  componentDidMount() {
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
            <Category
                tabLabel='Category'/>
            <Submenu
                // onPress={(record) => this._goGetSummary(record)}
                // onPressLogout = {() => this._logOut()}
                tabLabel='Submenu'/>
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
