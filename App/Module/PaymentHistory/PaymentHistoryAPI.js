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
          "token": '3eedc29bfceb960b0a52e0ab1b205c82',
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
        const url = 'http://www.chanmao.ca/index.php?r=rrclient/summary/';
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
            "token": '3eedc29bfceb960b0a52e0ab1b205c82',
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
  