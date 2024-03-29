import { API_GET_ORDER_DETAIL, API_HANDLE_ORDER } from '../../Config/API';

export default  {
    getOrderDetail(authortoken,token,rid,oid){
      const url = API_GET_ORDER_DETAIL;
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
          "iv_rid":parseFloat(rid),
          "oid": parseFloat(oid)
      })
      console.log(options);
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             throw error
        })
     },
     handleOrder(reqData){
       const url = API_HANDLE_ORDER;
       let options = {
           method: 'POST',
           mode:'cors',
           headers: {
               'Authortoken': reqData.authortoken,
               'Content-Type': 'application/json'
           }
       }
      
       options.body = JSON.stringify({
          "token": reqData.token,
          "iv_rid": reqData.rid,
          "oid": reqData.oid,
          "items": reqData.items,
          "task": reqData.task,
          "pptime":reqData.pptime
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
