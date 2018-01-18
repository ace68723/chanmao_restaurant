import {
  Alert
} from 'react-native';

export default  {
  openAlert(title, message, mainButtonTitle, cancelButtonTitle){
    Alert.alert(
      title,
      message,
      [
        {text: cancelButtonTitle, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: mainButtonTitle, onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true }
    )
  }
}
