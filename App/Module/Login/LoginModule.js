import LoginAPI from './LoginAPI';
import {GetDeviceInfo,SaveUserInfo} from '../Database';

export default  {
  async login(username,password){
    try {
      const { channel,version } = GetDeviceInfo();
      const userInfo = await LoginAPI.login(username,password, channel, version);
      if(userInfo.result === 0 ){
        const eo_data ={
           uid:userInfo.uid,
           token:userInfo.token,
           rid: userInfo.rid,
           url: userInfo.url,
           result: userInfo.result
         }
         SaveUserInfo({});
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
