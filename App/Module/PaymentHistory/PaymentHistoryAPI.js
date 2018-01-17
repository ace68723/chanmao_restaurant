import { API_GET_BILLING, API_GET_SUMMARY } from '../../Config/API';
export default  {
    getBilling(token,rid){
      const url = API_GET_BILLING;
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
        const url = API_GET_SUMMARY;
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
