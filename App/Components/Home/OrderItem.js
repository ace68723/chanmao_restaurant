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
  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    }
    this._fetchOrder  = this._fetchOrder.bind(this);
    }
  componentDidMount() {
  }
  _fetchOrder() {
    this.props.fetchOrder()
  }
  _renderOrderDetail({oid,status})
  {
    if (!this.state.isOpen) return;

    // type={deliveryStatus==0?'new':'recent'}
    return (
        <OrderDetail   {...{oid,status} }/>

    )
  }

  _renderDeliveryButton({status}) {
    let statusMessage;
    let statusColor;
    switch (status) {
        case '0':
            statusColor = '#ea7b21';
            statusMessage = 'New';
            break;
        case '10':
            statusColor = '#33cd5f';
            statusMessage = 'Accepted';
            break;
        case '20':
            statusColor = '#33cd5f';
            statusMessage = '商家已确认, 准备中';
            break;
        case '30':
            statusColor = '#9bc8df';
            statusMessage = '送餐员已开始送餐';
            break;
        case '40':
            statusColor = '#11c1f3';
            statusMessage = '已送到, 满意吗？';
            break;
        case '55':
            statusColor = '#886aea';
            statusMessage = '新用户订单确认中';
            break;
        case '60':
            statusColor = '#11c1f3';
            statusMessage = '客服稍后联系您改运费';
            break;
        case '5':
            statusColor = '#b2b2b2';
            statusMessage = 'Sold Out';
            break;
        case '90':
            statusColor = '#ef473a';
            statusMessage = 'Cancelled';
            break;
    }
    return(
      <View style={{
        marginLeft:10,
        borderColor:statusColor,
        borderWidth:2,
        height:Settings.getY(32),
        width:Settings.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:statusColor}}>
          {statusMessage}
        </Text>
        <View style={{width:3}}>
        </View>
        <Image  style={{width:Settings.getX(17),height:Settings.getX(11)}}
          source={this.state.isOpen? require('./up.png'):require('./down.png')}
        />
      </View>
    )
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
    const {dltype,oid,time,total,status,pptime} = this.props;
    return(
        <View style={{  borderBottomColor:'#d1d3d4',
          borderBottomWidth:1,}}>
          <TouchableOpacity
            disabled={status=='5'||status=='90'}
            onPress={()=>{
            this.props.navigator.showModal({
              screen: "OrderDetail",
              title: oid,
              passProps: {
                onfetchOrder: () => this._fetchOrder(),
                oid:oid,
                status:status,
                time:time,
              },
              navigatorStyle: {},
              animationType: 'slide-up'
            });
                            }}>
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
                  {oid} ({pptime} mins)
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
                {this._renderDeliveryButton({status})}
              </View>
            </View>

          </View>
          </TouchableOpacity>
          {this._renderOrderDetail({oid,status,time,dltype})}
        </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
