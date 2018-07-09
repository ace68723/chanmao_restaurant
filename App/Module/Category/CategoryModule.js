import CategoryAPI from './CategoryAPI.js';
import { GetUserInfo } from '../Database';
export default  {
  async getDishes(){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.getDishes(authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async getCategoryLists(){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.getCategoryLists(authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async addCategory(keyword){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.addCategory(keyword,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async saveCategoryName(dt_id,keyword){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.saveCategoryName(dt_id,keyword,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async deleteCategory(dt_id){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.deleteCategory(dt_id,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async getToppongGroup(){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.getToppongGroup(authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async setDish(dish){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.setDish(dish,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async addDish(dish){
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.addDish(dish,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async setToppingGroup(submenu) {
    submenu.tpg_max_limit = parseInt(submenu.tpg_max_limit, 10)
    submenu.tpg_min_limit = parseInt(submenu.tpg_min_limit, 10)
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.setToppingGroup(submenu,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async deleteToppingGroup(submenu) {
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.deleteToppingGroup(submenu,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async deleteDish(dish) {
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.deleteDish(dish,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  },
  async setDishStatus(item,value) {
    console.log(item,value);
    if(value == true) {
      value = 0;
    } else if(value == false) {
      value = 1;
    }
    try {
            const { authortoken} = GetUserInfo();
      const data = await CategoryAPI.setDishStatus(item,value,authortoken);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_message;
        console.log(errorMessage);
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}
