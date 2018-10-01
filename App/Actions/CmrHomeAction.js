import CmrConstants from '../Constants/CmrConstants';
import {dispatch, register} from '../Dispatchers/CmrDispatcher';
import HomeModule from '../Module/Home/HomeModule'
export default {
      async fetchOrder(){
        try{
            const data = await HomeModule.fetchOrder();
            console.log(data);
            data.ea_done.sort(function(a,b){
              return parseInt(b.oid)  - parseInt(a.oid);
            })
            data.ea_new.sort(function(a,b){
                return parseInt(b.oid)  - parseInt(a.oid);
            })
          const io_data = {
              ea_new: data.ea_new,
              ea_done:data.ea_done,
          };
          dispatch({
              actionType: CmrConstants.FETCH_ORDER, io_data
          })
        }catch(error){
          console.log(error);
        }
      },
   
}
