'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================

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
      path: 'cmr_2.0.0.realm',
      schema: [
                cmr_system_scheam
              ],
      schemaVersion: 1,
  })
    console.log(realm.path)
}
export function SaveUserInfo({token}) {
  realm.write(() => {
    realm.create('cmr_system',{type: 'token', value: token}, true);
  })
}
export function InitUserInfo() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'token', value: ''}, true);
  })
}
export function GetUserInfo() {
  const token = realm.objectForPrimaryKey('cmr_system','token').value;
  const version = realm.objectForPrimaryKey('cmr_system','version').value;
  return {token,version}
}
export function LogOut() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'token', value: ''}, true);
  })
}
