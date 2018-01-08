import { Navigation } from 'react-native-navigation';

import { registerScreens } from './App/Config/Screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Login',
    navigatorStyle: {
      navBarHidden: true,
    },
    title:'About Us',
    appStyle: {
     navBarTextColor:"#c49a6c",
   },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down'
});
