import { API_LOGIN,API_AUTH } from '../../Config/API';
export default  {
    login(UUID,sysOS,username,password, channel, version){
      const url = API_LOGIN;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json'
          }
      }

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
