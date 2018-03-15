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
  
}
