import LoginAPI from './LoginAPI';

export default  {
  async login(username,password){
    try {
      const channel = 4;
      const version = 'v1.0.9';
      const userInfo = await LoginAPI.login(username,password, channel, version);
      if(userInfo.result === 0 ){
        const eo_data ={
           uid:userInfo.uid,
           token:userInfo.token,
           rid: userInfo.rid,
           url: userInfo.url,
           result: userInfo.result
         }
         return eo_data
      }else{
        const errorMessage = userInfo.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  }
}
