import LoginAPI from './LoginAPI';
import { GetDeviceInfo, SaveUserInfo, InitUserInfo } from '../Database';

export default  {
  async login(username,password){
    try {
      const { channel,version } = GetDeviceInfo();
      const userInfo = await LoginAPI.login(username,password, channel, version);

      if(userInfo.result === 0 ){
         const token =userInfo.token;
         console.log(token);
         const rid = userInfo.rid;
         const uid =userInfo.uid;
         const firebaseURL = userInfo.firebase_url;
         const firebaseKEY = userInfo.firebase_key;
         const firebaseREF = userInfo.firebase_ref;
         const eo_data ={
             result: userInfo.result
         }
         SaveUserInfo({ token,
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
  logout(){
    InitUserInfo();
  }

}
