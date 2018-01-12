export default  {
    getBilling(token,rid){
      const url = 'http://www.chanmao.ca/index.php?r=rrclient/billing/';
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
          "token": token,
          "rid":rid
      })
  
      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     getSummary(token,rid,bill_end,bill_start){
        const url = 'http://www.chanmao.ca/index.php?r=rrclient/billing/';
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
            "token": token,
            "rid":rid,
            "bill_end": bill_end,
            "bill_start":bill_start
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
  