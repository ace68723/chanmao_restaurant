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
  AsyncStorage,
  Switch
} from 'react-native';
import {
  findIndex,
} from 'lodash';
import Settings from '../../Config/Setting';
import Setting from '../../Config/Setting.js'
import CategoryModule from '../../Module/Category/CategoryModule';
import CmrCategoryAction from '../../Actions/CmrCategoryAction';
import CmrCategoryStore from '../../Stores/CmrCategoryStore';
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
      editLevel:false,
      category:{},
      waiting: false,
      keyword:'',
      dishLists:[],
      searchedDishes:[],
      searchText:'',
    }
    this.items = [];
    this.order = [];
    this.onChangeText = this.onChangeText.bind(this);
    this._handleOpen = this._handleOpen.bind(this);
    this._onChange = this._onChange.bind(this);

  }

// drag and drop
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
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        }
    });
  }

  _getIdByPosition(pageY){
    let id = -1;
    const height = 49;
    for (let i = 0; i < this.state.dishLists.length; i++) {
      if(pageY >= height*(i+1) && pageY < height*(i+2)){
        return i
      }
    }
  }

  _getTopValueYById(id){
    const height = 49;
    return (id + 1) * height;
  }
  componentDidMount() {
    CmrCategoryStore.addChangeListener(this._onChange);
    this._onChange()
  }
  componentWillUnmount() {
    CmrCategoryStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const newState = CmrCategoryStore.getState();
    this.setState({
      dishLists: newState.selectedCateDishes,
      keyword: newState.keyword,
      category:newState.selectedCategory,
    })
  }
  startLeveling() {
    newLevel = !this.state.editLevel
    this.setState({
      editLevel: newLevel
    })
  }
