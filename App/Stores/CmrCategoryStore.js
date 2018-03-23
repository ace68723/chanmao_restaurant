import CmrConstants from '../Constants/CmrConstants';
import {dispatch, register} from '../Dispatchers/CmrDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';


const CmrCategoryStore = Object.assign({},EventEmitter.prototype,{
  state:{
    dishLists:[],
      categoryLists:[],
      waiting: false,
      selectedCateDishes:[],
      searchText:'',
      keyword:'',
      categoryOptions:[],
      toppingGroupList:[],
      selectedCategory:{},
  },
	emitChange(){
	   this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
      this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
	   this.removeListener(CHANGE_EVENT, callback)
	},
    updateCategoryLists(data) {
      this.state.categoryLists = data.categoryLists;
      this.state.categoryOptions = data.categoryOptions;
    },
    updateDishLists(data) {
        this.state.dishLists = data.dishLists;
    },
    getToppongGroup(data) {
        this.state.toppingGroupList = data.toppingGroupList;
    },
    updateSelectedCategory(data) {
        this.state.selectedCateDishes = [];
        this.state.dishLists.forEach((dish, index) => {
            if (dish.dt_id === data.dt_id) {
              this.state.selectedCateDishes.push(dish);
            }
          });
        this.state.keyword = data.name;
        this.state.selectedCategory =data;
    },
    getState(){
    return this.state;
    },
    dispatcherIndex: register(function(action) {
        switch(action.actionType){
            case CmrConstants.GET_CATEGORY_LIST:
                CmrCategoryStore.updateCategoryLists(action.data);
                CmrCategoryStore.emitChange();
                break
            case CmrConstants.GET_DISHES:
                CmrCategoryStore.updateDishLists(action.data);
                CmrCategoryStore.emitChange();
                break;
            case CmrConstants.GET_SUBMENU:
                CmrCategoryStore.getToppongGroup(action.data);
                CmrCategoryStore.emitChange();
                break;
            case CmrConstants.UPDATE_SELECTED_CATEGORY:
                CmrCategoryStore.updateSelectedCategory(action.data);
                CmrCategoryStore.emitChange();
                break

            default:
            // do nothing
            }

    })
});
module.exports = CmrCategoryStore;