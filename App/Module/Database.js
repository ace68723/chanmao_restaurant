'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================
import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const cmr_system_scheam = {
  name: 'cmr_system',
  primaryKey: 'type',
  properties: {
    type:'string',
    value:'string',
  }
}


let realm
export function DatabaseInit() {
  realm = new Realm({
      path: 'cmr_1.1.0.realm',
      schema: [
                cmr_system_scheam
              ],
      schemaVersion: 1,
  })
    console.log(realm.path)
  let cmr_system = realm.objects('cmr_system');
  realm.write(() => {
    realm.create('cmr_system',{type: 'channel', value: 'cm-4'}, true);
    realm.create('cmr_system',{type: 'version', value: '1.1.0-beta'}, true);
    realm.create('cmr_system',{type: 'deviceToken', value: ''}, true);
  })
  if(cmr_system.length <5) {
    realm.write(() => {
      realm.create('cmr_system',{type: 'token', value: ''}, true);
      realm.create('cmr_system',{type: 'rid', value: ''}, true);
      realm.create('cmr_system',{type: 'uid', value: ''}, true);
    })
  }
  NativeModules.DeviceToken.gettoken();
  DeviceEventEmitter.addListener('token',(deviceToken)=>{
    realm.write(() => {
      realm.create('cmr_system',{type: 'deviceToken', value: deviceToken}, true);
    })
  });
}
export function GetDeviceInfo() {
  const channel = realm.objectForPrimaryKey('cmr_system','channel').value;
  const version = realm.objectForPrimaryKey('cmr_system','version').value;
  const deviceToken  = realm.objectForPrimaryKey('cmr_system','deviceToken').value;
  return { channel,version,deviceToken }
}
export function SaveUserInfo({interval,authortoken,token,rid,uid,firebaseURL,firebaseKEY,firebaseREF}) {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: authortoken}, true);
    realm.create('cmr_system',{type: 'interval', value: interval}, true);
    realm.create('cmr_system',{type: 'token', value: token}, true);
    realm.create('cmr_system',{type: 'rid', value: rid}, true);
    realm.create('cmr_system',{type: 'uid', value: uid}, true);
    realm.create('cmr_system',{type: 'firebaseURL', value: firebaseURL}, true);
    realm.create('cmr_system',{type: 'firebaseKEY', value: firebaseKEY}, true);
    realm.create('cmr_system',{type: 'firebaseREF', value: firebaseREF}, true);
  })
}
export function InitUserInfo() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: ''}, true);
    realm.create('cmr_system',{type: 'interval', value: ''}, true);
    realm.create('cmr_system',{type: 'token', value: ''}, true);
    realm.create('cmr_system',{type: 'rid', value: ''}, true);
    realm.create('cmr_system',{type: 'uid', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseURL', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseKEY', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseREF', value: ''}, true);
    realm.create('cmr_system',{type: 'deviceToken', value: ''}, true);
  })
}
export function GetUserInfo() {
  const interval     = realm.objectForPrimaryKey('cmr_system','interval').value;
  const authortoken  = realm.objectForPrimaryKey('cmr_system','authortoken').value;
  const token        = realm.objectForPrimaryKey('cmr_system','token').value;
  const version      = realm.objectForPrimaryKey('cmr_system','version').value;
  const rid          = realm.objectForPrimaryKey('cmr_system','rid').value;
  const uid          = realm.objectForPrimaryKey('cmr_system','uid').value;
  const channel      = realm.objectForPrimaryKey('cmr_system','channel').value;
  return {interval,authortoken,token,version,rid,uid,channel}
}
export function GetFirebaseInfo() {
  const firebaseURL = realm.objectForPrimaryKey('cmr_system','firebaseURL').value;
  const firebaseKEY = realm.objectForPrimaryKey('cmr_system','firebaseKEY').value;
  const firebaseREF = realm.objectForPrimaryKey('cmr_system','firebaseREF').value;
  return {firebaseURL,firebaseKEY,firebaseREF}
}
export function LogOut() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: ''}, true);
    realm.create('cmr_system',{type: 'interval', value: ''}, true);
    realm.create('cmr_system',{type: 'token', value: ''}, true);
    realm.create('cmr_system',{type: 'rid', value: ''}, true);
    realm.create('cmr_system',{type: 'uid', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseURL', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseKEY', value: ''}, true);
    realm.create('cmr_system',{type: 'firebaseREF', value: ''}, true);
    realm.create('cmr_system',{type: 'deviceToken', value: ''}, true);
  })
}
