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
      console.log(userInfo)
      if(userInfo.result === 0 ){
         const token =userInfo.token;
         const rid = userInfo.rid;
         const uid =userInfo.uid;
         const authortoken = userInfo.authortoken;
         const interval = userInfo.interval;
         const firebaseURL = userInfo.firebase_url;
         const firebaseKEY = userInfo.firebase_key;
         const firebaseREF = userInfo.firebase_ref;
         const eo_data ={
             result: userInfo.result,
         }
         SaveUserInfo({ authortoken,
                        token,
                        interval,
                        rid,
                        uid,
                        firebaseURL,
                        firebaseKEY,
                        firebaseREF
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
      const { token,rid } = GetUserInfo();
      if(!token || !rid) {
        InitUserInfo();
        throw 'no token'
      }
      const userInfo = await LoginAPI.auth({token,rid});
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
