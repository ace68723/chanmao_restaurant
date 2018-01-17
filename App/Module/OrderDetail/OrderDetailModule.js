import OrderDetailAPI from './OrderDetailAPI';

export default  {
  async getOrderDetail(oid){
    try {
      const token = "78b6e7be90ded051ce474bee5d8f0e38";
      const rid = 5;
      const data = await OrderDetailAPI.getOrderDetail(token, rid, oid);
      if(data.result === 0 ){
         const orderDetail = data;
         return orderDetail
      }else{
        const errorMessage = data.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async handleOrder({oid,task,itemList}){
    try {
      const token = "78b6e7be90ded051ce474bee5d8f0e38";
      const rid = 5;
      const items = itemList;
      // const oid = oid;
      // const task = task;
      const reqData = {token, rid, oid, items, task};
      const response = await OrderDetailAPI.handleOrder({token, rid, oid, items, task});
      if(response.result === 0 ){
         const result = response.result;
         return result
      }else{
        const errorMessage = response.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  }

}
