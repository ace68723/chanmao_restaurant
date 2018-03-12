import { API_ORDERHANDLE,API_FETCHORDER } from '../../Config/API';
import fetch_cancel from './react-native-cancelable-fetch';
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
                'Authortoken': authtoken,
                'Content-Type': 'application/json'
            }
        }

        setTimeout(()=> {

          fetch_cancel.abort(1);
          console.log('abort');
        }, 30000);

        return fetch_cancel(url,options,1)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })


      // const result= fetch(url,options)
      //      .then((response) => response.json())
      //      .catch((error) => {
      //          console.log(error);
      //          throw error
      //     })
      //     const cancelable = makeCancelable(result);
      //
      //
      //
      //     setTimeout(function () {
      //       cancelable.cancel();
      //     }, 30000);
      //     return result;

          // this.cancelable = makeCancelable(fetch(url,options));
          //         return(this.cancelable.promise
          //             .then((response)=>response.json())
          //             .catch((error)=> {
          //                 console.log(error);
          //                 throw error
          //             }));
          //
          //   this.cancelable.cancel();





      // let cancelable = makeCancelable(fetch(url,options));
      //         const result= this.cancelable.promise
      //             .then((response)=>response.json())
      //             .catch((error)=> {
      //                 console.log(error);
      //                 throw error
      //             });
      //
      //
      //
      // setTimeout(function () {
      //   cancelable.cancel();
      // }, 3);
      // return result;


     }
  }
