import { API_AREACHECK, API_ORDERSUBMIT } from '../../Config/API';

export default  {
    getDishes(token){
      const url = 'http://norgta.com/api/mis/v2/get_dishes';
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authortoken': token
          }
      }
    return fetch(url,options)
         .then((response) => response.json())
         .catch((error) => {
             console.log(error);
             throw error
        })
     },
     
  }
