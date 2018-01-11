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
  
      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     }
  }
  