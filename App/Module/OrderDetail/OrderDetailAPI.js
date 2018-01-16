export default  {
    getOrderDetail(token,rid,oid){
      const url = 'http://www.chanmao.ca/index.php?r=rrclient/orderdetail/';
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
       const url = 'http://www.chanmao.ca/index.php?r=rrclient/handle/';
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
