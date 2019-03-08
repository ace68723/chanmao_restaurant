import { API_LOGIN,API_AUTH } from '../../Config/API';
import JPushModule from 'jpush-react-native';
let jpushid='';
// JPushModule.getRegistrationID(registrationId => {jpushid=registrationId;});
export default  {
    login(deviceToken,username,password, channel, version, UUID,sysOS){
      const url = API_LOGIN;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
            'Content-Type': 'application/json',
          }
      }
      options.headers = Object.assign(options.headers,{
         'cmversion':version,
         'cmuuid':UUID,
         'cmos':sysOS,
         'devicetoken':deviceToken,
          'jpushid':jpushid,
          'appid':4
      })
      options.body = JSON.stringify({
          "name": username,
          "password":password,
          "channel":channel,
          "version":version
      })
      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     auth({authortoken,token,rid}){
       const url = API_AUTH;
       let options = {
           method: 'POST',
           mode:'cors',
           headers: {
               'Authortoken': authortoken,
               'Content-Type': 'application/json',
               'jpushid':jpushid,
               'appid':4
           }
       }

       options.body = JSON.stringify({
           "token": token,
           "iv_rid":rid
       })

     return fetch(url,options)
          .then((response) => response.json())
          .catch((error) => {
              console.log(error);
              throw error
         })
      }
  }
