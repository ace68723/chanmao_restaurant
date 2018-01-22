import HomeAPI from './HomeAPI';
import { GetUserInfo, SaveOrder } from '../Database';

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
    } catch (error) {
      console.log(error);
      throw error
    }

  },
}
