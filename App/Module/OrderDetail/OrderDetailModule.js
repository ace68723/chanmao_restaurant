import OrderDetailAPI from './OrderDetailAPI';

export default  {
  async getOrderDetail(oid,token,rid){
    try {
      const data = await OrderDetailAPI.getOrderDetail(oid,token,rid);
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
