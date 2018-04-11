import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Picker,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  DatePickerAndroid,
  Alert,
  PanResponder,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import Settings from '../../Config/Setting';
import CmrCategoryAction from '../../Actions/CmrCategoryAction';
import Setting from '../../Config/Setting.js'
import CategoryModule from '../../Module/Category/CategoryModule';
import {
    findIndex,
} from 'lodash';
import Loading from '../Loading';
const {height, width} = Dimensions.get('window');

export default class AddSubmenu extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    console.log(props)
    this.state={
      waiting: false,
      token: '',
      submenu:props.submenu,
      dishCopy:{},
      toppingGroupList:[],
    }
    this.items = [];
    this.order = [];
  }
  componentDidMount() {
    //  this.getToppongGroup();
  }
  goBack() {
    CmrCategoryAction.getToppongGroup();
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  onChangeTpName(text,index) {
    console.log('text',text,'index',index)
    let submenu = {...this.state.submenu};
    let newTopppingGroup = [];
    let tps = [...submenu.tps];
    tps[index] = {...tps[index], tp_name: text};
    submenu.tps = tps
    console.log(submenu)
    // arrayvar[index].tp_name = text
    // this.state.submenu.tps.map((tp,i) =>{
    //   newTopppingGroup.push(tp);
    // })
    // newTopppingGroup[index].tp_name = text;
    this.setState({ submenu });
  }
  onChangeTpPrice(text,index) {
    console.log('text',text,'index',index)
    let submenu = {...this.state.submenu};
    let newTopppingGroup = [];
    let tps = [...submenu.tps];
    tps[index] = {...tps[index], tp_price: text};
    submenu.tps = tps
    console.log(submenu)
    // arrayvar[index].tp_name = text
    // this.state.submenu.tps.map((tp,i) =>{
    //   newTopppingGroup.push(tp);
    // })
    // newTopppingGroup[index].tp_name = text;
    this.setState({ submenu });
  }
  async deleteCategory() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.deleteCategory(this.state.submenu);
         if(data.ev_error === 0) {
            Alert.alert(
                "Success",
                '删除成功',
                [
                  {text: 'Ok', onPress:()=>this.goBack()},
                ],
                { cancelable: false }
              )
         }
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
              {text: 'Ok'},
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
  async setToppingGroup() {
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
     }, 300);//add loading if request more than 200ms
    try{
        const data = await CategoryModule.setToppingGroup(this.state.submenu);
        console.log(data)
        if(data.ev_error === 0) {
            Alert.alert(
                "Success",
                '添加成功',
                [
                  {text: 'Ok', onPress:()=>this.goBack()},
                ],
                { cancelable: false }
              )
        }
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
              {text: 'Ok'},
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
  confirmDelete() {
    Alert.alert(
      "Alert",
      'Confirm Delete?',
      [
        {text: 'Cancel'},
        {text: 'Ok', onPress:()=>this.deleteToppingGroup()},
      ],
      { cancelable: false }
    )
  }
  async deleteToppingGroup() {
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
     }, 300);//add loading if request more than 200ms
    try{
        const data = await CategoryModule.deleteToppingGroup(this.state.submenu);
        console.log(data)
        if(data.ev_error === 0) {
            Alert.alert(
                "Success",
                '删除成功',
                [
                  {text: 'Ok',onPress:()=>this.goBack()},
                ],
                { cancelable: false }
              )
        }
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
              {text: 'Ok'},
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
      <KeyboardAvoidingView style = {styles.container} behavior="padding"
      >
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {this.renderNameFunction()}
          {this.renderDishIDFunction()}
          {this.renderCategoryFunction()}
          {this.renderPriceFunction()}
          {this.renderSubmenuFunction()}
          {this.renderDetialList()}
          {this.renderSaveButton()}
        </View>
      </KeyboardAvoidingView>
    )
  }
  renderNameFunction() {
    return(
            <View style={styles.listFunctionView}>
                <View style={styles.searchButtonStyle}>
                    <Text style={styles.searchButtonFont}>
                    Name
                    </Text>
                </View>
                <View style={{flex:0.65,   marginLeft: Settings.getX(30),paddingRight:Settings.getX(30), height: Settings.getY(150)}}>
                    <TextInput
                    value={this.state.submenu.tpg_name}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input }
                    onChangeText={(text) => this.setState(prevState => ({
                      submenu: {
                          ...prevState.submenu,
                          tpg_name: text
                      }})
                    )}/>
                </View>
            </View>       
      )
  }
  renderDishIDFunction() {
    return(
            <View style={styles.listFunctionView}>
                <View style={styles.searchButtonStyle}>
                    <Text style={styles.searchButtonFont}>
                    Note
                    </Text>
                </View>
                <View style={{flex:0.65,   marginLeft: Settings.getX(30), paddingRight:Settings.getX(30),height: Settings.getY(150)}}>
                    <TextInput
                    value={this.state.submenu.tpg_note}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input }
                    onChangeText={(text) => this.setState(prevState => ({
                      submenu: {
                          ...prevState.submenu,
                          tpg_note: text
                      }})
                    )}/>
                </View>
            </View>
    ) 
  }
  renderCategoryFunction() {
    return(
        <View style={styles.listFunctionView}>
            <View style={styles.searchButtonStyle}>
                <Text style={styles.searchButtonFont}>
                Max Limit
                </Text>
            </View>
            <View style={{flex:0.65,   marginLeft: Settings.getX(30), paddingRight:Settings.getX(30),height: Settings.getY(150)}}>
                <TextInput
                    keyboardType = 'numeric'
                    value={`${this.state.submenu.tpg_max_limit}`}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                style={ styles.input }
                onChangeText={(text) => this.setState(prevState => ({
                  submenu: {
                      ...prevState.submenu,
                      tpg_max_limit: text
                  }})
                )}/>
            </View>
        </View>
    ) 
  }
  renderPriceFunction() {
      return(
        <View style={styles.listFunctionView}>
            <View style={styles.searchButtonStyle}>
                <Text style={styles.searchButtonFont}>
                Min Limit
                </Text>
            </View>
            <View style={{flex:0.65,   marginLeft: Settings.getX(30),paddingRight:Settings.getX(30), height: Settings.getY(150)}}>
                <TextInput
                   keyboardType = 'numeric'
                    value={`${this.state.submenu.tpg_min_limit}`}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                style={ styles.input }
                onChangeText={(text) => this.setState(prevState => ({
                  submenu: {
                      ...prevState.submenu,
                      tpg_min_limit: text
                  }})
                )}/>
            </View>
        </View>
      )
        
      
  }
  renderSubmenuFunction() {
    return(
      <View style={[styles.listFunctionView,{borderBottomWidth:1,
        borderColor:'lightgrey'}]}>
          <View style={[styles.searchButtonStyle,{flex:0.65}]}>
              <Text style={styles.searchButtonFont}>
              Topping Group
              </Text>
          </View>
          <TouchableOpacity 
            onPress = {() => {this.addNewTopping()}}
            style={[styles.searchButtonStyle2,{marginRight: Settings.getX(30)}]}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont2}>
              Add New Topping
            </Text>
        </TouchableOpacity>
      </View>
    )
      
    
}
  renderDetialList(){
    return(
      
      <KeyboardAvoidingView style={styles.listDetailView} behavior= "padding">
          <ScrollView style={{
                    flex:1,
                    }}>
            {this.renderToppingGroup()}
          </ScrollView>
      </KeyboardAvoidingView>
    )
  }
  renderSaveButton(){
    return(
      <View style={{paddingHorizontal:Settings.getX(20),
      marginTop:Settings.getX(20),
      flex:0.1, 
      flexDirection:'row', alignContent:'center',
      justifyContent:'center',
      borderTopWidth:1,
      borderColor:'#D1D3D4',
      padding:10}}>
       
       <TouchableOpacity 
            style = {[styles.toppingGroupButton,{flex:0.4,backgroundColor:'grey',borderColor:'grey'}]}
            onPress = {() => this.confirmDelete()}>
            <Text style = {styles.saveButtonFont}>Delete</Text>
       </TouchableOpacity>
       <TouchableOpacity 
            style = {[styles.toppingGroupButton,{flex:0.4}]}
            onPress = {() => this.setToppingGroup()}>
            <Text style = {styles.saveButtonFont}>Save</Text>
       </TouchableOpacity>
      </View>
    )
  }
  renderToppingGroup() {
      return  this.state.submenu.tps.map((tp,i) =>{
            return(
            <View style={[styles.toppingGroupView]}
                  key = {i}>
               <TextInput
                    value={tp.tp_name}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input2 }
                    onChange={(event) => this.onChangeTpName(event.nativeEvent.text,i)}
               />
               <TextInput
                    value={tp.tp_price}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input2 }
                    onChange={(event) => this.onChangeTpPrice(event.nativeEvent.text,i)}
               />
                <TouchableOpacity style = {{marginTop:Settings.getY(10)}} onPress = {() => this.removeFromToppingGroup(tp)}>
                              <Image
                                  style={styles.button}
                                  source={require('./Image/icon-delete.png')}
                              />
                </TouchableOpacity>
            </View>
            )}
        )
  }
  addToToppingGroup(item) {
    console.log(item)
    let dish = {...this.state.dish};
    let newToppingGroup = [item];
    const newDishTP = dish.tpgs.concat(newToppingGroup)
    console.log(newDishTP)
    this.setState(prevState => ({
      dish: {
          ...prevState.dish,
          tpgs: newDishTP
      }
     }))
     setTimeout(() => {
        console.log(this.state.dish)
     }, 1000);
  }
  removeFromToppingGroup(item) {
    let submenu = {...this.state.submenu};
    submenu.tps = submenu.tps.filter(function(el) {
    return el.tp_id !== item.tp_id;
    });
    this.setState({submenu});
  }
  addNewTopping() {
    let submenu = {...this.state.submenu};
    let newTP = [{
        tp_name:'',
        tp_price: '0.00'
    }];
    const newToppingGroup = newTP.concat(submenu.tps)
    this.setState(prevState => ({
      submenu: {
          ...prevState.submenu,
          tps: newToppingGroup
      }
    }))
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
    paddingHorizontal:Settings.getX(20),
    flex:0.45,
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
    borderTopWidth:1,
    marginHorizontal:5,
    paddingTop:Settings.getY(20),
  },
  toppingGroupView:{
    height:'auto',
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    marginHorizontal:5,
    paddingTop:Settings.getY(5),
    paddingBottom:Settings.getY(5)
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
    marginRight: Settings.getY(20),
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
    marginTop:Settings.getY(10),
    marginRight: Settings.getY(20),
    textAlign: 'left',
    height: 'auto',
    flex: 0.4,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,
    fontSize: 15,
  },
  select: {
    marginTop:Settings.getY(25),
    height: 'auto',
    flex: 0.3,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,
  },
  searchButtonStyle2:{
    backgroundColor:'grey',
    flex:0.65,
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
  searchButtonFont2:{
    fontSize:15,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  },
  toppingGroupButton:{
    backgroundColor:'#EA7B21',
    marginLeft:Settings.getY(10),
    marginRight: Settings.getY(10),
    paddingTop:Settings.getY(10),
    paddingBottom:Settings.getY(10),
    paddingLeft:Settings.getY(10),
    paddingRight:Settings.getY(10),
    height: 'auto',
    width:'auto',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#EA7B21'
  },
  toppingGroupButtonFont:{
      flex:0.86,
    fontSize:16,
    fontWeight:'300',
    fontFamily: 'Noto Sans CJK SC',
    color: 'black'
  },
  saveButtonFont:{
    textAlign:'center',
  fontSize:16,
  fontWeight:'300',
  fontFamily: 'Noto Sans CJK SC',
  color: 'white'
},
  searchButtonFont:{
    fontSize:18,
    fontFamily: 'Noto Sans CJK SC',
    color: 'black',
    fontWeight:'500'
  },
  searchButtonStyle:{
    flex:0.35,
    marginLeft:Settings.getY(10),
    height: Settings.getY(50),
    marginTop:Settings.getY(20),
    alignItems:'center',
    flexDirection:'row',
  },
  button: {
    width:Settings.getX(30),
    height:Settings.getY(33),
  },
});
