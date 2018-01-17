import CreateOrderAPI from './CreateOrderAPI';
import { GetUserInfo } from '../Database';
export default  {
  async areaCheck(lng,lat){
    try {
      const { token,rid } = GetUserInfo();
      const data = await CreateOrderAPI.areaCheck(token,rid,lng,lat);
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
  async createOrder(reqData){
    try {
      const { token,rid,uid,channel } = GetUserInfo();
      const submitDetail = {
        "token":token,
        "rid":rid,
        "uid":uid,
        "channel":channel,
        "lat":reqData.lat,
        "lng":reqData.lng,
        "addr":reqData.addr,
        "apt_no":reqData.apt_no,
        "buzz":reqData.buzz,
        "city":reqData.city,
        "comment":reqData.comment,
        "dlexp":reqData.dlexp,
        "dltype":1,
        "name":reqData.name,
        "postal":reqData.postal,
        "pretax":reqData.pretax,
        "tel":reqData.tel,
      }
      const data = await CreateOrderAPI.createOrder(submitDetail);
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
  }
}
