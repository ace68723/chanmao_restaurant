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
  KeyboardAvoidingView,
  Alert,
  PanResponder,
  TextInput,
  AsyncStorage
} from 'react-native';
import Settings from '../../Config/Setting';
import Setting from '../../Config/Setting.js'
import CategoryModule from '../../Module/Category/CategoryModule';
import CmrCategoryAction from '../../Actions/CmrCategoryAction';
import CmrCategoryStore from '../../Stores/CmrCategoryStore';
import Loading from '../Loading';
const {height, width} = Dimensions.get('window');

export default class Submenu extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    this.state={
        toppingGroupList:[],
        waiting: false,
    }
    this._onChange = this._onChange.bind(this);

  }
  // async getToppongGroup() {
  //   const loadingTimeout = setTimeout(() => {
  //       this.refs.loading.startLoading();
  //      }, 300);//add loading if request more than 200ms
  //   try{
  //        const data = await CategoryModule.getToppongGroup();
  //        console.log(data)
  //        this.setState({
  //           toppingGroupList:data.ea_tpgs,
  //       })
  //        clearTimeout(loadingTimeout);
  //        this.refs.loading.endLoading();
  //   }catch(error){
  //       clearTimeout(loadingTimeout);
  //       this.refs.loading.endLoading();
  //       if (error == '用户超时，请退出重新登陆') {
  //         Alert.alert(
  //           "ERROR",
  //           '用户超时，请退出重新登陆',
  //           [
  //             {text: 'Ok'},
  //           ],
  //           { cancelable: false }
  //         )
  
  //       } else {
  //         clearTimeout(loadingTimeout);
  //         this.refs.loading.endLoading();
  //         return
  //       }
  
  //   } 
  // }
  componentDidMount() {
    CmrCategoryStore.addChangeListener(this._onChange);
    CmrCategoryAction.getToppongGroup();
  }
  componentWillUnmount() {
    CmrCategoryStore.removeChangeListener(this._onChange);
  }
  _onChange() {
      const newState = CmrCategoryStore.getState();
    this.setState({
      toppingGroupList: newState.toppingGroupList,
    })
  }
  goToAddSubmenu(item) {
    if(!item) {
      const dish = {
        tpg_max_limit:'',
        tpg_min_limit:'',
        tpg_name:'',
        tpg_note:'',
        tps:[]
      } 
      this.props.navigator.showModal({
        screen: 'AddSubmenu',
        title: 'Add Submenu',
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {
            submenu:dish,
            getCategoryLists: () => this.props.getCategoryLists(),
            getToppongGroup: () => this.getToppongGroup(),
        },
        animationType: 'screen'
      });
    } else {
      this.props.navigator.showModal({
        screen: 'AddSubmenu',
        title: 'Edit Submenu',
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {
            submenu:item,
            getCategoryLists: () => this.props.getCategoryLists(),
            getToppongGroup: () => this.getToppongGroup(),
        },
        animationType: 'screen'
      });

    }

  }
// render
  render(){
    return(
      <KeyboardAvoidingView style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {/* {this.renderSelectDate()} */}
          {this.renderCatFunction()}
          {this.renderDetialList()}
        </View>
      </KeyboardAvoidingView>
    )
  }
  renderListFunction(){
    return(
      <KeyboardAvoidingView style={styles.listFunctionView}>
        <TouchableOpacity
            style={[styles.searchButtonStyle]}
            onPress={() => this.goToAddDish()}
            disabled={this.state.waiting}>
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
            disabled={this.state.waiting}
        >
            <Image source={require('./Image/search.png')} style={{
              width:Settings.getX(26), height:Settings.getY(26)}} />
            <Text style={styles.searchButtonFont2}>
              Search
            </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
  renderCatFunction(){
    return(
      <View style={styles.listFunctionView}>
        <TouchableOpacity
            style={styles.searchButtonStyle}
            onPress={() => this.goToAddSubmenu()}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont}>
              Add Submenu
            </Text>
        </TouchableOpacity>
        
      </View>
    )
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.4,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Submenu</Text>
        </View>
        <View style={{flex:0.15,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>MAX</Text>
        </View>
        <View style={{flex:0.15,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>MIN</Text>
        </View>
        <View style={{flex:0.3,paddingLeft:0,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Note</Text>
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
                    flex:1,
                    height:400,
                    width: width,
                    }}>
            {this.renderRecords()}
          </ScrollView>

        </View>
      </View>
    )
  }
  renderRecords(){
    return this.state.toppingGroupList.map((tp, index)=>{
        return(
            <TouchableOpacity
               onPress ={()=>this.goToAddSubmenu(tp)}
              key={index}>
          <View style={styles.recordView}
                  key={index}>
            <View style={{flex:0.4,  alignItems:'flex-start'}}>
              <Text style={styles.recordTitleFont}>{tp.tpg_name}</Text>
            </View>
            <View style={{flex:0.15, alignItems:'flex-start'}}>
              <Text style={styles.recordTitleFont}>{tp.tpg_max_limit}</Text>
            </View>
            <View style={{flex:0.15,  alignItems:'flex-start'}}>
              <Text style={styles.recordTitleFont}>{tp.tpg_min_limit}</Text>
            </View>
            <View style={{flex:0.3,  alignItems:'flex-start'}}>
              <Text style={styles.recordTitleFont}>{tp.tpg_note}</Text>
            </View>
          </View>
          <View>
          {this.renderToppingGroup(tp)}
          </View>
        </TouchableOpacity>
        )
      })
  }
  renderToppingGroup(item) {
    if(item.tps.length === 0) {
      return;
    } else {
      return (
        <View style={{flexDirection:'row',flexWrap: 'wrap',marginBottom:Settings.getX(10), marginLeft:Settings.getX(10),}}>
            {item.tps.map((tp,i) =>{
                console.log(tp);
                return  this.renderTPS(tp,i)
            })}
        </View>
      )
    }
  }
  renderTPS(tp,i) {
      console.log(tp)
     return(

            <TouchableOpacity
                style={styles.toppingGroupButton}
                disabled={true}
                key = {i}
            >
                <Text style={styles.toppingGroupButtonFont}>
                {tp.tp_name} + {tp.tp_price}
                </Text>
            </TouchableOpacity>
    ) 
  }
// render end
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
    flex:0.07,
    paddingHorizontal:Settings.getX(20),
    marginHorizontal: Settings.getX(5),
    paddingTop:Settings.getY(10),
    justifyContent:'center',
  },
  recordView:{
    height:'auto',
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    borderTopWidth:1,
    paddingHorizontal:Settings.getX(20),
    marginHorizontal:Settings.getX(5),
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(20),
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'black',
    alignContent:'center',
    justifyContent:'center',
  },
  toppingGroupView:{
    flexDirection:'row',
    borderColor:'#D1D3D4',
    backgroundColor:'red',
    width:'auto',
    paddingTop:Settings.getY(10),
    paddingBottom:Settings.getY(10)
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
    flex:0.45,
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

  toppingGroupButton:{
    backgroundColor:'#EA7B21',
    marginLeft:Settings.getY(5),
    marginRight: Settings.getY(5),
    marginBottom: Settings.getY(5),
    padding:Settings.getY(5),
    height: 'auto',
    width:'auto',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  toppingGroupButtonFont:{
    fontSize:12,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
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
  },
  button: {
    width:Settings.getX(34),
    height:Settings.getY(34),
  },
  toppingGroupView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
  },
});
