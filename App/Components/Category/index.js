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
  PanResponder,
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
      categoryLists:[],
      waiting: false,
      keyword: '',
      token: '',
      restaurantList:[]
    }
    this.items = [];
    this.order = [];
    this.onChangeText = this.onChangeText.bind(this);
    this.editCategory =this.editCategory.bind(this);
  }
  componentWillMount(){
    this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            const {pageY, locationY} = evt.nativeEvent;
            this.index = this._getIdByPosition(pageY);
            this.preY = pageY - locationY;
            //get the taped item and highlight it
            let item = this.items[this.index];
            item.setNativeProps({
                style: {
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowOffset: {height: 0, width: 2},
                    elevation: 5
                }
            });
        },
        onPanResponderMove: (evt, gestureState) => {
            let top = this.preY + gestureState.dy;
            let item = this.items[this.index];
            item.setNativeProps({
                style: {top: top}
            });

            let collideIndex = this._getIdByPosition(evt.nativeEvent.pageY);
            if(collideIndex !== this.index && collideIndex !== -1) {
                let collideItem = this.items[collideIndex];
                collideItem.setNativeProps({
                    style: {top: this._getTopValueYById(this.index)}
                });
                //swap two values
                [this.items[this.index], this.items[collideIndex]] = [this.items[collideIndex], this.items[this.index]];
                [this.order[this.index], this.order[collideIndex]] = [this.order[collideIndex], this.order[this.index]];
                this.index = collideIndex;
            }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            const shadowStyle = {
                shadowColor: "#000",
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowOffset: {height: 0, width: 0,},
                elevation: 0
            };
            let item = this.items[this.index];
            //go back the correct position
            item.setNativeProps({
                style: {...shadowStyle, top: this._getTopValueYById(this.index)}
            });
            console.log(this.order);
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        }
    });
  }
  componentDidMount() {
    this.getCategoryLists();
  }
  _getIdByPosition(pageY){
    let id = -1;
    const height = 49;
    for (let i = 0; i < this.state.categoryLists.length; i++) {
      if(pageY >= height*(i+1) && pageY < height*(i+2)){
        return i
      }
    }
  }

  _getTopValueYById(id){
    const height = 49;
    return (id + 1) * height;
  }
  editCategory(item) {
    this.props.navigator.showModal({
        screen: 'Dish',
        title: item.name,
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {
            category:item,
            getCategoryLists: () => this.getCategoryLists(),
        },
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
  async addCategory(keyword) {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.addCategory(this.state.keyword);
         console.log(data)
         if(data.ev_error === 0) {
            Alert.alert(
                "Success",
                '添加成功',
                [
                  {text: 'Ok'},
                ],
                { cancelable: false }
              )
         }
         clearTimeout(loadingTimeout);
         this.refs.loading.endLoading();
         this.getCategoryLists();
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
  async getCategoryLists() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.getCategoryLists();
         console.log(data)
         this.setState({
            categoryLists: data.ea_data,
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
            {text: 'Ok'},
            //   {text: 'Ok', onPress:()=>this._logOut()},
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
            value={this.state.keyword}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={(text) => this.setState({keyword:text})}
            />
        </View>
        <TouchableOpacity
            style={styles.searchButtonStyle}
            onPress={() => this.addCategory()}
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
       return this.state.categoryLists.map((item, i)=>{
            this.order.push(item);
            console.log(item)
            return (
                <View
                    {...this._panResponder.panHandlers}
                    ref={(ref) => this.items[i] = ref}
                    key={i}
                    style={[styles.recordView]}>
                    <TouchableOpacity style={{flex:0.3, marginLeft:15,alignItems:'center',justifyContent:'center',}}
                    onPress={() => this.editCategory(item)}>
                      <Text style={styles.recordTitleFont}>{item.dt_id}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:0.7, marginRight:25,alignItems:'center',justifyContent:'center',}}
                    onPress={() => this.editCategory(item)}>
                      <Text style={styles.recordTitleFont}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            );
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
  item: {
    flexDirection: 'row',
    height: 49,
    width:width,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    position: 'absolute',
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
