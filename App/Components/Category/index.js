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
import CmrCategoryAction from '../../Actions/CmrCategoryAction';
import CmrCategoryStore from '../../Stores/CmrCategoryStore';
const {height, width} = Dimensions.get('window');

export default class Category extends Component {
  static navigatorStyle = {
    navBarTextColor:"#EA7B21",
    navBarBackgroundColor:"white",
    navBarButtonColor:"#EA7B21"
  }
  constructor(props){
    super(props);
    this.state = CmrCategoryStore.getState();
    this.items = [];
    this.order = [];
    this.goToCategoryDetail =this.goToCategoryDetail.bind(this);
    this.goToAddDish =this.goToAddDish.bind(this);
    this.goToSubmenu =this.goToSubmenu.bind(this);
    this.goToAddCategory =this.goToAddCategory.bind(this);
    this.goToSearchPage =this.goToSearchPage.bind(this);
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
            console.log(this.order);
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        }
    });
  }
  componentDidMount() {
    CmrCategoryStore.addChangeListener(this._onChange);
    CmrCategoryAction.getDishes();
    CmrCategoryAction.getCategoryLists();
  }
  componentWillUnmount() {
    CmrCategoryStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(CmrCategoryStore.getState());
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
// drag and drop end
// goTo
  goToAddDish() {
    let dish = {
      ds_name: '',
      ds_price: '',
      int_no: '',
      dt_id: 0,
      tpgs:[]
    }
    this.props.navigator.push({
      screen: 'AddDish',
      title: 'Dish',
      navigatorStyle: {
        navBarHidden: false,
      },
      passProps: {
          dish:dish,
          categoryOptions: this.state.categoryOptions,
          toppingGroupList:this.state.toppingGroupList,
          getCategoryLists: () => this.getCategoryLists(),
      },
      animationType: 'screen'
    });


  }
  goToSubmenu() {
    this.props.navigator.push({
      screen: 'Submenu',
      title: 'Submenu',
      navigatorStyle: {
        navBarHidden: false,
      },
      passProps: {
        getCategoryLists: () => this.getCategoryLists(),
    },
      animationType: 'screen'
    });
  }
  goToCategoryDetail(item) {
    CmrCategoryAction.updateSelecedCategory(item);
    this.props.navigator.push({
        screen: 'Dish',
        title: item.name,
        navigatorStyle: {
          navBarHidden: false,
        },

        animationType: 'screen'
      });
  }
  goToAddCategory() {
    this.props.navigator.showLightBox({
      screen: "AddNewCategory",
      passProps: {
        getCategoryLists: () => this.getCategoryLists(),
      }, // simple serializable object that will pass as props to the lightbox (optional)
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
  goToSearchPage() {
    this.props.navigator.push({
      screen: "SearchPage",
      title: 'Search Dishes',
        navigatorStyle: {
          navBarHidden: false,
        },
      passProps: {
        categoryOptions:this.state.categoryOptions,
      }, // simple serializable object that will pass as props to the lightbox (optional)
      adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
     });
  }
// goTo end
  async getToppongGroup() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
      }, 300);//add loading if request more than 200ms
    try{
        const data = await CategoryModule.getToppongGroup();
        this.setState({
            toppingGroupList:data.ea_tpgs,
        })
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
  async getDishes() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.getDishes();
         data.ea_dishes.forEach(item => {
           if(item.status === 0) {
             item.status = true;
           } else {
             item.status = false;
           }
         });
         this.setState({
            dishLists:data.ea_dishes,
        })
        console.log(this.state.dishLists)         
        if(data.ev_error === 0) {
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
  async getCategoryLists() {
    let typeOptions = [{dt_id:0, name:'Please Select Category'}];
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.getCategoryLists();
         console.log(data)
         data.ea_data.forEach(item => {
          const data = {
            dt_id: 0,
            name: ''
          };
          data.dt_id = item.dt_id;
          data.name = item.name;
          typeOptions.push(data);
      });
         this.setState({
            categoryLists: data.ea_data,
            categoryOptions:typeOptions
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
  startLeveling() {
    newLevel = !this.state.editLevel
    this.setState({
      editLevel: newLevel
    })
  }
// render
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.3,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>ID</Text>
        </View>
        <View style={{flex:0.65,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>Name</Text>
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
  renderButtonArea() {
    return(
    <View style ={{flex:0.08,flexDirection:'row'}}>
      <TouchableOpacity 
        onPress={() => this.goToAddCategory()}
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
          Add Category
         </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => this.goToSubmenu()}
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
          Submenu
         </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.goToAddDish()}
        style = {{flex:1,
          flexDirection:'row',
          backgroundColor:'white',
          justifyContent:'center',
          alignContent:'center',
          borderColor:'#6D6E71',
          paddingTop:Settings.getY(14),
          borderTopWidth:0.5,
          borderRightWidth:0.5}}>
           <Image
                                 style = {{width:Settings.getX(31),
                                  height:Settings.getY(33), marginRight:Settings.getX(10)}}
                                  source={require('./Image/icon-add.png')}
                              />
         <Text 
            style={{textAlign:'center',
            color:'#6D6E71',
            fontSize:17,
            fontWeight:'bold'}}>
          Add Dish
          </Text>
      </TouchableOpacity>
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
            return (
                <View
                    {...this._panResponder.panHandlers}
                    ref={(ref) => this.items[i] = ref}
                    key={i}
                    style={[styles.recordView]}>
                    <TouchableOpacity style={{flex:0.3, marginLeft:15,alignItems:'center',justifyContent:'center',}}
                    onPress={() => this.goToCategoryDetail(item)}>
                      <Text style={styles.recordTitleFont}>{item.dt_id}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:0.65, marginRight:25,alignItems:'center',justifyContent:'center',}}
                    onPress={() => this.goToCategoryDetail(item)}>
                      <Text style={styles.recordTitleFont}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={{flex:0.05,alignItems:'flex-start'}}></View>
                </View>
            );
        })
   }
   renderToppingGroup(item) {
    if(item.tpgs.length === 0) {
      return;
    } else {
      return  item.tpgs.map((tpg,i) =>{
        return(
          <View style={[styles.toppingGroupView]}
                key = {i}>
                <TouchableOpacity
                    style={styles.toppingGroupButton}
                    disabled={true}
                >
                    <Text style={styles.toppingGroupButtonFont}>
                    {tpg.tpg_name}
                    </Text>
                </TouchableOpacity>
          </View>
        );
      })

    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Loading ref="loading" size={60}/>
        <View style={styles.body}>
        <View style={{
          backgroundColor:'white',
          flex:0.08,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomColor:'#6D6E71',
          borderBottomWidth:0.5,
          borderRadius: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1}}>
            <Text style={{
                  fontSize:20,
                  color:'#EA7B21',
                  position:'absolute',
                  left:0.29*width}}>
              Dish Management
            </Text>
            <TouchableOpacity onPress={()=> this.goToSearchPage()}
            style={{
              position:'absolute',
              alignItems:'center',
              justifyContent: 'center',
              height: '100%',
              right:0.05*width}}>
                  <Image style = {{height:Settings.getY(34),
                     width:Settings.getY(34)}}
                      source={require('./Image/search.png')}
                    />
            </TouchableOpacity>
        </View>
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
  toppingGroupView:{
    height:50,
    width:width-10,
    flexDirection:'row',
    borderColor:'#D1D3D4',
    marginHorizontal:5,
    borderBottomWidth:1,
    paddingTop:Settings.getY(20),
    paddingBottom:Settings.getY(18)
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
    flex:0.92,
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
    borderTopWidth:1,
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
    fontSize:13,
    fontFamily: 'Noto Sans CJK SC',
    color: 'white'
  },
});
