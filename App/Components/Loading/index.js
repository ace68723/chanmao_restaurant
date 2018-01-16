/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';

export default class Loading extends Component {
  constructor(props){
    super(props);
    this.state={
      isShowing: false,
      size:this.props.size ? this.props.size : 60,
      color: this.props.color ? this.props.color : "#c49a6c",
    }
    this.startLoading = this.startLoading.bind(this);
    this.endLoading = this.endLoading.bind(this);
  }
  render() {
    return (
      <Modal
           visible={this.state.isShowing}
           animationType={'fade'}
           transparent={true}
           onRequestClose={() => this.endLoading()}
       >
         <View style={styles.modalContainer}>
           <View style={styles.innerContainer}>
             <ActivityIndicator size={60} color="#c49a6c" animating={this.state.isShowing} style={{marginBottom:20}}/>
           </View>
         </View>

       </Modal>
    );
  }

  startLoading(){
    this.setState({isShowing:true});
  }
  endLoading(){
    this.setState({isShowing:false});
  }
}


const styles = StyleSheet.create({
  modalContainer: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: 'rgba(50, 50, 50, 0.8)',
 },
 innerContainer: {
   alignItems: 'center',
 },
 container: {
   flex:1,
 }
});
