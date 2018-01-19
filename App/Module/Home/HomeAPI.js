import { API_ORDERHANDLE,API_FETCHORDER } from '../../Config/API';
export default  {
    orderHandle(token,rid,task,items,oid){
      const url = API_ORDERHANDLE;
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
        "oid": oid,
        "task": task,
        "items": items
      })

      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     fetchOrder(authtoken) {
        const url = API_FETCHORDER;
        let options = {
            method: 'GET',
            mode:'cors',
            headers: {
                'Authortoken': authtoken,
                'Content-Type': 'application/json'
            }
        }
        // options.headers = JSON.stringify({
        //     "Authortoken": authtoken
        // })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
     }
  }
