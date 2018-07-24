import CmrConstants from '../Constants/CmrConstants';
import {dispatch, register} from '../Dispatchers/CmrDispatcher';
import CategoryModule from '../Module/Category/CategoryModule'
export default {
      async getCategoryLists(){
        try{
          const data = await CategoryModule.getCategoryLists();
          const typeOptions = [{dt_id:0, name:'Please Select Category'}];
          data.ea_data.forEach(item => {
            const data = {
              dt_id: 0,
              name: ''
            };
            data.dt_id = item.dt_id;
            data.name = item.name;
            typeOptions.push(data);
          });
          const io_data = {
            categoryLists: data.ea_data,
            categoryOptions: typeOptions,
          }
          dispatch({
              actionType: CmrConstants.GET_CATEGORY_LIST, io_data
          })
        }catch(error){
          console.log(error);
        }
      },
      async getDishes(){
        try{
          const data = await CategoryModule.getDishes();
          data.ea_dishes.forEach(item => {
            if(item.status === 0) {
              item.status = true;
            } else {
              item.status = false;
            }
          });
          const io_data = {
            dishLists:data.ea_dishes,
          }
          dispatch({
              actionType: CmrConstants.GET_DISHES, io_data
          })
        }catch(error){
          console.log(error);
        }
      },
      async getToppongGroup(){
        try{
          const data = await CategoryModule.getToppongGroup();
          
          const io_data = {
            toppingGroupList:data.ea_tpgs,
          }
          dispatch({
              actionType: CmrConstants.GET_SUBMENU, io_data
          })
        }catch(error){
          console.log(error);
        }
      },
      updateSelecedCategory(item){
        // const selectedAddress = Object.assign({}, io_address);
        const io_data = item
        dispatch({
            actionType: CmrConstants.UPDATE_SELECTED_CATEGORY, io_data
        })
      },
      getSelectedCategory(){
        dispatch({
            actionType: CmrConstants.GET_SELECTED_CATEGORY
        })
      },
}
