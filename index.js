import { Navigation } from 'react-native-navigation';

import { registerScreens } from './App/Config/Screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Tab',
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
  animationType: 'slide-down'
});
