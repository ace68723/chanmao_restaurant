/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  AsyncStorage,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import Settings from '../../Config/Setting';
import Loading from '../Loading';
import OrderItem from './OrderItem';
import HomeModule from '../../Module/Home/HomeModule';
import TimerMixin from 'react-timer-mixin';
import { GetUserInfo } from '../../Module/Database';
export default class Home extends Component {
  mixins: [TimerMixin];
  constructor()
  {
    super();
    this.state={
      reRender:0,
      newOrder:[],
      Orders:[],
      recentOrder: [],
      refreshing: false,
    }
    this._renderItem=this._renderItem.bind(this);
    this.scrollToIndexI=this.scrollToIndexI.bind(this);
    this._fetchOrder = this._fetchOrder.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.updateOrders = this.updateOrders.bind(this);
    // this._logOut = this._logOut.bind(this);
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('Message',(Message)=>{
      NativeModules.SystemSound.playSound();
      console.log('sound');
    });
  }
  componentDidMount(){
    this._fetchOrder();
    this.updateOrders();
  }
  // _logOut(){
  //   this.props.onPressLogout()
  //   }
  async updateOrders() {
    let { interval } = GetUserInfo();
    interval = parseInt(interval*1000,10);
    this.timer = setTimeout(() => {
      this._fetchOrder();
    }, interval);

  }

  async _fetchOrder() {
    try{
      this.refs.loading.startLoading();
      const data = await HomeModule.fetchOrder();
      if (data.ev_result === 0) {
        let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
        this.setState({
          newOrder:data.ea_new,
          recentOrder: data.ea_done,
          Orders: Orders,
          refreshing: false
        })
      }
      this.refs.loading.endLoading();
     }catch(error){
      if (error == '用户超时，请退出重新登陆') {
        Alert.alert(
          "ERROR",
          '用户超时，请退出重新登陆',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
      } else {
        Alert.alert(
          "ERROR",
          '请退出重新登陆',
          [
            {text: 'Ok'},
          ],
          { cancelable: false }
        )
      }
   }
  }
  handleRefresh = () => {
    this.setState({
      refreshing:true,
    },
    () => {
      this._fetchOrder();
    })
  }
  scrollToIndexI(index) {
    this.list.scrollToIndex({'animated':'true','index':index,'viewPosition':1,'viewOffset':0 })
  }
  _renderItem ({item}){
      if (!item.title) return (
       <OrderItem
       fetchOrder = {() => this._fetchOrder()}
       {...item} navigator={this.props.navigator} />
      )
      return(
        <View style={{
          backgroundColor:item.color,
          width:Settings.getX(540),
          height:Settings.getY(54),
          justifyContent:'center',
        }}>

          <Text style={{
            color:'white',
            fontSize:16,
            marginLeft:Settings.getX(26),
          }}>
            {item.title}
          </Text>

        </View>
      )
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={{
          backgroundColor:'white',
          width:Settings.getX(540),
          height:Settings.getY(76),
          justifyContent:'center',
        }}>
          <Text style={{
            color:'black',
            fontSize:22,
            marginLeft:Settings.getX(26),
          }}>
            HOME {this.state.result}
          </Text>
        </View>

          <FlatList
            data={this.state.Orders}
            renderItem={this._renderItem}
            stickyHeaderIndices={[0]}
            ref={(ref) => { this.list = ref; }}
            keyExtractor={(item, index) => index}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
