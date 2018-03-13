import PaymentHistoryAPI from './PaymentHistoryAPI';
import { GetUserInfo } from '../Database';
export default  {
  async getBilling(){
    try {
      const { token,rid } = GetUserInfo();
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
  async getSummary(bill_end,bill_start){
    try {
      const { token,rid } = GetUserInfo();
      const data = await PaymentHistoryAPI.getSummary(token,rid,bill_end,bill_start);
      console.log(data)
      if(data.result === 0 ){
         const orderLists = data
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
