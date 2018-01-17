/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Setting from '../../Config/Setting';
import PrintModule from '../../Module/Print/PrintModule';
import Loading from '../Loading';
import OrderDetailModule from '../../Module/OrderDetail/OrderDetailModule';

const timeStr = ['< 10', '20', '30', '> 40'];

export default class OrderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalPrice:'',
      comment:' ',
      user:'',
      tel:'',
      estimateTime:'20',
      itemList:[],
      waiting:false,
      printTitles:["No.","Dish","Amount","Price"],
    }
    this._handleOrder = this._handleOrder.bind(this);
    this._printOrder = this._printOrder.bind(this);
    this._renderItems = this._renderItems.bind(this);
    this._changeSoldState = this._changeSoldState.bind(this);
    this._renderOrderType=this._renderOrderType.bind(this);
    this._renderOrderInfo=this._renderOrderInfo.bind(this);
    this._renderDeliveryButton=this._renderDeliveryButton.bind(this);
    this._renderDeliverType=this._renderDeliverType.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    this._getOrderDetail();
  }
  _renderDeliverType(dltype){
    if(dltype == 0){
      return(
        <Text style={{
          color:'black',
          marginLeft:Setting.getX(26),
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
          marginLeft:Setting.getX(26),
          // marginTop:Settings.getY(9),
          fontSize:16,
          fontWeight:'bold',
        }}>
          Delivery
        </Text>
      )
    }
  }
  _renderDeliveryButton(status)
  {
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
        height:Setting.getY(32),
        width:Setting.getX(118),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <Text style={{color:statusColor}}>
          {statusMessage}
        </Text>
        <View style={{width:3}}>
        </View>

      </View>
    )
  }
  _renderOrderInfo()
  {

      if (this.state.itemList.length==0) return;
    return(
      <View style={{
        width:Setting.getX(540),
        height:Setting.getY(118),
        backgroundColor:'white',
      }}>

        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <View style={{flex:1,flexDirection:'row',}}>
            <Text style={{
              color:'black',
              marginLeft:Setting.getX(26),
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
              {this.props.oid}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:'row',}}>
            <Text style={{
              color:'black',
              marginLeft:Setting.getX(26),
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
              {this.props.time}
            </Text>
          </View>
        </View>

        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <View style={{flex:1,flexDirection:'row',}}>
            <Text style={{
              color:'black',
              marginLeft:Setting.getX(26),
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
              {this.state.totalPrice}
            </Text>
          </View>
          <View style={{flex:1,flexDirection:'row',}}>
            {this._renderDeliverType(this.state.dltype)}
            {this._renderDeliveryButton(this.props.status)}
          </View>
        </View>

      </View>
    )
  }
  _renderOrderType(){
    if (this.state.itemList.length==0) return;
    let title='';
    let color='';
    if (this.props.status==="0") {
      title='NEW ORDER';
      color='#ea7B21';
    } else
    {
      title='RECENT ORDER';
      color='#798BA5';
    }
    return(
      <View style={{
        backgroundColor:color,
        width:Setting.getX(540),
        height:Setting.getY(54),
        justifyContent:'center',
      }}>

        <Text style={{
          color:'white',
          fontSize:16,
          marginLeft:Setting.getX(26),
        }}>
          {title}
        </Text>

      </View>
    )
  }
  async _getOrderDetail(){
    try{
       const oid = this.props.oid;
       const loadingTimeout = setTimeout(() => {
         this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms

       const data = await OrderDetailModule.getOrderDetail(oid);
       console.log(data)
       this.setState({
         itemList: data.items,
         totalPrice: data.total,
         user: data.name,
         tel: data.tel,
         comment: data.comment,
         dltype:data.dltype,
       })
         clearTimeout(loadingTimeout);
         this.refs.loading.endLoading();

    }catch(error){
      console.log(error);
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();
    }
  }
  async _handleOrder(task){

    try {
      this.setState({waiting:true})
      setTimeout(()=>this.setState({waiting:false}),500)

      const oid = this.props.oid;
      const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
      }, 100);//add loading if request more than 200ms

      const itemList = this.state.itemList;
      const data = await OrderDetailModule.handleOrder({oid,task,itemList});
      this.props.navigator.dismissModal({
        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
      await this._printOrder();
      setTimeout(() =>{
        this._printOrder();
      }, 2000);
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();

    } catch (e) {
      console.log(e)
      clearTimeout(loadingTimeout);
      this.refs.loading.endLoading();
    }
  }
  _printerWatting = false;
  async _printOrder(){
    if(this._printerWatting) return;
    this._printerWatting = true;
    console.log('_printOrder')
    let dltypeMessage;
    if(this.state.dltype == 0 ){
      dltypeMessage = 'Pick Up';
    }else{
      dltypeMessage = 'Delivery';
    }
    let data = {
      type:'receipt',
      dltypeMessage:dltypeMessage,
      restaurantName:'西北楼',
      restaurantAddress:'3212 Yonge Street',
      restaurantPhoneNumber: '647-684-6483',
      orderTime:'2017-02-15 12:30:12',
      orderNumber:this.props.oid,
      orderArray:this.state.itemList,
      subTotal:'',
      tax:'',
      total:this.state.totalPrice,
      printTitles:this.state.printTitles,
      comment:this.state.comment,
    }
    await PrintModule.printContent(data);

    this._printerWatting = false;
  }

  _renderListTitle(){
    if(this.props.type == 'new'){
    return(
        <View style={styles.titleContainer}>
          <View style={{width:70}}>
            <Text style={styles.titleFont}>Dish No.</Text>
          </View>
          <View style={{width:100}}>
            <Text style={styles.titleFont}>Dish Name</Text>
          </View>
          <View style={{width:60,marginLeft:20}}>
            <Text style={styles.titleFont}>Amount</Text>
          </View>
          <View style={{width:70, marginLeft:10}}>
            <Text style={styles.titleFont}>Sold Out</Text>
          </View>
        </View>
      )
    }
    else{
      return(
          <View style={styles.titleContainer}>
            <View style={{width:70}}>
              <Text style={styles.titleFont}>Dish No.</Text>
            </View>
            <View style={{width:160}}>
              <Text style={styles.titleFont}>Dish Name</Text>
            </View>
            <View style={{width:60,marginLeft:20}}>
              <Text style={styles.titleFont}>Amount</Text>
            </View>

          </View>
        )
    }
  }
  _renderItems(items){
    if(this.props.type == 'new'){
      return items.map((item,index)=>{
          return(
            <View key={index} style={styles.itemContainer}>
              <View style={{flex:0.2}}>
                <Text>{item.ds_id}</Text>
              </View>
              <View style={{flex:0.4}}>
                <Text>{item.ds_name}</Text>
              </View>
              <View style={{flex:0.2}}>
                <Text>{item.amount}</Text>
              </View>
              <View style={{flex:0.2}}>
                <TouchableOpacity style={[styles.checkBox,{ backgroundColor:this.state.itemList[index].sold ?'#F15A29' : 'white' }]}
                    onPress={()=>this._changeSoldState(index)}/>
              </View>
            </View>
          )
        }
      )
    }else{
      return items.map((item,index)=>{
          return(
            <View key={index} style={styles.itemContainer}>
              <View style={{flex:0.2}}>
                <Text>{item.ds_id}</Text>
              </View>
              <View style={{flex:0.6}}>
                <Text>{item.ds_name}</Text>
              </View>
              <View style={{flex:0.2}}>
                <Text>{item.amount}</Text>
              </View>
            </View>
          )
        }
      )
    }
  }
  _changeSoldState(index){
    let temp = this.state.itemList;
    temp[index].sold = !this.state.itemList[index].sold;
    this.setState({itemList:temp},()=>console.log(this.state.itemList[index]));
  }
  _renderList(){

    if (this.state.itemList.length==0) return;
    return(
          <View style= {{height:this.state.itemList.length * 30 + 40, borderBottomWidth:1,
            borderColor:'#D1D3D4'}}>
        {this._renderListTitle()}
        <View style = {{height: this.state.itemList.length * 30}}>
          {this._renderItems(this.state.itemList)}
        </View>
      </View>
    )
  }
  _renderTimesOptions(){
  return timeStr.map((timeStr,index)=>{
        return(
          <View key={index} style={{flex:1}} >
            <TouchableOpacity style={[styles.timeButtonStyle,
                                      {backgroundColor: this.state.estimateTime==timeStr ? '#798BA5':'white'}
                                    ]}
                  onPress={()=>this.setState({estimateTime:timeStr})}>

              <Text style={{fontSize:16, color: this.state.estimateTime==timeStr ? 'white':'#798BA5'}}>{timeStr}</Text>

            </TouchableOpacity>
          </View>
        )
      }
    )

  }
  _renderDetails(){

    if (this.state.itemList.length==0) return;
    if(this.props.type == 'new'){
      return(
        <View style={[styles.detailContainer,{height:130}]}>
          <View style={{flex:0.5}}>
            <Text style={styles.detailInfoFont}>Total After Tax: {this.state.totalPrice}</Text>
            <Text style={styles.detailInfoFont}>Comment: {this.state.comment}</Text>
            <Text style={styles.detailInfoFont}>Estimate Time: </Text>
          </View>
          <View style={styles.timeContainer}>
            {this._renderTimesOptions()}
          </View>
        </View>
      )
    }else{
      return(
        <View style={[styles.detailContainer,{height:70}]}>
          <View style={{flex:0.5}}>
            <Text style={styles.detailInfoFont}>Total After Tax: {this.state.totalPrice}</Text>
            <Text style={styles.detailInfoFont}>Comment: {this.state.comment}</Text>
          </View>
        </View>
      )
    }
  }
  _renderConfirm(){
    if (this.state.itemList.length==0) return;
    if(this.props.status == '0'){
      let soldOutArr = this.state.itemList.filter(item => item.sold == true);
      let confirmText = soldOutArr.length > 0 ? 'Sold Out' : 'Accept';
      return(
        <View style={[styles.confirmContainer,{height:120}]} >
          <View style={styles.confirmInfoView}>
            <View style={{flex:0.5,
            }}>
              <Text style={styles.detailInfoFont}>User: {this.state.user}</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={styles.detailInfoFont}>Tel: {this.state.tel}</Text>
            </View>
          </View>
          <View style={styles.confirmButtonView} >
              <TouchableOpacity style={styles.confirmButtonStyle} activeOpacity={0.4} onPress={this._handleOrder.bind(null,0)}>
                <Text style={{fontFamily:'Noto Sans CJK SC',fontSize:24,color:'white'}}>{confirmText}</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }else{
      return(
        <View style={[styles.confirmContainer,{height:120}]} >
          <View style={styles.confirmInfoView}>
            <View style={{flex:0.5}}>
              <Text style={styles.detailInfoFont}>User: {this.state.user}</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={styles.detailInfoFont}>Tel: {this.state.tel}</Text>
            </View>
          </View>
          <View style={styles.confirmButtonView} >
              <TouchableOpacity style={styles.confirmButtonStyle} activeOpacity={0.4} onPress={this._printOrder}>
                <Text style={{fontFamily:'Noto Sans CJK SC',fontSize:24,color:'white'}}>Print</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        {this._renderOrderType()}
        {this._renderOrderInfo()}
        {this._renderList()}
        {this._renderDetails()}
        {this._renderConfirm()}
      </View>
    );
  }
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:'white'
  },
  titleContainer:{
    height:30,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:30,
  },
  titleFont:{
    fontFamily:'Noto Sans CJK SC',
    fontWeight:'bold',
    fontSize:16,
  },

  itemContainer:{
    height:30,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:30,

  },
  checkBox:{
    height:15,
    width:15,
    borderColor:'grey',
    borderWidth:2,
    marginLeft:10
  },
  detailContainer:{
    paddingTop:10,
    marginLeft:30,
  },
  timeContainer:{
    flexDirection:'row',
    flex:0.5,
    paddingTop:26
  },
  timeButtonStyle:{
    height:Setting.getY(50),
    width:Setting.getX(102),
    borderColor:'#798BA5',
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',

  },
  detailInfoFont:{
    fontFamily:'Noto Sans CJK SC',
    fontWeight:'bold',
    fontSize:16
  },
  confirmContainer:{
    borderColor:'#D1D3D4',
    borderTopWidth:1,
  },
  confirmInfoView:{
    paddingTop:10,
    flexDirection:'row',
    flex:0.3,

    marginLeft:30,
  },
  confirmButtonView:{
    alignItems:'center',
    flex:0.7,
  },
  confirmButtonStyle:{
    height:Setting.getY(75),
    width:Setting.getX(250),
    backgroundColor:'#EA7B21',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  }

});
