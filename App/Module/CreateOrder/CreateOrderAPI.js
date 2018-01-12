export default  {
    areaCheck(token,rid,lat,lng){
      const url = 'http://www.chanmao.ca/index.php?r=rrclient/areacheck/';
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
          "lat": lat,
          "lng":lng
      })
  
      console.log(options)
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     createOrder(submitDetail){
        const url = 'http://www.chanmao.ca/index.php?r=rrclient/ordersubmit/';
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
                "token":submitDetail.token,
                "rid":submitDetail.rid,
                "lat":submitDetail.lat,
                "lng":submitDetail.lng,
                "channel":submitDetail.channel,
                "addr":submitDetail.addr,
                "apt_no":submitDetail.apt_no,
                "buzz":submitDetail.buzz,
                "city":submitDetail.city,
                "comment":submitDetail.comment,
                "dlexp":submitDetail.dlexp,
                "dltype":submitDetail.dltype,
                "name":submitDetail.name,
                "postal":submitDetail.postal,
                "pretax":submitDetail.pretax,
                "tel":submitDetail.tel,
                "uid":submitDetail.uid
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
  