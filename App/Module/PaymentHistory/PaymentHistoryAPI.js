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
          "iv_rid":rid
      })
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     getSummary(token,rid,start_time,end_time){
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
            "iv_rid":rid,
            "bill_end": end_time,
            "bill_start":start_time
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
