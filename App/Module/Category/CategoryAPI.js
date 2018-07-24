import { API_AREACHECK, API_ORDERSUBMIT } from '../../Config/API';

export default  {
    getDishes(token){
      const url = 'https://chanmao.us/api/mis/v2/get_dishes';
      let options = {
          method: 'GET',
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
     getCategoryLists(token){
        const url = 'https://chanmao.us/api/mis/v2/get_dish_type';
        let options = {
            method: 'POST',
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
       addCategory(keyword, token){
        const url = 'https://chanmao.us/api/mis/v2/add_dish_type';
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
        const url = 'https://chanmao.us/api/mis/v2/edit_dish_type';
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
        const url = 'https://chanmao.us/api/mis/v2/delete_dish_type';
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
       getToppongGroup(token){
        const url = 'https://chanmao.us/api/mis/v2/find_tpgs';
        let options = {
            method: 'POST',
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
       setDish(dish,token){
        const url = 'https://chanmao.us/api/mis/v2/set_dish';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            'int_no': dish.int_no,
            'ds_id': parseInt(dish.ds_id, 10),
            'dt_id': parseInt(dish.dt_id, 10),
            'ds_name': dish.ds_name,
            'ds_price': dish.ds_price,
            'tpgs': dish.tpgs
        })
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       addDish(dish,token){
        const url = 'https://chanmao.us/api/mis/v2/set_dish';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        console.log(options)
        options.body = JSON.stringify({
            'int_no': dish.int_no,
            'dt_id': parseInt(dish.dt_id, 10),
            'ds_name': dish.ds_name,
            'ds_price': dish.ds_price,
            'tpgs': dish.tpgs
        })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       async setToppingGroup(data,token){
        const url = 'https://chanmao.us/api/mis/v2/set_tpg';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        if(data.tpg_id) {
            options.body = JSON.stringify({
                "tpg_id":data.tpg_id,
                "tpg_name":data.tpg_name,
                "tpg_note":data.tpg_note,
                "tpg_max_limit":data.tpg_max_limit,
                "tpg_min_limit":data.tpg_min_limit,
                "tps":data.tps
            })
        } else {
            options.body = JSON.stringify({
                "tpg_name":data.tpg_name,
                "tpg_note":data.tpg_note,
                "tpg_max_limit":parseFloat(parseFloat(data.tpg_max_limit)),
                "tpg_min_limit":parseFloat(parseFloat(data.tpg_min_limit)),
                "tps":data.tps
            })
        }

        console.log(options.body)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       deleteToppingGroup(submenu,token){
        const url = 'https://chanmao.us/api/mis/v2/delete_tpg';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            "tpg_id":submenu.tpg_id,

        })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       deleteDish(dish,token){
        const url = 'https://chanmao.us/api/mis/v2/delete_dish';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            "ds_id":dish.ds_id,

        })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       setDishStatus(item,value,token){
        const url = 'https://chanmao.us/api/mis/v2/set_dish_status';
        let options = {
            method: 'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': token
            }
        }
        options.body = JSON.stringify({
            "ds_id":item.ds_id,
            "status":value
        })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
       editCategoryRank(newlist){
        const url = 'https://chanmao.us/api/manage/v2/edit_dish_cat_rank';
        let options = {
            method: 'PUT',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authortoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs',            }
        }
        options.body = JSON.stringify({
            'ia_rank_list': newlist
        })
        console.log(options)
      return fetch(url,options)
           .then((response) => response.json())
           .catch((error) => {
               console.log(error);
               throw error
          })
       },
  }

