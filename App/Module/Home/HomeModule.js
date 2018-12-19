import HomeAPI from './HomeAPI';
import { GetUserInfo, saveOrder } from '../Database';

export default  {
  async orderHandle(token,rid,items,oid){
    try {
      const task = 1;
      const { authortoken } = GetUserInfo();
      const data = await HomeAPI.orderHandle(authortoken,token,rid,task,items,oid);
      if(data.result === 0 ){
         return data
      }else{
        const errorMessage = data.ev_context;
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
      if(data.ev_error === 0 ){
         return data.ev_orders
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    }catch (error) {
      console.log(error);
      throw error
    }

  },
}

