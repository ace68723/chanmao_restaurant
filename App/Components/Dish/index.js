import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  DatePickerAndroid,
  Alert,
  TextInput,
  AsyncStorage
} from 'react-native';
import Settings from '../../Config/Setting';
import Setting from '../../Config/Setting.js'

import Loading from '../Loading';
const {height, width} = Dimensions.get('window');

export default class Dish extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    this.state={
      category:props.category,
      waiting: false,
      keyword: '',
      token: '',
      restaurantList:[]
    }
    this.getMerchantByKeyword = this.getMerchantByKeyword.bind(this);
  }

  componentDidMount() {
    console.log('123')
  }
  getMerchantByKeyword() {
    this.dishLists.forEach((item, index) => {
      if (item.name.includes(this.state.keyword)) {
        this.state.restaurantList.push(item);
      }
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {/* {this.renderSelectDate()} */}
          {this.renderCatFunction()}
          {this.renderListFunction()}
          {/* {this.renderDetialList()} */}
        </View>
      </View>
    )
  }


  renderListFunction(){
    return(
      <View style={styles.listFunctionView}>
        <TouchableOpacity
            style={styles.searchButtonStyle}
            onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont}>
              Add Dish
            </Text>
        </TouchableOpacity>
        <View style={{flex:0.4,    height: Settings.getY(150)}}>
            <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={(text) => this.props.onChangeText({text})}
            />
        </View>
        <TouchableOpacity
            style={styles.searchButtonStyle2}
            // onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Image source={require('./Image/search.png')} style={{
              width:Settings.getX(26), height:Settings.getY(26)}} />
            <Text style={styles.searchButtonFont2}>
              Search
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderCatFunction(){
    return(
      <View style={styles.listFunctionView}>
       <View style={{flex:0.4,    height: Settings.getY(150)}}>
            <TextInput
            value={this.state.category.name}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={(text) => this.props.onChangeText({text})}
            />
        </View>
        <TouchableOpacity
            style={styles.searchButtonStyle}
            onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont}>
              Save 
            </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.searchButtonStyle2}
            // onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont2}>
              Delete 
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.15,paddingLeft:Settings.getX(2)}}>
          <Text style={styles.listTitleFont}>ID</Text>
        </View>
        <View style={{flex:0.3,paddingLeft:Settings.getX(2)}}>
          <Text style={styles.listTitleFont}>Name</Text>
        </View>
        <View style={{flex:0.4,paddingLeft:Settings.getX(35)}}>
          <Text style={styles.listTitleFont}>Category</Text>
        </View>
        <View style={{flex:0.15,paddingLeft:Settings.getX(50)}}>
          <Text style={styles.listTitleFont}>Price</Text>
        </View>
      </View>
    )
  }
//   renderDetialList(){
//     return(
//       <View style={styles.listDetailView}>
//         {this.renderListTitle()}
//         <View style={{flex:0.9}}>
//           <ScrollView style={{
//                     flex:0.9,
//                     height:400,
//                     width: width,
//                     paddingHorizontal:Settings.getX(12)
//                     }}>
//             {this.renderRecords()}
//           </ScrollView>

//         </View>
//       </View>
//     )
//   }
//   renderRecords(){
//     console.log(this.state.list)
//     let orders;
//     if (this.state.list.orders) {orders=this.state.list.orders;} else {orders=this.state.list}
//     return orders.map((record, index)=>{
//       return(
//         <View style={styles.recordView}
//                 key={index}>
//           <View style={{flex:0.3, marginLeft:15}}>
//             <Text style={styles.recordTitleFont}>{record.oid}</Text>
//           </View>
//           <View style={{flex:0.5,}}>
//             <Text style={styles.recordTitleFont}>{record.date} {record.time}</Text>
//           </View>
//           <View style={{flex:0.2, marginRight:15}}>
//             <Text style={styles.recordTitleFont}>{record.total}</Text>
//           </View>
//         </View>
//       )
//     })
//   }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    flex:1,
    width:width,
    backgroundColor:'white',
  },
  timeView:{
    flexDirection:'row',
    flex:0.1,
  },
  timeSelectButton:{
    height: '65%',
    borderColor: '#EA7B21',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection:'row',
    alignItems:'center'
  },
  listFunctionView:{
    flexDirection:'row',
    marginHorizontal:Settings.getX(20),
    flex:0.1,
  },

  listDetailView:{
    flex:0.8,
  },
  listTitles:{
    flexDirection:'row',
    flex:0.1,
    marginHorizontal: Settings.getX(33),
    paddingTop:Settings.getY(30),
    justifyContent:'center',
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'black',
    justifyContent:'center',
  },
  recordView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    borderBottomWidth:1,
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
  recordTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    color:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  printButtonView:{
    flex:0.1,
    justifyContent:'center',
  },
  printButtonStyle:{
    marginLeft:280,
    marginRight:20,
    backgroundColor:'white',
    width:60,
    flex:1,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  printButtonFont:{
    fontSize:15,
    color:'#EA7B21'
  },
  input: {
    marginTop:Settings.getY(25),
    textAlign: 'left',
    height: 'auto',
    flex: 0.3,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,
    fontSize: 15,
  },
  searchButtonStyle:{
    backgroundColor:'#EA7B21',
    flex:0.3,
    marginLeft:Settings.getY(10),
    marginRight: Settings.getY(12),
    height: Settings.getY(50),
    marginTop:Settings.getY(20),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  searchButtonStyle2:{
    backgroundColor:'grey',
    flex:0.3,
    marginLeft:Settings.getY(10),
    marginRight: Settings.getY(12),
    marginTop:Settings.getY(20),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    height: Settings.getY(50),
    borderColor:'grey'
  },
  searchButtonFont:{
    fontSize:15,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  },
  searchButtonFont2:{
    fontSize:15,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  }
});
