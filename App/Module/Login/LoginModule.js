import LoginAPI from './LoginAPI';
import { GetDeviceInfo, GetUserInfo, SaveUserInfo, InitUserInfo } from '../Database';
import DeviceInfo from 'react-native-device-info';

export default  {
  async login(username,password){
    try {
      const { channel, version, deviceToken } = GetDeviceInfo();
      const UUID = DeviceInfo.getUniqueID();
      const OS = DeviceInfo.getSystemName()
      const sysVersion = DeviceInfo.getSystemVersion()
      const sysOS = OS +sysVersion;
      const userInfo = await LoginAPI.login(deviceToken,username,password, channel, version, UUID,sysOS);
      console.log(userInfo);
      if(userInfo.ev_error === 0 ){
         const user = userInfo.userInfo;
         const token =user.token;
         const rid = (user.rid).toString();
         const uid = (user.uid).toString();
         const authortoken = user.authortoken;
         const interval = user.interval;
        
         const eo_data ={
             result: user,
         }

         SaveUserInfo({ authortoken,
                        token,
                        interval,
                        rid,
                        uid
                      });
         return eo_data
      }else{
        const errorMessage = userInfo.error_msg;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async auth(){

    try {
      console.log(GetUserInfo())
      const { token,rid } = GetUserInfo();
      if(!token || !rid) {
        InitUserInfo();
        throw 'no token'
      }
     
      const userInfo = await LoginAPI.auth({token,rid});
      console.log(userInfo);
      if(userInfo.result === 0 ){
         const eo_data ={
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

  },
  logout(){
    InitUserInfo();
  }

}
