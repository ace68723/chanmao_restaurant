import CreateOrderAPI from './CreateOrderAPI';

export default  {
  async areaCheck(lng,lat){
    try {
      const token = '3ef5558e9696f6ae01f6ac604e38fec8';
      const rid = 5;
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
      const submitDetail = {
        "token":reqData.token,
        "rid":reqData.rid,
        "lat":reqData.lat,
        "lng":reqData.lng,
        "channel":4,
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
        "uid":reqData.uid
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
