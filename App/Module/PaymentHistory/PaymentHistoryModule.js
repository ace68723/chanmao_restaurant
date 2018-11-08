import PaymentHistoryAPI from './PaymentHistoryAPI';
import { GetUserInfo } from '../Database';
export default  {
  async getBilling(){
    try {
      const { token,rid,authortoken } = GetUserInfo();
      const data = await PaymentHistoryAPI.getBilling(authortoken,token,rid);
      if(data.ev_error === 0 ){
         const paymentLists = data.ev_billings
         paymentLists.forEach(item => {
          let tempStartStr = item.start_date.split(" ");
          let tempStartDate = tempStartStr[0].split("-");
          let tempEndStr = item.end_date.split(" ");
          let tempEndDate = tempEndStr[0].split("-");
          const cycle = tempStartDate[1] + '-'  + tempStartDate[2] + ' ~ ' + tempEndDate[1] + '-'  + tempEndDate[2];
          item.cycle = cycle;
          item.service_fee = parseFloat(item.service_fee) + parseFloat(item.promo)
        });
         return paymentLists
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async getSummary(bill_end,bill_start){
    try {
      const { token,rid,authortoken } = GetUserInfo();
      const start_time =  Date.parse(bill_start)/1000 + 60*60*2;
      const end_time = Date.parse(bill_end)/1000 + 60*60*26;
      const data = await PaymentHistoryAPI.getSummary(authortoken,token,rid,start_time,end_time);
      if(data.ev_error === 0 ){
         const orderLists = data.ev_summarys;
         return orderLists
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
