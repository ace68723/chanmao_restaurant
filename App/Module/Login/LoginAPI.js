import { API_LOGIN,API_AUTH } from '../../Config/API';
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
         'devicetoken':deviceToken
      })
      options.body = JSON.stringify({
          "name": username,
          "password":password,
          "channel":channel,
          "version":version
      })
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
               'Content-Type': 'application/json'
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
