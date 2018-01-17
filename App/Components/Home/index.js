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
  AsyncStorage
} from 'react-native';
import { ListItem, Left, Body, Icon, Right, Title } from "native-base";
import Settings from '../../Config/Setting';

import OrderItem from './OrderItem';

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAtQAN3PhdIsFEHkEJfiuQQHVcm9ZSfYFQ",
  databaseURL: "https://cm-rrclient-3.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export default class Home extends Component {
  constructor()
  {
    super();
    this.state={
      reRender:0,
      // newOrder:[
      //   {
      //     isOpen:false,
      //     orderNumber:'3019281',
      //     time:'12:33:49',
      //     price:'85.22',
      //     deliveryStatus:0,
      //     manu:[{
      //       itemNumber:'K20',
      //       name:'item1',
      //       amount:1,
      //       soldoutOrNot:false,
      //     },
      //     {
      //       itemNumber:'K21',
      //       name:'item2',
      //       amount:1,
      //       soldoutOrNot:false,
      //     }
      //     ],
      //   },
      //   {
      //     isOpen:false,
      //     orderNumber:'3019282',
      //     time:'12:33:49',
      //     price:'85.22',
      //     deliveryStatus:0,
      //     manu:[{
      //       itemNumber:'K22',
      //       name:'item1',
      //       amount:1,
      //       soldoutOrNot:false,
      //     },
      //     {
      //       itemNumber:'K23',
      //       name:'item2',
      //       amount:1,
      //       soldoutOrNot:false,
      //     }
      //     ],
      //   },
      // ],
      // recentOrder:[
      //   {
      //     isOpen:false,
      //     orderNumber:'3019285',
      //     time:'12:33:49',
      //     price:'85.22',
      //     deliveryStatus:1,
      //     manu:[{
      //       itemNumber:'K26',
      //       name:'item5',
      //       amount:1,
      //       soldoutOrNot:false,
      //     },
      //     {
      //       itemNumber:'K28',
      //       name:'item7',
      //       amount:1,
      //       soldoutOrNot:false,
      //     }
      //     ],
      //   },
      //   {
      //     isOpen:false,
      //     orderNumber:'3019286',
      //     time:'12:33:49',
      //     price:'85.22',
      //     deliveryStatus:2,
      //     manu:[{
      //       itemNumber:'K27',
      //       name:'item5',
      //       amount:1,
      //       soldoutOrNot:false,
      //     },
      //     {
      //       itemNumber:'K29',
      //       name:'item7',
      //       amount:1,
      //       soldoutOrNot:false,
      //     }
      //     ],
      //   },
      // ]
      stickyHeaderIndices: [],
    }
    this._renderItem=this._renderItem.bind(this);
    this._listenForItems = this._listenForItems.bind(this);
    this.scrollToIndexI=this.scrollToIndexI.bind(this);
  }
  componentDidMount(){
    this._listenForItems();
  }
  _listenForItems() {
      let newOrder,recentOrder;
      let headerIndices=[];
      const starCountRef = firebase.database().ref('rrclient/5/');

      starCountRef.on('value',(snapshot)=> {
        console.log('here')
      newOrder = snapshot.val().new;
      recentOrder = snapshot.val().done;
      headerIndices.push(0);
      if(recentOrder){
        recentOrder =  Object.entries(recentOrder).map(e => Object.assign(e[1], { key: e[0] }));
      } else {
        recentOrder = [];
      }
      if(newOrder){
        newOrder = Object.entries(newOrder).map(e => Object.assign(e[1], { key: e[0] }));
      } else {
        newOrder = [];
      }
      let Orders=[{title:'NEW ORDER',color:'#ea7B21'},...newOrder,{title:'RECENT ORDER',color:'#798BA5'}, ...recentOrder];

      headerIndices.push(newOrder.length+1);
      console.log(newOrder);
      console.log(recentOrder);
      console.log(Orders);
      this.setState({
        newOrder:newOrder,
        recentOrder: recentOrder,
        Orders:Orders,
        stickyHeaderIndices:headerIndices,
      });
      console.log(this.state.stickyHeaderIndices);
    });
  }
  scrollToIndexI(index)
  {
    console.log(index);
    console.log(this.list);
    this.list.scrollToIndex({'animated':'true','index':index,'viewPosition':1,'viewOffset':0 })
  }
  _renderItem ({item}){
      if (!item.title) return <OrderItem {...item} scrollToIndex={this.scrollToIndexI} />
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
