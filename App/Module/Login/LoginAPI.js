export default  {
    login(username,password, channel, version){
      const url = 'http://www.chanmao.ca/index.php?r=rrclient/login/';
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json'
          }
      }
      // options.headers = Object.assign(options.headers,{
      //     uuid: io_data.uuid,
      // })
  
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
     }
  }
  