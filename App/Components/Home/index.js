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
import JPushModule from 'jpush-react-native';
import CmrHomeAction from '../../Actions/CmrHomeAction';
import CmrHomeStore from '../../Stores/CmrHomeStore';
import { GetUserInfo } from '../../Module/Database';
export default class Home extends Component {
  constructor()
  {
    super();
    this.state = CmrHomeStore.getState();
    this._renderItem=this._renderItem.bind(this);
    this.scrollToIndexI=this.scrollToIndexI.bind(this);
    this._fetchOrder = this._fetchOrder.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.updateOrders = this.updateOrders.bind(this);
    this._logOut = this._logOut.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('Message',(Message)=>{
      const soundInterval = setInterval(() => {
        NativeModules.SystemSound.playSound();
        }, 500);//add loading if request more than 200ms
      setTimeout(() => {
        clearInterval(soundInterval)
      }, 5000);
    });
  }
  componentDidMount(){
    CmrHomeStore.addChangeListener(this._onChange);
    CmrHomeAction.fetchOrder()
    this.updateOrders();
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("receive notification: " + message);
      CmrHomeAction.fetchOrder()
    });
  }
  componentWillUnmount() {
    CmrHomeStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(CmrHomeStore.getState());
  }
  _logOut(){
    clearInterval(this.timer);
    this.props.onPressLogout(); 
  }
  async updateOrders() {
    let { interval } = GetUserInfo();
    interval = parseInt(interval*1000,10);
    this.timer = setInterval(() => {
      CmrHomeAction.fetchOrder()
    }, interval);
  }

  async _fetchOrder() {
    const loadingTimeout = setTimeout(() => {
      if(this.refs.loading){ 
        this.refs.loading.startLoading()
      }
    }, 300);//add loading if request more than 200ms
    try{
      const data = await HomeModule.fetchOrder();
      clearTimeout(loadingTimeout);
      if(this.refs.loading) {
        this.refs.loading.endLoading()
      }
      data.ea_done.sort(function(a,b){
        return parseInt(b.oid)  - parseInt(a.oid);
      })
      data.ea_new.sort(function(a,b){
          return parseInt(b.oid)  - parseInt(a.oid);
      })
      if (data.ev_result === 0) {
        if(data.ea_new.length !== 0) {
          if(data.ea_new[0].oid === this.state.checkOid) {
            let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
            this.setState({
              newOrder:data.ea_new,
              recentOrder: data.ea_done,
              Orders: Orders,
              // checkOid: data.ev_new[i].oid,
              refreshing: false
            })
          } else {
            const soundInterval = setInterval(() => {
              NativeModules.SystemSound.playSound();
              }, 500);//add loading if request more than 200ms
              setTimeout(() => {
                clearInterval(soundInterval)
              }, 5000);
            Alert.alert(
              "Message",
              'You Have New Order',
              [
                {text: 'Ok',onPress:()=>clearInterval(soundInterval)},
              ],
              { cancelable: false }
            )
            let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
            this.setState({
              newOrder:data.ea_new,
              recentOrder: data.ea_done,
              Orders: Orders,
              checkOid: data.ea_new[0].oid,
              refreshing: false
            })
          }
        } else if(data.ea_new.length === 0){
          let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
            this.setState({
              newOrder:data.ea_new,
              recentOrder: data.ea_done,
              Orders: Orders,
              // checkOid: data.ev_new[i-1].oid,
              refreshing: false
            })
        }
      }
     }catch(error){
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();      
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
        this._logOut();
        Alert.alert(
          "ERROR",
          '有其他设备正在使用此账号，请重新登录',
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
      CmrHomeAction.fetchOrder()
    })
  }
  scrollToIndexI(index) {
    this.list.scrollToIndex({'animated':'true','index':index,'viewPosition':1,'viewOffset':0 })
  }
  _renderItem ({item}){
      if (!item.title) return (
       <OrderItem
       key={item.oid}
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
      <View style={styles.container}>
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
            keyExtractor={(item, index) => index.toString()}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
