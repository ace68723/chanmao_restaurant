import HomeAPI from './HomeAPI';

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

  }
}
