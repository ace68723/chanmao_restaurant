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
         console.log(user);
         const token =user.token;
         const rid = (user.rid).toString();
         const uid = (user.uid).toString();
         const authortoken = user.authortoken;
         const interval = user.interval;
         const settle_type =user.settle_type;
         const eo_data ={
             result: user,
         }

         SaveUserInfo({ authortoken,
                        token,
                        interval,
                        rid,
                        uid,
                        settle_type
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
      const { authortoken, token,rid } = GetUserInfo();
      if(!authortoken || !rid) {
        InitUserInfo();
        throw 'no authortoken'
      }
     
      const userInfo = await LoginAPI.auth({authortoken, token,rid});
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
