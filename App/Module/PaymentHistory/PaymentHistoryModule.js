import PaymentHistoryAPI from './PaymentHistoryAPI';

export default  {
  async getBilling(token,rid){
    try {
      const data = await PaymentHistoryAPI.getBilling(token,rid);
      if(data.result === 0 ){
         const paymentLists = data.bills
         return paymentLists
      }else{
        const errorMessage = data.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async getSummary(token,rid,bill_end,bill_start){
    try {
      const data = await PaymentHistoryAPI.getSummary(token,rid,bill_end,bill_start);
      if(data.result === 0 ){
         const orderLists = data.orders
         return orderLists
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
