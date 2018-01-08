import { Navigation } from 'react-native-navigation';
import HistoryPage from '../Components/History';
import AboutUs from '../Components/AboutUs';
import CreateOrder from '../Components/CreateOrder';
import CreateOrderDetail from '../Components/CreateOrderDetail';
import Login from '../Components/Login';
import OrderDetail from '../Components/OrderDetail';
import OrderHistory from '../Components/OrderHistory';
import PaymentHistory from '../Components/PaymentHistory';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('AboutUs', () => AboutUs);
  Navigation.registerComponent('HistoryPage', () => HistoryPage);
  Navigation.registerComponent('CreateOrder', () => CreateOrder);
  Navigation.registerComponent('CreateOrderDetail', () => CreateOrderDetail);
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('OrderDetail', () => OrderDetail);
  Navigation.registerComponent('OrderHistory', () => OrderHistory);
  Navigation.registerComponent('PaymentHistory', () => PaymentHistory);

}
