import OrderDetailAPI from './OrderDetailAPI';
import { GetUserInfo } from '../Database';
export default  {
  async getOrderDetail(oid){
    try {
      const { token,rid } = GetUserInfo();
      const data = await OrderDetailAPI.getOrderDetail(token, rid, oid);
      if(data.ev_error === 0 ){
         const orderDetail = data.order_detail;
         return orderDetail
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    } catch (error) {
      console.log('11', error);
      throw error
    }

  },
  async handleOrder({oid,task,itemList,pptime}){
    try {
      const { token,rid } = GetUserInfo();
      const items = itemList;
      // const oid = oid;
      // const task = task;
      const reqData = {token, rid, oid, items, task,pptime};
      const response = await OrderDetailAPI.handleOrder(reqData);
      if(response.ev_error === 0 ){
         const result = response.result;
         return result
      }else{
        const errorMessage = response.ev_context;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  }

}