// drag and drop end
// go to
  goToAddDish(item) {
    if(!item) {
      let dish = {
        ds_name: '',
        ds_price: '',
        int_no: '',
        dt_id: 0,
        tpgs:[],
      }
      this.props.navigator.showModal({
        screen: 'AddDish',
        title: 'Dish',
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {
            dish:dish,
            categoryOptions: this.state.categoryOptions,
            toppingGroupList:this.state.toppingGroupList,
            getCategoryLists: () => this.props.getCategoryLists(),
        },
        animationType: 'screen'
      });
    } else {
      this.props.navigator.showModal({
        screen: 'AddDish',
        title: 'Dish',
        navigatorStyle: {
          navBarHidden: false,
        },
        passProps: {
            dish:item,
            categoryOptions: this.state.categoryOptions,
            toppingGroupList:this.state.toppingGroupList,
            getCategoryLists: () => this.props.getCategoryLists(),
        },
        animationType: 'screen'
      });
    }

  }
  goBack() {
    CmrCategoryAction.getDishes();
    CmrCategoryAction.getCategoryLists();
    this.props.navigator.dismissModal({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  goToSaveCName() {
    this.props.navigator.showLightBox({
      screen: "ChangeCategoryName",
      passProps: {
        category:this.state.category,
        keyword:this.state.keyword,
        getCategoryLists: () => this.props.getCategoryLists(),
      }, // simple serializable object that will pass as props to the lightbox (optional)
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }

// go to end
  confirmDelete() {
    Alert.alert(
      "Alert",
      'Confirm Delete?',
      [
        {text: 'Cancel'},
        {text: 'Ok', onPress:()=>this.deleteCategory()},
      ],
      { cancelable: false }
    )
  }
  async deleteCategory() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.deleteCategory(this.state.category.dt_id);

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
  onChangeText(text) {
    this.setState({
        searchText:text,
        searchedDishes:[]
    })
    let dishesList = [];
    this.state.dishLists.forEach((item, index) => {
      if (item.ds_name.includes(text)) {
        dishesList.push(item);
      }
    });
    this.setState({
        searchedDishes:dishesList
    })
  }
  async _handleOpen(item,value) {
    var dishLists = this.state.dishLists.slice()
    const selectIndex = findIndex(this.state.dishLists,{int_no: item.int_no});
    dishLists[selectIndex] = {...dishLists[selectIndex], status: value};
    this.setState({dishLists});
    const loadingTimeout = setTimeout(() => {
      this.refs.loading.startLoading();
     }, 300);//add loading if request more than 200ms
    try{
        const data = await CategoryModule.setDishStatus(item,value);
        console.log(data)
        clearTimeout(loadingTimeout);
        this.refs.loading.endLoading();
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
          Alert.alert(
            "ERROR",
            '修改失败, 请联系客服',
            [
              {text: 'Ok'},
            ],
            { cancelable: false }
          )

          clearTimeout(loadingTimeout);
          this.refs.loading.endLoading();
          return
        }

    }
  }
// render
  renderButtonArea() {
    return(
    <View style ={{flex:0.08,flexDirection:'row'}}>
    <TouchableOpacity
        onPress={() => this.confirmDelete()}
        style = {{flex:1,
          backgroundColor:'#f4f4f4',
          justifyContent:'center',
          alignContent:'center',
          borderColor:'#6D6E71',
          borderTopWidth:0.5,
          borderRightWidth:0.5}}>
         <Text
            style={{textAlign:'center',
            color:'#6D6E71',
            fontSize:17,
            fontWeight:'bold'}}>
          Delete
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.goToSaveCName()}
        style = {{flex:1,
          backgroundColor:'#f4f4f4',
          justifyContent:'center',
          alignContent:'center',
          borderColor:'#6D6E71',
          borderTopWidth:0.5,
          borderRightWidth:0.5}}>
         <Text
            style={{
            textAlign:'center',
            color:'#6D6E71',
            fontSize:17,
            fontWeight:'bold'}} >
          Change Name
         </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.goToAddDish()}
        style = {{flex:1,
          flexDirection:'row',
          paddingTop:Settings.getY(15),
          backgroundColor:'white',
          justifyContent:'center',
          alignContent:'center',
          borderColor:'#6D6E71',
          borderTopWidth:0.5,
          borderRightWidth:0.5}}>
          <Image
                                 style = {{width:Settings.getX(31),
                                  height:Settings.getY(33), marginRight:Settings.getX(10)}}
                                  source={require('./Image/icon-add.png')}
                              />
         <Text 
            style={{
            textAlign:'center',
            color:'#6D6E71',
            fontSize:17,
            fontWeight:'bold'}} >
          Add Dish
         </Text>
      </TouchableOpacity>
    </View>
    )

  }
  renderListFunction(){
    return(
      <KeyboardAvoidingView style={styles.listFunctionView}>
        <View style={{flex:0.7,    height: Settings.getY(150)}}>
            <TextInput
            value = {this.state.searchText}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={this.onChangeText}
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
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.15,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>ID</Text>
        </View>
        <View style={{flex:0.4,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Name</Text>
        </View>

        <View style={{flex:0.2,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Price</Text>
        </View>
        <View style={{flex:0.2,alignItems:'flex-start'}}>
          <Text style={styles.listTitleFont}>Open</Text>
        </View>
        {this.renderLeveling()}

      </View>
    )
  }
  renderLeveling() {
    if(!this.state.editLevel) {
      return(
        <TouchableOpacity style={{flex:0.05,alignItems:'center',justifyContent:'center',}} onPress = {() => this.startLeveling()}>
        <Image
            style={styles.button}
            source={require('./Image/levels.png')}
        />
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity style={{flex:0.05,alignItems:'center',justifyContent:'center',}} onPress = {() => this.startLeveling()}>
        <Image
            style={styles.button}
            source={require('./Image/icon-checked.png')}
        />
        </TouchableOpacity>
      )
    }

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
    if(this.state.searchText.length === 0) {
      return this.state.dishLists.map((item, i)=>{
        this.order.push(item);
        return (
          <TouchableOpacity
          onPress ={()=>this.goToAddDish(item)}
          {...this._panResponder.panHandlers}
                ref={(ref) => this.items[i] = ref}
                key={i}>
            <View  style={[styles.recordView]}>
                     <View style={{flex:0.15,alignItems:'flex-start'}}>
                      <Text style={styles.listTitleFont}>{item.int_no}</Text>
                    </View>
                    <View style={{flex:0.4,alignItems:'flex-start'}}>
                      <Text style={styles.listTitleFont}>{item.ds_name}</Text>
                    </View>

                    <View style={{flex:0.2,alignItems:'flex-start'}}>
                      <Text style={styles.listTitleFont}>{item.ds_price}</Text>
                    </View>
                    <View style={{flex:0.2,alignItems:'flex-start'}}>
                      <Switch
                        value = {item.status}
                        onValueChange = {(value) => this._handleOpen(item,value)}
                      />
                    </View>
                    <View style={{flex:0.05,alignItems:'flex-start'}}></View>
            </View>
            <View>
              {this.renderToppingGroup(item)}
            </View>
          </TouchableOpacity>

        );
      })
    } else {
      return this.state.searchedDishes.map((item, i)=>{
        this.order.push(item);
        return (
          <TouchableOpacity
          {...this._panResponder.panHandlers}
                ref={(ref) => this.items[i] = ref}
                key={i}
                onPress= {()=>this.goToAddDish(item)}>
            <View  style={[styles.recordView]}>
                     <View style={{flex:0.15,paddingLeft:Settings.getX(2)}}>
                      <Text style={styles.listTitleFont}>{item.int_no}</Text>
                    </View>
                    <View style={{flex:0.3,paddingLeft:Settings.getX(2)}}>
                      <Text style={styles.listTitleFont}>{item.ds_name}</Text>
                    </View>
                    <View style={{flex:0.4,paddingLeft:Settings.getX(35)}}>
                      <Text style={styles.listTitleFont}>{item.dt_name}</Text>
                    </View>
                    <View style={{flex:0.15,paddingLeft:Settings.getX(50)}}>
                      <Text style={styles.listTitleFont}>{item.ds_price}</Text>
                    </View>
            </View>
            <View>
              {this.renderToppingGroup(item)}
            </View>
          </TouchableOpacity>

        );
    })
    }

  }
  renderToppingGroup(item) {
    if(item.tpgs.length === 0) {
      return;
    } else {
      return (
        <View style={{flexDirection:'row',flexWrap: 'wrap',marginBottom:5}}>
            {item.tpgs.map((tpg,i) =>{
                return  this.renderTPS(tpg,i)
            })}
        </View>
      )
    }
  }
  renderTPS(tp,i) {
   return(
      <TouchableOpacity
          style={styles.toppingGroupButton}
          disabled={true}
          key = {i}
      >
          <Text style={styles.toppingGroupButtonFont}>
          {tp.tpg_name}
          </Text>
      </TouchableOpacity>
   )
  }
  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
          {this.renderListFunction()}
          {this.renderDetialList()}
          {this.renderButtonArea()}
        </View>
      </View>
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
    flex:0.83,
  },
  listTitles:{
    flexDirection:'row',
    flex:0.07,
    marginHorizontal: Settings.getX(5),
    paddingHorizontal:Settings.getX(20),
    paddingTop:Settings.getY(10),
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
  toppingGroupView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
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
  toppingGroupButton:{
    backgroundColor:'#EA7B21',
    marginLeft:Settings.getY(5),
    marginRight: Settings.getY(5),
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
  }
});
