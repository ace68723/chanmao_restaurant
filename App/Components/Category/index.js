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
import CategoryModule from '../../Module/Category/CategoryModule';
const {height, width} = Dimensions.get('window');

export default class Category extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    this.state={
      dishLists:[],
      categoryLists:[{
          id:3928,
          name:'cioo'
      },{
        id:3928,
        name:'cioo'
    }],
      waiting: false,
      keyword: '',
      token: '',
      restaurantList:[]
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.editCategory =this.editCategory.bind(this);
  }

  componentDidMount() {
    console.log('123')
    this.getDishes();
  }
  editCategory(item) {
    this.props.navigator.showModal({
        screen: 'Dish',
        title: item.name,
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {category:item},
        animationType: 'screen'
      });
  }
  onChangeText() {
    this.dishLists.forEach((item, index) => {
      if (item.name.includes(this.state.keyword)) {
        this.state.restaurantList.push(item);
      }
    });
  }
  async getDishes() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.getDishes();
         this.setState({
            dishLists: data.ea_dishes,
         })
         clearTimeout(loadingTimeout);
         this.refs.loading.endLoading();
  
    }catch(error){
        console.log(error)
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
        if (error == '用户超时，请退出重新登陆') {
          Alert.alert(
            "ERROR",
            '用户超时，请退出重新登陆',
            [
              {text: 'Ok', onPress:()=>this._logOut()},
            ],
            { cancelable: false }
          )
  
        } else {
          clearTimeout(loadingTimeout);
          this.refs.loading.endLoading();
          return
        }
  
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {/* {this.renderSelectDate()} */}
          {this.renderSearchFunction()}
          {this.renderListFunction()}
          {this.renderDetialList()}
        </View>
      </View>
    )
  }
  renderSearchFunction(){
    return(
      <View style={styles.listFunctionView}>
        <View style={{flex:0.7,height: Settings.getY(150)}}>
            <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input2 }
            onChangeText={(text) => this.onChangeText({text})}
            />
        </View>
        <TouchableOpacity
            style={styles.searchButtonStyle2}
            // onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont}>
              Search
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderListFunction(){
    return(
      <View style={styles.listFunctionView}>
        <View style={{flex:0.7,height: Settings.getY(150)}}>
            <TextInput
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={(text) => this.onChangeText({text})}
            />
        </View>
        <TouchableOpacity
            style={styles.searchButtonStyle}
            // onPress={() => this.getSummary()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont}>
              Add Category
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.3,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>ID</Text>
        </View>
        <View style={{flex:0.7,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>Name</Text>
        </View>

      </View>
    )
  }
  renderDetialList(){
    return(
      <View style={styles.listDetailView}>
        {this.renderListTitle()}
        <View style={{flex:0.9}}>
          <ScrollView style={{
                    flex:0.9,
                    height:400,
                    width: width,
                    paddingHorizontal:Settings.getX(12)
                    }}>
            {this.renderRecords()}
          </ScrollView>

        </View>
      </View>
    )
  }
  renderRecords(){
    let orders;
    orders=this.state.categoryLists;
    return orders.map((category, index)=>{
      return(
        <TouchableOpacity style={styles.recordView}
                key={index}
                onPress={() => this.editCategory(category)}>
          <View style={{flex:0.3, marginLeft:15,alignItems:'center',justifyContent:'center',}}>
            <Text style={styles.recordTitleFont}>{category.id}</Text>
          </View>
          <View style={{flex:0.7, marginRight:25,alignItems:'center',justifyContent:'center',}}>
            <Text style={styles.recordTitleFont}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

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
    alignItems:'center',
    justifyContent:'center',
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
  recordTitleFont:{
    fontSize:17,
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
    marginRight: Settings.getY(12),
    textAlign: 'left',
    height: 'auto',
    flex: 0.3,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,
    fontSize: 15,
  },
  input2: {
    marginTop:Settings.getY(25),
    marginRight: Settings.getY(12),
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
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  searchButtonStyle2:{
    backgroundColor:'#EA7B21',
    flex:0.3,
    marginLeft:Settings.getY(10),
    marginRight: Settings.getY(12),
    marginTop:Settings.getY(20),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    height: Settings.getY(50),
    borderColor:'#EA7B21'
  },
  searchButtonFont:{
    fontSize:15,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  },
  searchButtonFont2:{
    fontSize:15,
    paddingLeft: Settings.getX(20),
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  }
});
