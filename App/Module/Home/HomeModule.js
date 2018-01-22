import HomeAPI from './HomeAPI';
import { GetUserInfo, saveOrder } from '../Database';

export default  {
  async orderHandle(token,rid,items,oid){
    try {
      const task = 1;
      const data = await HomeAPI.orderHandle(token,rid,task,items,oid);
      if(data.result === 0 ){
         return data
      }else{
        const errorMessage = data.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async fetchOrder(){
    try {
      const { authortoken } = GetUserInfo();
      const data = await HomeAPI.fetchOrder(authortoken);
      if(data.ev_result === 0 ){
        console.log(data)
         return data
        
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    }catch (error) {
      console.log(error);
      throw error
    }

  },
}
// data.ea_done.forEach(data => {
//   const io_data = {
//    transaction_id: data.oid,
//    transaction_retail_price: "data.total",
//    transaction_date_time:'',
//    transaction_retail_subtotal:'',
//    transaction_retail_tax:'',
//    transaction_delivery: {
//      delivery_type:data.dltype,
//      delivery_comment: data.comment,
//      delivery_status: data.status,
//      delivery_prepare_time: data.pptime,
//    }
//  }
//    saveOrder(io_data);
//
//
//    data.ea_new.forEach(data => {
//      const io_data = {
//       transaction_id: data.oid,
//       transaction_retail_price: "data.total",
//       transaction_date_time:'',
//       transaction_retail_subtotal:'',
//       transaction_retail_tax:'',
//       transaction_delivery: {
//         delivery_type:data.dltype,
//         delivery_comment: data.comment,
//         delivery_status: data.status,
//         delivery_prepare_time: data.pptime,
//       }
//     }
//       saveOrder(io_data);
