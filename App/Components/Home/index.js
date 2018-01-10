/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Settings from '../../Config/Setting'
export default class Home extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      order:[
        {
          orderNumber:'3019281',
          time:'12:33:49',
          price:'85.22',
          deliveryStatus:'',
          manu:[{
            itemNumber:'K20',
            name:'item1',
            amount:1,
            soldoutOrNot:false,
          },
          {
            itemNumber:'K21',
            name:'item2',
            amount:1,
            soldoutOrNot:false,
          }
          ],
        }
      ]
    }
  }
  render() {
    var orders=[];
    for (let i=0;i<this.state.order.length;i++){
      orders.push(
          <View>
            
          </View>
      )
    }
    return (
      <View style={styles.container}>
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
            HOME
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
