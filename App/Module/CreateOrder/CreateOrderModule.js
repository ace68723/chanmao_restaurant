import CreateOrderAPI from './CreateOrderAPI';

export default  {
  async areaCheck(token,rid,lng,lat){
    try {
      const data = await CreateOrderAPI.areaCheck(token,rid,lng,lat);
      if(data.result === 0 ){
         const eo_data ={
             area = data.area,
             dlexp: data.dlexp,
             result: data.result
         }
         return eo_data
      }else{
        const errorMessage = data.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async createOrder(orderDetail){
    try {
      const submitDetail = {
        "token":orderDetail.token,
        "rid":orderDetail.rid,
        "lat":orderDetail.lat,
        "lng":orderDetail.lng,
        "channel":4,
        "addr":orderDetail.addr,
        "apt_no":orderDetail.apt_no,
        "buzz":orderDetail.buzz,
        "city":orderDetail.city,
        "comment":orderDetail.comment,
        "dlexp":orderDetail.dlexp,
        "dltype":1,
        "name":orderDetail.name,
        "postal":orderDetail.postal,
        "pretax":orderDetail.pretax,
        "tel":orderDetail.tel,
        "uid":orderDetail.uid
      },
      const data = await CreateOrderAPI.createOrder(submitDetail);
      if(data.result === 0 ){
         const eo_data ={
             result = data.result,
             oid: data.oid
         }
         return eo_data
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
