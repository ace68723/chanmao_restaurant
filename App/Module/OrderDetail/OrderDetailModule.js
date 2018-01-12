import OrderDetailAPI from './OrderDetailAPI';

export default  {
  async getOrderDetail(token,rid,oid){
    try {
      const data = await OrderDetailAPI.getOrderDetail(token,rid,oid);
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

  }
}
