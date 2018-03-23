/* @flow */

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
const { width,height } = Dimensions.get('window');
import Settings from '../../Config/Setting';
import Setting from '../../Config/Setting.js'
import Loading from '../Loading';
import CategoryModule from '../../Module/Category/CategoryModule';
export default class ChangeCategoryName extends Component {
  constructor(props) {
    super(props);
    this.state={
      category:props.category,
      keyword:props.keyword,
      }
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
  }
  _closeSboHomeAlert() {
    this.props.navigator.dismissLightBox();
  }
  async saveCategoryName() {
    const loadingTimeout = setTimeout(() => {
        this.refs.loading.startLoading();
       }, 300);//add loading if request more than 200ms
    try{
         const data = await CategoryModule.saveCategoryName(this.state.category.dt_id, this.state.keyword);
         if(data.ev_error === 0) {
          this.props.getCategoryLists();
            Alert.alert(
                "Success",
                '修改成功',
                [
                  {text: 'Ok', onPress:()=>this._closeSboHomeAlert()},
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
  render() {
      return(
        <TouchableOpacity style = {styles.container}>
          <Loading ref="loading" size={60}/>
          <TouchableOpacity style = {{flex:0.35}}
            onPress={() => this._closeSboHomeAlert()}>

            </TouchableOpacity>
          <View style={{
            flex:0.3,
            backgroundColor:'white',
            justifyContent:'center',
            alignContent:'center'
          }}>
            <Text style = {{
            textAlign:'center', fontSize:17, fontWeight:'bold', marginBottom:35}}>Change Category Name</Text>
            <TextInput
            value={this.state.keyword}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            style={ styles.input }
            onChangeText={(text) => this.setState({keyword:text})}
            />
            <View style = {{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',}}>
                <TouchableOpacity
                    style={styles.searchButtonStyle}
                    onPress={() => this._closeSboHomeAlert()}
                    disabled={this.state.waiting}
                >
                    <Text style={styles.searchButtonFont}>
                    Cancel
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.searchButtonStyle}
                    onPress={() => this.saveCategoryName()}
                    disabled={this.state.waiting}
                >
                    <Text style={styles.searchButtonFont}>
                    Save
                    </Text>
                </TouchableOpacity>
                
            </View>
           </View>
           <TouchableOpacity style = {{flex:0.35}}
            onPress={() => this._closeSboHomeAlert()}>

            </TouchableOpacity>
        </TouchableOpacity>
        
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#rgba(0,0,0,0.6)',
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
      textAlign: 'left',
      color:'black',
      marginHorizontal: Settings.getX(33),
      marginBottom:Settings.getX(33),
      height: Settings.getY(60),
      borderWidth: 0.5,
      borderColor: 'grey',
      padding:1,
      paddingLeft:10,
      fontSize: 17,
    },

    searchButtonStyle:{
      backgroundColor:'#EA7B21',
      flex:0.4,
      marginLeft:Settings.getY(10),
      marginRight: Settings.getY(12),
      height: Settings.getY(50),
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      borderWidth:1,
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
  
