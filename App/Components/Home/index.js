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
} from 'react-native';
import Settings from '../../Config/Setting'
import OrderDetail from '../OrderDetail/index'
export default class Home extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      reRender:0,
      newOrder:[
        {
          isOpen:false,
          orderNumber:'3019281',
          time:'12:33:49',
          price:'85.22',
          deliveryStatus:0,
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
        },
        {
          isOpen:false,
          orderNumber:'3019282',
          time:'12:33:49',
          price:'85.22',
          deliveryStatus:0,
          manu:[{
            itemNumber:'K22',
            name:'item1',
            amount:1,
            soldoutOrNot:false,
          },
          {
            itemNumber:'K23',
            name:'item2',
            amount:1,
            soldoutOrNot:false,
          }
          ],
        },
      ],
      recentOrder:[
        {
          isOpen:false,
          orderNumber:'3019285',
          time:'12:33:49',
          price:'85.22',
          deliveryStatus:1,
          manu:[{
            itemNumber:'K26',
            name:'item5',
            amount:1,
            soldoutOrNot:false,
          },
          {
            itemNumber:'K28',
            name:'item7',
            amount:1,
            soldoutOrNot:false,
          }
          ],
        },
        {
          isOpen:false,
          orderNumber:'3019286',
          time:'12:33:49',
          price:'85.22',
          deliveryStatus:2,
          manu:[{
            itemNumber:'K27',
            name:'item5',
            amount:1,
            soldoutOrNot:false,
          },
          {
            itemNumber:'K29',
            name:'item7',
            amount:1,
            soldoutOrNot:false,
          }
          ],
        },
      ]
    }
    this._renderItem=this._renderItem.bind(this);
    this._renderOrderDetail=this._renderOrderDetail.bind(this);
    this._renderDeliveryButton=this._renderDeliveryButton.bind(this);
    this._passingToRecentOrder=this._passingToRecentOrder.bind(this);
  }
  _passingToRecentOrder(item,targetStatus)   //item.orderNumber
  {
    let orders=this.state.newOrder;
    let recentOrders=this.state.recentOrder;
    let foundIndex = orders.indexOf(item);
    orders.splice(index,1);
    console.log(orders);
    let changeStatusItem=item;
    changeStatusItem.deliveryStatus=targetStatus;
    recentOrders.push(changeStatusItem);
    console.log(recentOrders);
  }
  _renderOrderDetail(isOpen,item)
  {
    if (!isOpen) return;
    return (
        <OrderDetail type={item.deliveryStatus==0?'new':'recent'}  />

    )
  }
  _renderDeliveryButton(item)
  {
    if (item.deliveryStatus===0) return (
      <View style={{

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
          source={item.isOpen? require('./up.png'):require('./down.png')}
        />
      </View>
    );
    if (item.deliveryStatus===1) return (                   //Accepted
      <View style={{

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
          source={item.isOpen? require('./up.png'):require('./down.png')}
        />
      </View>
    );
    if (item.deliveryStatus===2) return (                   //Sold Out
      <View style={{

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
    if (item.deliveryStatus===3) return (                   //Cancelled
      <View style={{

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
  _renderItem = ({item}) => (
      <View >
        <View style={{
          width:Settings.getX(540),
          height:Settings.getY(118),
          backgroundColor:'white',
          flexDirection:'row',
          borderBottomColor:'#d1d3d4',
          borderBottomWidth:1,
          borderTopColor:'#d1d3d4',
          borderTopWidth:1,

        }}>
          <View style={{flex:1,}}>
            <Text style={{
              color:'black',
              marginLeft:Settings.getX(26),
              marginTop:Settings.getY(20),
              fontSize:16,
              fontWeight:'bold',
            }}>
              No:
              <Text style={{fontSize:16,
                        fontWeight:'normal',
                        color:'#ea7b21'
                      }}>
                {item.orderNumber}
              </Text>
            </Text>
            <Text style={{
              color:'black',
              marginLeft:Settings.getX(26),
              marginTop:Settings.getY(9),
              fontSize:16,
              fontWeight:'bold',
            }}>
              Price:$
              <Text style={{fontSize:16,
                        fontWeight:'normal',
                        color:'black'
                      }}>
                {item.price}
              </Text>
            </Text>
          </View>
          <View style={{flex:1,
          }}>
            <Text style={{
              color:'black',
              marginLeft:Settings.getX(26),
              marginTop:Settings.getY(20),
              fontSize:16,
              fontWeight:'bold',
            }}>
              Place Time:
              <Text style={{fontSize:16,
                        fontWeight:'normal',
                        color:'black',
                      }}>
                {item.time}
              </Text>
            </Text>
            <View style={{
              flex:1,
              flexDirection:'row',

            }}>
              <Text style={{
                color:'black',
                marginLeft:Settings.getX(26),
                marginTop:Settings.getY(9),
                fontSize:16,
                fontWeight:'bold',
              }}>
                Delivery
              </Text>
              <TouchableOpacity onPress={()=>{
                  this.setState({reRender:this.state.reRender+1});

                  console.log('button');
                  console.log(item.isOpen);
                  item.isOpen=(!item.isOpen);
                      console.log(item.isOpen);
          //        this.setState({item});
                  console.log(this.state);


                }}
                disabled={(item.deliveryStatus>1)}
                style={{
                marginLeft:Settings.getX(22),
                marginTop:Settings.getY(12),
                }}>
                {this._renderDeliveryButton(item)}
              </TouchableOpacity>

            </View>
          </View>
        </View>
        {this._renderOrderDetail(item.isOpen,item)}


      </View>
    );
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
        <View>
          <FlatList
            data={this.state.newOrder}
            renderItem={this._renderItem}
            extraData={this.state}
          />

        </View>

        <View style={{
          backgroundColor:'#798ba5',
          width:Settings.getX(540),
          height:Settings.getY(54),
          justifyContent:'center',

        }}>
          <Text style={{
            color:'white',
            fontSize:16,
            marginLeft:Settings.getX(26),
          }}>
            RECENT ORDER
          </Text>
        </View>

        <View>
          <FlatList
            data={this.state.recentOrder}
            renderItem={this._renderItem}
            extraData={this.state}
          />

        </View>


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
