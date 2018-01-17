import { API_GET_ORDER_DETAIL, API_HANDLE_ORDER } from '../../Config/API';

export default  {
    getOrderDetail(token,rid,oid){
      const url = API_GET_ORDER_DETAIL;
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
          "oid": oid
      })
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     handleOrder(reqData){
       const url = API_HANDLE_ORDER;
       let options = {
           method: 'POST',
           mode:'cors',
           headers: {
               'Content-Type': 'application/json'
           }
       }

       options.body = JSON.stringify({
          "token": reqData.token,
          "rid": reqData.rid,
          "oid": reqData.oid,
          "items": reqData.items,
          "task": reqData.task
       })
     return fetch(url,options)
          .then((response) => response.json())
          .catch((error) => {
              console.log(error);
              throw error
         })
      }
  }
