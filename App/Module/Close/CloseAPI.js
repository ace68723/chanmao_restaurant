
export default  {
    getRRClose(authortoken){
      const url = 'https://www.cmapi.ca/cm_backend/index.php/api/restaurant/v1/get_rr_close';
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Authortoken': authortoken,
              'Content-Type': 'application/json'
          }
      }

    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             throw error
        })
     },
     createRRClose(authortoken,start_time,end_time){
        const url = 'https://www.cmapi.ca/cm_backend/index.php/api/restaurant/v1/add_rr_close';
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
            "start_time": start_time,
            "end_time":end_time,
        })
        console.log(options);
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               throw error
          })
       },
       updateRRClose(authortoken,id, start_time,end_time){
        const url = 'https://www.cmapi.ca/cm_backend/index.php/api/restaurant/v1/edit_rr_close';
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
            "start_time": start_time,
            "end_time":end_time,
            "id":id
        })
        console.log(options);
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               throw error
          })
       },
  }
