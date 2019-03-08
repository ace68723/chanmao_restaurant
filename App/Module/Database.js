'use strict';
const Realm               = require('realm');
//=============================
//              new
//=============================
import {
  NativeModules,
  DeviceEventEmitter,
  Platform,
  PushNotificationIOS
} from 'react-native';

const cmr_system_scheam = {
  name: 'cmr_system',
  primaryKey: 'type',
  properties: {
    type:'string',
    value:'string',
  }
}

const cmr_delivery_in_transaction_scheam = {
  name: 'cmr_delivery_in_transaction',
  properties: {
    delivery_type:'string',
    delivery_comment:'string',
    delivery_status:'string',
    delivery_prepare_time:'string',
  }
}
const cmr_product_in_transaction_scheam = {
  name: 'cmr_product_in_transaction',
  properties: {
    product_id:'string',
    product_internal_id:'string',
    product_name:'string',
    product_quantity:'string',
  }
}
const cmr_customer_in_transaction_scheam = {
  name: 'cmr_customer_in_transaction',
  properties: {
    customer_name:'string',
    customer_tel:'string',
  }
}
const cmr_info_scheam = {
  name: 'cmr_info',
  primaryKey: 'info_name',
  properties: {
    info_name:'string',
    info_tel:'string',
    info_address:'string',
  }
}
const cmr_products_sold_out_scheam = {
  name: 'cmr_products_sold_out',
  primaryKey: 'product_id',
  properties: {
    product_id:'string',
    product_sold_out:'bool',
    product_update_time:'string',
  }
}
const cmr_sales_transaction_status_scheam = {
  name: 'cmr_sales_transaction_status',
  primaryKey: 'transaction_id',
  properties: {
    transaction_id:'string',
    delivery_status:'string',
    delivery_type:'string',
    transaction_retail_price:'string',
    update_time:'int',
  }
}
const cmr_sales_transaction_scheam = {
  name: 'cmr_sales_transaction',
  primaryKey: 'transaction_id',
  properties: {
    transaction_id:'string',
    transaction_date_time:'string',
    transaction_retail_price:'string',
    transaction_retail_subtotal:'string',
    transaction_retail_tax:'string',
    transaction_delivery:{type: 'cmr_delivery_in_transaction', optional:true},
    transaction_status:{type: 'cmr_sales_transaction_status', optional:true}
    // transaction_products:{type: 'list', objectType: 'cmr_product_in_transaction',optional:true},
    // transaction_customer:{type: 'data', objectType: 'cmr_customer_in_transaction',optional:true},
  }
}

let realm
export function DatabaseInit() {
  realm = new Realm({
      path: 'cmr_1.1.0.realm',
      schema: [
                cmr_system_scheam,
              ],
      schemaVersion: 1,
  })
  let cmr_system = realm.objects('cmr_system');
  realm.write(() => {
    realm.create('cmr_system',{type: 'channel', value: 'cm-4'}, true);
    realm.create('cmr_system',{type: 'version', value: '1.2.9'}, true);
    realm.create('cmr_system',{type: 'deviceToken', value: ''}, true);
  })
  if(cmr_system.length <5) {
    realm.write(() => {
      realm.create('cmr_system',{type: 'token', value: ''}, true);
      realm.create('cmr_system',{type: 'rid', value: ''}, true);
      realm.create('cmr_system',{type: 'uid', value: ''}, true);
      realm.create('cmr_system',{type: 'settle_type', value: ''}, true);
    })
  }
  if (Platform.OS === 'ios') {
    setTimeout(() => {
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', (deviceToken) => {
        console.log(deviceToken);
        realm.write(() => {
          realm.create('AppUserInfo', {
            param: 'deviceToken',
            value: deviceToken
          }, true);
        });
      });
      PushNotificationIOS.addEventListener('registrationError', (error) => {
          console.log(error);
      });
      PushNotificationIOS.addEventListener('notification', (notification) => {
        console.log(notification);
        console.log('get data', notification.getData());
      });
    }, 500);
  } else {
    NativeModules.DeviceToken.gettoken();
    DeviceEventEmitter.addListener('token',(deviceToken)=>{
      if(!deviceToken) return
      realm.write(() => {
        realm.create('cmr_system',{type: 'deviceToken', value: deviceToken}, true);
      })
    });
  }


}
export function GetDeviceInfo() {
  const channel = realm.objectForPrimaryKey('cmr_system','channel').value;
  const version = realm.objectForPrimaryKey('cmr_system','version').value;
  const deviceToken  = realm.objectForPrimaryKey('cmr_system','deviceToken').value;
  return { channel,version,deviceToken }
}
export function SaveUserInfo({interval,authortoken,token,rid,uid, settle_type}) {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: authortoken}, true);
    realm.create('cmr_system',{type: 'interval', value: interval}, true);
    realm.create('cmr_system',{type: 'token', value: token}, true);
    realm.create('cmr_system',{type: 'rid', value: rid}, true);
    realm.create('cmr_system',{type: 'uid', value: uid}, true);
    realm.create('cmr_system',{type: 'settle_type', value: settle_type}, true);
  })
}
export function InitUserInfo() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: ''}, true);
    realm.create('cmr_system',{type: 'interval', value: ''}, true);
    realm.create('cmr_system',{type: 'token', value: ''}, true);
    realm.create('cmr_system',{type: 'rid', value: ''}, true);
    realm.create('cmr_system',{type: 'uid', value: ''}, true);
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
  const settle_type      = realm.objectForPrimaryKey('cmr_system','settle_type').value;
  return {interval,authortoken,token,version,rid,uid,channel,settle_type}
}
export function LogOut() {
  realm.write(() => {
    realm.create('cmr_system',{type: 'authortoken', value: ''}, true);
    realm.create('cmr_system',{type: 'interval', value: ''}, true);
    realm.create('cmr_system',{type: 'token', value: ''}, true);
    realm.create('cmr_system',{type: 'rid', value: ''}, true);
    realm.create('cmr_system',{type: 'uid', value: ''}, true);
    realm.create('cmr_system',{type: 'deviceToken', value: ''}, true);
  })
}
export function saveOrder(io_data) {
  const data = {
    transaction_id: io_data.transaction_id,
    transaction_date_time: io_data.transaction_date_time,
    transaction_retail_price: io_data.transaction_retail_price,
    transaction_retail_subtotal: io_data.transaction_retail_subtotal,
    transaction_retail_tax: io_data.transaction_retail_tax,
    transaction_delivery:{
      delivery_type: io_data.transaction_delivery.delivery_type,
      delivery_comment: io_data.transaction_delivery.delivery_comment,
      delivery_status: io_data.transaction_delivery.delivery_status,
      delivery_prepare_time: io_data.transaction_delivery.delivery_prepare_time,
    },
    // transaction_products:{
    //   product_id:io_data.transaction_products.product_id,
    //   product_internal_id:io_data.transaction_products.product_internal_id,
    //   product_name:io_data.transaction_products.product_name,
    //   product_quantity:io_data.transaction_products.product_quantity,
    // },
    // transaction_customer:{
    //   customer_name:io_data.transaction_customer.customer_name,
    //   customer_tel:io_data.transaction_customer.customer_tel,
    // },
  }
  realm.write(() => {
    realm.create('cmr_sales_transaction',data, true);
  })
}
