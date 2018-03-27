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
      editLevel: false,
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
        console.log(data)
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
        console.log(this.state)
    },
    getDishData() {
        console.log('store')
        return oa_data = {
            selectedCateDishes:this.state.selectedCateDishes,
            keyword: this.state.keyword,
            category:this.state.selectedCategory
        }
    },
    getDishDataByCategory(category) {
        return this.state.dishLists.filter((dish)=>{
              dish.dt_id === category.dt_id
        })
    },
    getState(){
    return this.state;
    },
    dispatcherIndex: register(function(action) {
        switch(action.actionType){
            case CmrConstants.GET_CATEGORY_LIST:
            console.log(action.io_data)
                CmrCategoryStore.updateCategoryLists(action.io_data);
                CmrCategoryStore.emitChange();
                break
            case CmrConstants.GET_DISHES:
            console.log(action.io_data)
                CmrCategoryStore.updateDishLists(action.io_data);
                CmrCategoryStore.emitChange();
                break;
            case CmrConstants.GET_SUBMENU:
            console.log(action.io_data)
                CmrCategoryStore.getToppongGroup(action.io_data);
                CmrCategoryStore.emitChange();
                break;
            case CmrConstants.UPDATE_SELECTED_CATEGORY:
            console.log(action.io_data)
                CmrCategoryStore.updateSelectedCategory(action.io_data);
                CmrCategoryStore.emitChange();
                break
            case CmrConstants.GET_SELECTED_CATEGORY:
                // CmrCategoryStore.getDishData();
                CmrCategoryStore.emitChange();
                break;
            default:
            // do nothing
            }

    })
});
module.exports = CmrCategoryStore;
