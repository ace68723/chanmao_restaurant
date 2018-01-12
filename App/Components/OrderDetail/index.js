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
      dataArray: [
        {
          dishNum:'K20',
          name:'鱼香肉丝',
          amount:'1',
          sold:false,
          price:'7.99'
        },
        {
          dishNum:'K21',
          name:'番茄炒鸡蛋',
          amount:'1',
          sold:false,
          price:'6.99'
        },
        {
          dishNum:'K22',
          name:'鱼香肉丝',
          amount:'1',
          sold:false,
          price:'7.99'
        },
        {
          dishNum:'K23',
          name:'鱼香肉丝',
          amount:'1',
          sold:false,
          price:'7.99'
        },
      ],
      waiting:false,
      printTitles:["No.","Dish","Amount","Price"],
    }
    this._acceptOrder = this._acceptOrder.bind(this);
    this._printOrder = this._printOrder.bind(this);
    this._renderItems = this._renderItems.bind(this);
    this._changeSoldState = this._changeSoldState.bind(this);
  }
  componentDidMount() {
    this.getOrderDetail();
  }
  async getOrderDetail(){
    try{
       const rid = 5;
       const token = '';
       const oid = 19006;
       this.refs.loading.startLoading();
       const data = await OrderDetailModule.getOrderDetail(token,rid,oid);
       console.log(data);
       this.setState({
         dataArray: data.items,
         totalPrice: data.total,
         user: data.name,
         tel: data.tel,
         comment: data.comment,
       })
       console.log(this.state.dataArray)
       this.refs.loading.endLoading();

    }catch(error){
      console.log(error);
    }
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
                <TouchableOpacity style={[styles.checkBox,{ backgroundColor:this.state.dataArray[index].sold ?'#F15A29' : 'white' }]}
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
    let temp = this.state.dataArray;
    temp[index].sold = !this.state.dataArray[index].sold;
    this.setState({dataArray:temp},()=>console.log(this.state.dataArray[index]));
  }
  _renderList(){
    return(
          <View style= {{height:this.state.dataArray.length * 30 + 40, borderBottomWidth:1,
            borderColor:'#D1D3D4'}}>
        {this._renderListTitle()}
        <View style = {{height: this.state.dataArray.length * 30}}>
          {this._renderItems(this.state.dataArray)}
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
    if(this.props.type == 'new'){
      let soldOutArr = this.state.dataArray.filter(item => item.sold == true);
      let confirmText = soldOutArr.length > 0 ? 'Sold Out' : 'Accept';
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
              <TouchableOpacity style={styles.confirmButtonStyle} activeOpacity={0.4} onPress={()=>this._acceptOrder()}>
                <Text style={{fontFamily:'Noto Sans CJK SC',fontSize:24,color:'white'}}>{confirmText}</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }else{
      return(
        <View style={{height:80}} >
          <View style={styles.confirmButtonView} >
              <TouchableOpacity style={styles.confirmButtonStyle} activeOpacity={0.4} onPress={()=>this._printOrder()}>
                <Text style={{fontFamily:'Noto Sans CJK SC',fontSize:24,color:'white'}}>Print</Text>
              </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  _acceptOrder(){
    this.setState({waiting:true})
    setTimeout(()=>this.setState({waiting:false}),500)
  }
  _setWidth(itemString, number){
    if(itemString.length < number){
      for(let i = 0; i < number - itemString.length; i++){
          itemString.push(" ");
      }
    }
    return itemString;
  }
  _printOrder(){
    let data = {
      type:'receipt',
      restaurantName:'西北楼',
      restaurantAddress:'3212 Yonge Street',
      restaurantPhoneNumber: '647-684-6483',
      orderTime:'2017-02-15 12:30:12',
      orderNumber:'826154',
      orderArray:this.state.dataArray,
      subTotal:'26.99',
      tax:'2.44',
      total:'29.47',
      printTitles:this.state.printTitles,
      }
    this.setState({waiting:true})
    PrintModule.printContent(data)
    setTimeout(()=>this.setState({waiting:false}),500)
  }
  render() {
    return (
      <View style={styles.container}>
                    <Loading ref="loading" size={60}/>
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
    marginHorizontal:Setting.getX(26),
    backgroundColor:'white'
  },
  titleContainer:{
    height:30,
    flexDirection: 'row',
    alignItems:'center'
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
