import CategoryAPI from './CategoryAPI.js';
import { GetUserInfo } from '../Database';
export default  {
  async getDishes(){
    try {
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.getDishes(token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.getCategoryLists(token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.addCategory(keyword,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.saveCategoryName(dt_id,keyword,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.deleteCategory(dt_id,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.getToppongGroup(token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.setDish(dish,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.addDish(dish,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.setToppingGroup(submenu,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.deleteToppingGroup(submenu,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.deleteDish(dish,token);
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
      const  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE1MDg4NzUyMDAsImxhc3Rsb2dpbiI6MTUwMjgyNDYwN30.jIbVCvagC6B3NFKgOPmLAeYeWIFRdOH8dsIRHhgiQBs';
      const data = await CategoryAPI.setDishStatus(item,value,token);
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
