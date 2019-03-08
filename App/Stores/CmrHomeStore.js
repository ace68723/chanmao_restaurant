import CmrConstants from '../Constants/CmrConstants';
import {dispatch, register} from '../Dispatchers/CmrDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';
import {
    NativeModules,
    Alert,
} from 'react-native';

const CmrHomeStore = Object.assign({},EventEmitter.prototype,{
    state:{
        reRender:0,
        newOrder:[],
        Orders:[],
        recentOrder: [],
        refreshing: false,
        checkOid: '',
      },
	emitChange(){
	   this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
      this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
	   this.removeListener(CHANGE_EVENT, callback)
	},
    updateOrderState(data) {
        if(data.ea_new.length !== 0) {
            if(data.ea_new[0].oid === this.state.checkOid) {
              let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
                this.state.newOrder = data.ea_new,
                this.state.recentOrder = data.ea_done,
                this.state.Orders = Orders,
                this.state.refreshing = false

            } else {
              const soundInterval = setInterval(() => {
                NativeModules.SystemSound.playSound();
                }, 500);//add loading if request more than 200ms
                setTimeout(() => {
                  clearInterval(soundInterval)
                }, 5000);

              Alert.alert(
                "Message",
                'You Have New Order',
                [
                  {text: 'Ok',onPress:()=>clearInterval(soundInterval)},
                ],
                { cancelable: false }
              )
              let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
                this.state.newOrder = data.ea_new,
                this.state.recentOrder = data.ea_done,
                this.state.Orders = Orders,
                this.state.checkOid= data.ea_new[0].oid,
                this.state.refreshing = false
            }
          } else if(data.ea_new.length === 0){
            let Orders = [{title:'NEW ORDER',color:'#ea7B21'},...data.ea_new,{title:'RECENT ORDER',color:'#798BA5'}, ...data.ea_done];
                this.state.newOrder = data.ea_new,
                this.state.recentOrder = data.ea_done,
                this.state.Orders = Orders,
                // checkOid= data.ev_new[i].oid,
                this.state.refreshing = false
          }
    },
    getState() {
    return this.state;
    },
    dispatcherIndex:register(function(action) {
        
        switch(action.actionType){
            case CmrConstants.FETCH_ORDER:
                CmrHomeStore.updateOrderState(action.io_data);
                CmrHomeStore.emitChange();
                break;
            default:
            // do nothing
            };

    })
});
module.exports = CmrHomeStore;
