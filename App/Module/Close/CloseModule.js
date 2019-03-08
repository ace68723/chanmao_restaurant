import CloseAPI from './CloseAPI';
import { GetUserInfo } from '../Database';
import {
  NativeModules,
  Alert,
} from 'react-native';
export default  {
  async getRRClose(){
    try {
      const { authortoken } = GetUserInfo();
      const data = await CloseAPI.getRRClose(authortoken);
      console.log(data);
      if(data.ev_error === 0 ){
         return data.close_info;
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    } catch (error) {
      throw error
    }

  },
  async createRRClose(start_time,end_time){
    try {

        const { authortoken } = GetUserInfo();
        const data = await CloseAPI.createRRClose(authortoken,start_time,end_time);
        console.log(data);
        if(data.ev_error === 0 ){
           return data
        }else{
          const errorMessage = data.ev_context;
          throw errorMessage
        }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
  async updateRRClose(id,start_time,end_time){
    try {
      const { authortoken } = GetUserInfo();
      const data = await CloseAPI.updateRRClose(authortoken,id,start_time,end_time);
      console.log(data);
      if(data.ev_error === 0 ){
         return data
      }else{
        const errorMessage = data.ev_context;
        throw errorMessage
      }
    } catch (error) {
      console.log(error);
      throw error
    }

  },
}

