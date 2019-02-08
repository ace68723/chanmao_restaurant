import { API_ORDERHANDLE,API_FETCHORDER } from '../../Config/API';
import fetch_cancel from './react-native-cancelable-fetch';
export default  {
    orderHandle(authortoken,token,rid,task,items,oid){
      const url = API_ORDERHANDLE;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
            'Authortoken': authortoken,
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
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },





     fetchOrder(authortoken) {
       const makeCancelable = (promise) => {
         let hasCanceled_ = false;
         const wrappedPromise = new Promise((resolve, reject) => {
           promise.then((val) =>
             hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
           );
           promise.catch((error) =>
             hasCanceled_ ? reject({isCanceled: true}) : reject(error)
           );
         });
         return {
           promise: wrappedPromise,
           cancel() {
             hasCanceled_ = true;
           },
         };
       };

        const url = API_FETCHORDER;
        let options = {
            method: 'GET',
            mode:'cors',
            headers: {
                'Authortoken': authortoken,
                'Content-Type': 'application/json'
            }
        }

        fetch_cancel.abort(1);

        return fetch_cancel(url,options,1)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })

     }
  }
