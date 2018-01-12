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
import Settings from '../../Config/Setting';

import OrderItem from './OrderItem';

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCwhZeyBXPWUAkeIc29p7_JfvGT0qC51c8",
  databaseURL: "https://cm-rrclient-1.firebaseio.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export default class Home extends Component {
  constructor(props)
  {
    super(props);
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
    }
    this._renderItem=this._renderItem.bind(this);
    this._listenForItems = this._listenForItems.bind(this);
  }
  componentDidMount(){
    this._listenForItems();
  }
  _listenForItems() {
      let newOrder,recentOrder;
      const starCountRef = firebase.database().ref('testclient/4/');
      starCountRef.on('value',(snapshot)=> {

      newOrder = snapshot.val().new;
      recentOrder = snapshot.val().done;

      if(recentOrder) recentOrder =  Object.entries(recentOrder).map(e => Object.assign(e[1], { key: e[0] }));
      if(newOrder) newOrder = Object.entries(newOrder).map(e => Object.assign(e[1], { key: e[0] }));
      newOrder = [...[{}],newOrder];
      this.setState({
        newOrder:newOrder,
        recentOrder: recentOrder
      });
    });
  }

  _renderItem ({item}){
      return <OrderItem {...item} {...{deliveryStatus:1} }/>
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
        <View style={{
          backgroundColor:'#ea7B21',
          width:Settings.getX(540),
          height:Settings.getY(54),
          justifyContent:'center',
        }}>
          <Text style={{
            color:'white',
            fontSize:16,
            marginLeft:Settings.getX(26),
          }}>
            NEW ORDER
          </Text>
        </View>
          <FlatList
            style={{minHeight:Settings.getX(400),}}
            data={this.state.newOrder}
            renderItem={this._renderItem}
            stickyHeaderIndices={this.state.stickyHeaderIndices}
          />


        <View style={{
          backgroundColor:'#798ba5',
          width:Settings.getX(540),
          height:Settings.getY(54),
          justifyContent:'center',
          marginTop:20,
        }}>
          <Text style={{
            color:'white',
            fontSize:16,
            marginLeft:Settings.getX(26),
          }}>
            RECENT ORDER
          </Text>
        </View>

          <FlatList
            data={this.state.recentOrder}
            renderItem={this._renderItem}
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
