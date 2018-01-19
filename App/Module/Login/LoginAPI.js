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
         'Cmversion':version,
         'Cmuuid':UUID,
         'Cmos':sysOS,
         'Devicetoken':deviceToken
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
     auth({token,rid}){
       const url = API_AUTH;
       let options = {
           method: 'POST',
           mode:'cors',
           headers: {
               'Content-Type': 'application/json'
           }
       }

       options.body = JSON.stringify({
           "token": token,
           "rid":rid
       })

     return fetch(url,options)
          .then((response) => response.json())
          .catch((error) => {
              console.log(error);
              throw error
         })
      }
  }
