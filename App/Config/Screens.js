import { Navigation } from 'react-native-navigation';
import HistoryPage from '../Components/History';
import AboutUs from '../Components/AboutUs';
import CreateOrder from '../Components/CreateOrder';
import CreateOrderDetail from '../Components/CreateOrderDetail';
import Login from '../Components/Login';
import Submenu from '../Components/Submenu';
import Category from '../Components/Category';
import Dish from '../Components/Dish';
import Management from '../Components/Management';
import OrderDetail from '../Components/OrderDetail';
import OrderHistory from '../Components/OrderHistory';
import PaymentHistory from '../Components/PaymentHistory';
import Home from '../Components/Home';
import Tab from '../Components/Tab';
// import TabBar from '../Components/TabBar';
// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('AboutUs', () => AboutUs);
  Navigation.registerComponent('Dish', () => Dish);
  Navigation.registerComponent('Submenu', () => Submenu);
  Navigation.registerComponent('Category', () => Category);
  Navigation.registerComponent('Management', () => Management);
  Navigation.registerComponent('HistoryPage', () => HistoryPage);
  Navigation.registerComponent('CreateOrder', () => CreateOrder);
  Navigation.registerComponent('CreateOrderDetail', () => CreateOrderDetail);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('OrderDetail', () => OrderDetail);
  Navigation.registerComponent('OrderHistory', () => OrderHistory);
  Navigation.registerComponent('PaymentHistory', () => PaymentHistory);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Tab', () => Tab);
}
