/* @flow */

import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Settings from '../../Config/Setting';
import OrderDetail from '../OrderDetail/index';
export default class OrderItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpen:false
    }
  }
  _renderOrderDetail(item,deliveryStatus)
  {
    if (!this.state.isOpen) return;
    return (
        <OrderDetail type={deliveryStatus==0?'new':'recent'}  />

    )
  }
  _renderDeliveryButton({deliveryStatus})
  {
    if (deliveryStatus===0) return (
      <View style={{
        marginLeft:10,
        borderColor:'#ea7b21',
        borderWidth:2,
        height:Settings.getY(32),
        width:Settings.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:'#ea7b21'}}>
          View
        </Text>
        <View style={{width:3}}>
        </View>
        <Image  style={{width:Settings.getX(17),height:Settings.getX(11)}}
          source={this.state.isOpen? require('./up.png'):require('./down.png')}
        />
      </View>
    );
    if (deliveryStatus===1) return (                   //Accepted
      <View style={{
        marginLeft:10,
        borderColor:'#43c9a2',
        borderWidth:2,
        height:Settings.getY(32),
        width:Settings.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:'#43c9a2'}}>
          Accepted
        </Text>
        <View style={{width:3}}>
        </View>
        <Image  style={{width:Settings.getX(17),height:Settings.getX(11)}}
          source={this.state.isOpen? require('./up.png'):require('./down.png')}
        />
      </View>
    );
    if (deliveryStatus===2) return (                   //Sold Out
      <View style={{
        marginLeft:10,
        backgroundColor:'#6c727a',
        height:Settings.getY(32),
        width:Settings.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:'white'}}>
          Sold Out
        </Text>


      </View>
    );
    if (deliveryStatus===3) return (                   //Cancelled
      <View style={{
        marginLeft:10,
        backgroundColor:'#f26657',
        height:Settings.getY(32),
        width:Settings.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:'white'}}>
          Cancelled
        </Text>


      </View>
    );
  }
  _renderDeliverType(dltype){
    if(dltype == 0){
      return(
        <Text style={{
          color:'black',
          marginLeft:Settings.getX(26),
          // marginTop:Settings.getY(9),
          fontSize:16,
          fontWeight:'bold',
        }}>
          PickUp
        </Text>
      )
    } else if(dltype == 1){
      return(
        <Text style={{
          color:'black',
          marginLeft:Settings.getX(26),
          // marginTop:Settings.getY(9),
          fontSize:16,
          fontWeight:'bold',
        }}>
          Delivery
        </Text>
      )
    }
  }
  render() {
    const {dltype,oid,time,total,deliveryStatus} = this.props;
    return(

        <View style={{  borderBottomColor:'#d1d3d4',
          borderBottomWidth:1,}}>
          <TouchableOpacity onPress={()=>{
                              this.setState({isOpen:!this.state.isOpen});
                            }}
            disabled={(deliveryStatus>1)}>
          <View style={{
            width:Settings.getX(540),
            height:Settings.getY(118),
            backgroundColor:'white',
          }}>

            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <View style={{flex:1,flexDirection:'row',}}>
                <Text style={{
                  color:'black',
                  marginLeft:Settings.getX(26),
                  // marginTop:Settings.getY(20),
                  fontSize:16,
                  fontWeight:'bold',
                }}>
                  No:
                </Text>
                <Text style={{fontSize:16,
                          fontWeight:'normal',
                          color:'#ea7b21'
                        }}>
                  {oid}
                </Text>
              </View>
              <View style={{flex:1,flexDirection:'row',}}>
                <Text style={{
                  color:'black',
                  marginLeft:Settings.getX(26),
                  // marginTop:Settings.getY(20),
                  fontSize:16,
                  fontWeight:'bold',
                  }}>
                  Place Time:

                </Text>
                <Text style={{fontSize:16,
                          fontWeight:'normal',
                          color:'black',
                        }}>
                  {time}
                </Text>
              </View>
            </View>

            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <View style={{flex:1,flexDirection:'row',}}>
                <Text style={{
                  color:'black',
                  marginLeft:Settings.getX(26),
                  // marginTop:Settings.getY(9),
                  fontSize:16,
                  fontWeight:'bold',
                }}>
                  Price:$
                </Text>
                <Text style={{fontSize:16,
                          fontWeight:'normal',
                          color:'black'
                        }}>
                  {total}
                </Text>
              </View>
              <View style={{flex:1,flexDirection:'row',}}>
                {this._renderDeliverType(dltype)}
                {this._renderDeliveryButton({deliveryStatus})}
              </View>
            </View>

          </View>
          </TouchableOpacity>
          {this._renderOrderDetail()}
        </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
