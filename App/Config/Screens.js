import { Navigation } from 'react-native-navigation';
import HistoryPage from '../Components/History';
import AboutUs from '../Components/AboutUs';
// import CreateOrder from '../Components/CreateOrder';
// import CreateOrderDetail from '../Components/CreateOrderDetail';
import Login from '../Components/Login';
import Submenu from '../Components/Submenu';
import Category from '../Components/Category';
import AddDish from '../Components/AddDish';
import AddSubmenu from '../Components/AddSubmenu';
import Dish from '../Components/Dish';
import Management from '../Components/Management';
import OrderDetail from '../Components/OrderDetail';
import OrderHistory from '../Components/OrderHistory';
import PaymentHistory from '../Components/PaymentHistory';
import Home from '../Components/Home';
import Tab from '../Components/Tab';
import AddNewCategory from '../Components/AddNewCategory';
import SearchPage from '../Components/SearchPage';
import ChangeCategoryName from '../Components/ChangeCategoryName';
import CmRestaurantAlert from '../Components/CmRestaurantAlert';



// import TabBar from '../Components/TabBar';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('CmRestaurantAlert', () => CmRestaurantAlert);
  Navigation.registerComponent('ChangeCategoryName', () => ChangeCategoryName);
  Navigation.registerComponent('AboutUs', () => AboutUs);
  Navigation.registerComponent('AddDish', () => AddDish);
  Navigation.registerComponent('Dish', () => Dish);
  Navigation.registerComponent('Submenu', () => Submenu);
  Navigation.registerComponent('AddSubmenu', () => AddSubmenu);
  Navigation.registerComponent('Category', () => Category);
  Navigation.registerComponent('Management', () => Management);
  Navigation.registerComponent('HistoryPage', () => HistoryPage);
  // Navigation.registerComponent('CreateOrder', () => CreateOrder);
  // Navigation.registerComponent('CreateOrderDetail', () => CreateOrderDetail);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('OrderDetail', () => OrderDetail);
  Navigation.registerComponent('OrderHistory', () => OrderHistory);
  Navigation.registerComponent('PaymentHistory', () => PaymentHistory);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Tab', () => Tab);
  Navigation.registerComponent('AddNewCategory', () => AddNewCategory);
  Navigation.registerComponent('SearchPage', () => SearchPage);
}
