'use strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';

import createReactClass from 'create-react-class';

import Button from './Button';
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const textColor = isTabActive ? "white" :  "#6D6E71";
    const fontWeight = isTabActive ? 'bold' : 'bold';
    const fontSize =  isTabActive ? 19 : 19; 
    const backgroundColor = isTabActive ? '#EA7B21' : 'white';
    return (
      <Button
        style={{flex: 1, }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, {backgroundColor:backgroundColor} ]}>
          <Text style={[{color: textColor, fontWeight,fontSize } ]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth:1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#EA7B21',
  },
});
