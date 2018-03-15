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
     getCategoryLists(token){
        const url = 'http://norgta.com/api/mis/v2/get_dish_type';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       addCategory(keyword, token){
        const url = 'http://norgta.com/api/mis/v2/add_dish_type';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            'name':keyword
        })
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       saveCategoryName(dt_id, keyword, token){
        const url = 'http://norgta.com/api/mis/v2/edit_dish_type';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            "dt_id": dt_id,
            'name':keyword
        })
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       deleteCategory(dt_id, token){
        const url = 'http://norgta.com/api/mis/v2/delete_dish_type';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            "dt_id": dt_id
        })
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
  }
