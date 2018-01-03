import { Navigation } from 'react-native-navigation';

import { registerScreens } from './App/Config/Screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    navigatorStyle: {
      navBarHidden: false,
    },
    title:'Login',
    appStyle: {
     navBarTextColor:"#c49a6c",
   },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down'
});
