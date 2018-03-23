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
import Setting from '../../Config/Setting.js'
import CmrCategoryAction from '../../Actions/CmrCategoryAction';
import CmrCategoryStore from '../../Stores/CmrCategoryStore';
import CategoryModule from '../../Module/Category/CategoryModule';
import {
    findIndex,
} from 'lodash';
import Loading from '../Loading';
const {height, width} = Dimensions.get('window');

export default class AddDish extends Component {
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
      dish:props.dish,
      dishCopy:{},
      toppingGroupList:[],
      category:[],
    }
    this.items = [];
    this.order = [];
  }

  componentDidMount() {
    CmrCategoryStore.addChangeListener(this._onChange);
    CmrCategoryAction.getToppongGroup();
    CmrCategoryAction.getCategoryLists();
  }
  componentWillUnmount() {
    CmrCategoryStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const newState = CmrCategoryStore.getState();
   this.setState({
     toppingGroupList: newState.toppingGroupList,
     category:newState.categoryOptions
   })
 }
  goBack() {
    CmrCategoryAction.getCategoryLists();
    CmrCategoryAction.updateSelecedCategory(this.state.dish);
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  confirmDelete() {
    Alert.alert(
      "Alert",
      'Confirm Delete?',
      [
        {text: 'Cancel'},
        {text: 'Ok', onPress:()=>this.deleteDish()},
      ],
      { cancelable: false }
    )
  }
  async deleteDish() {
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
     }, 300);//add loading if request more than 200ms
    try{
        const data = await CategoryModule.deleteDish(this.state.dish);
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
  async setDish() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{ 
         this.state.dish.tpgs.forEach(item => {
            delete item.tpg_max_limit;
            delete item.tpg_min_limit;
            delete item.tpg_note;
            delete item.tps;
         });
         if(this.state.dish.ds_id) {
          const data = await CategoryModule.setDish(this.state.dish);
          if(data.ev_error === 0) {
           Alert.alert(
             "Success",
             '保存成功',
             [
               {text: 'Ok',onPress:()=>this.goBack()},
             ],
             { cancelable: false }
           )
          }
          clearTimeout(loadingTimeout);
          this.refs.loading.endLoading();
         } else {
          const data = await CategoryModule.addDish(this.state.dish);
          if(data.ev_error === 0) {
           Alert.alert(
             "Success",
             '保存成功',
             [
               {text: 'Ok'},
             ],
             { cancelable: false }
           )
          }
          clearTimeout(loadingTimeout);
          this.refs.loading.endLoading();
         }
         
    }catch(error){
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
      <View style={styles.container}>
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
      </View>
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
                <View style={{flex:0.73,   marginLeft: Settings.getX(30),paddingRight:Settings.getX(30), height: Settings.getY(150)}}>
                    <TextInput
                    value={this.state.dish.ds_name}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input }
                    onChangeText={(text) => this.setState(prevState => ({
                      dish: {
                          ...prevState.dish,
                          ds_name: text
                      }})
                    )}
                    />
                </View>
            </View>       
      )
  }
  renderDishIDFunction() {
    return(
            <View style={styles.listFunctionView}>
                <View style={styles.searchButtonStyle}>
                    <Text style={styles.searchButtonFont}>
                    Dish ID
                    </Text>
                </View>
                <View style={{flex:0.73,   marginLeft: Settings.getX(30), paddingRight:Settings.getX(30),height: Settings.getY(150)}}>
                    <TextInput
                    value={this.state.dish.int_no}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    style={ styles.input }
                    onChangeText={(text) => this.setState(prevState => ({
                      dish: {
                          ...prevState.dish,
                          int_no: text
                      }})
                    )}
                    />
                </View>
            </View>
    ) 
  }
  renderCategoryFunction() {
    let category = this.state.category.map( (category, i) => {
        return <Picker.Item key={i} value={category.dt_id} label={category.name} />
     });
      return(
        <View style={styles.listFunctionView}>
            <View style={styles.searchButtonStyle}>
                <Text style={styles.searchButtonFont}>
                Category
                </Text>
            </View>
            <View style={{flex:0.73,   marginLeft: Settings.getX(30), paddingRight:Settings.getX(30), height: Settings.getY(150)}}>
            
            
            <Picker
                style= {styles.select}
                selectedValue={this.state.dish.dt_id}
                onValueChange={ (service) => ( this.setState(prevState => ({
                    dish: {
                        ...prevState.dish,
                        dt_id: service
                    }
                })) ) } >
                {category}
            </Picker>
            </View>
        </View>
      )
      
  }
  renderPriceFunction() {
      return(
        <View style={styles.listFunctionView}>
            <View style={styles.searchButtonStyle}>
                <Text style={styles.searchButtonFont}>
                Price
                </Text>
            </View>
            <View style={{flex:0.73,   marginLeft: Settings.getX(30),paddingRight:Settings.getX(30), height: Settings.getY(150)}}>
                <TextInput
                    value={this.state.dish.ds_price}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                style={ styles.input }
                onChangeText={(text) => this.setState(prevState => ({
                  dish: {
                      ...prevState.dish,
                      ds_price: text
                  }})
                )}
                />
            </View>
        </View>
      )
        
      
  }
  renderSubmenuFunction() {
    return(
      <View style={[styles.listFunctionView,{borderBottomWidth:1, paddingBottom:Settings.getX(15),
        borderColor:'lightgrey'}]}>
          <View style={[styles.searchButtonStyle,{flex:0.65}]}>
              <Text style={styles.searchButtonFont}>
              Submenu
              </Text>
          </View>
          <TouchableOpacity
            onPress = {() => this.goToAddSubmunu()}
            style={[styles.searchButtonStyle2,{marginRight: Settings.getX(30)}]}
            disabled={this.state.waiting}
        >
            <Text style={styles.searchButtonFont2}>
              Add Submenu
            </Text>
        </TouchableOpacity>
      </View>
    )
      
    
}
  renderDetialList(){
    return(
      <View style={styles.listDetailView}>
          <ScrollView style={{
                    flex:1,
                    }}>
            {this.renderToppingGroup()}
          </ScrollView>
      </View>
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
            onPress = {() => this.setDish()}>
            <Text style = {styles.saveButtonFont}>Save</Text>
       </TouchableOpacity>
       
      </View>
    )
  }
  renderToppingGroup() {
      return  this.state.toppingGroupList.map((tpg,i) =>{
        const selectIndex = findIndex(this.state.dish.tpgs,{tpg_id: tpg.tpg_id});
        if(selectIndex === -1) {
            return(
                <View style={[styles.toppingGroupView]}
                      key = {i}>
                          <Text style={styles.toppingGroupButtonFont}>
                          {tpg.tpg_name} ({tpg.tpg_note})
                          </Text>    
                          <TouchableOpacity onPress = {() => this.addToToppingGroup(tpg)}>
                              <Image
                                  style={styles.button}
                                  source={require('./Image/icon-add.png')}
                              />
                          </TouchableOpacity>
                </View>
              );
        } else {
            return(
            <View style={[styles.toppingGroupView]}
                      key = {i}>
                          <Text style={styles.toppingGroupButtonFont}>
                          {tpg.tpg_name}
                          </Text>    
                          <TouchableOpacity onPress = {() => this.removeFromToppingGroup(tpg)}>
                              <Image
                                  style={styles.button}
                                  source={require('./Image/icon-checked.png')}
                              />
                          </TouchableOpacity>
                </View>
            )}
        
      })
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
  }
  removeFromToppingGroup(item) {
    let dish = {...this.state.dish};
    dish.tpgs = dish.tpgs.filter(function(el) {
    return el.tpg_id !== item.tpg_id;
    });
    this.setState({dish});
  }
  goToAddSubmunu() {
    const item = {
      tpg_max_limit:'',
      tpg_min_limit:'',
      tpg_name:'',
      tpg_note:'',
      tps:[]
    }
    this.props.navigator.push({
      screen: 'AddSubmenu',
      title: 'Add Submenu',
      navigatorStyle: {
        navBarHidden: false,
      },
      passProps: {
          submenu:item,
      },
      animationType: 'screen'
    });
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
    flex:0.4,
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
    paddingTop:Settings.getY(15),
    paddingBottom:Settings.getY(15),
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
    flex:0.35,
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
    flex:0.27,
    marginLeft:Settings.getY(10),
    height: Settings.getY(50),
    marginTop:Settings.getY(20),
    alignItems:'center',
    flexDirection:'row',
  },
  button: {
    width:Settings.getX(31),
    height:Settings.getY(34),
  },
});
