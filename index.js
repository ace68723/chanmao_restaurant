import { Navigation } from 'react-native-navigation';

import { registerScreens } from './App/Config/Screens';
import { DatabaseInit } from './App/Module/Database';
DatabaseInit();
registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Category',
    navigatorStyle: {
      navBarHidden: true,
    },
    title:'CreateOrder',
    appStyle: {
     navBarTextColor:"#c49a6c",
   },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'fade'
});
