import { Navigation } from 'react-native-navigation';

import { registerScreens } from './App/Config/Screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'CreateOrderDetail',
    navigatorStyle: {
      navBarHidden: false,
    },
    title:'CreateOrderDetail',
    appStyle: {
     navBarTextColor:"#c49a6c",
   },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down'
});
