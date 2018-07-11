import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from '../Category/Row'
const window = Dimensions.get('window');
import Settings from '../../Config/Setting';
const {height, width} = Dimensions.get('window');




export default class ChangeCategoryOrder extends Component {
    static navigatorButtons = {
        rightButtons: [
          {
            title: 'Edit', // for a textual button, provide the button title (label)
            id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
            disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
            disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
            showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
            buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
          },
          {
            icon: require('./Image/icon-add.png'), // for icon button, provide the local image asset name
            id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
          }
        ]
      };
    constructor(props){
        super(props);
        this.state ={
            categoryList: props.category
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      }
      onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
          if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
           alert('NavBar', 'Edit button pressed');
          }
          if (event.id == 'add') {
           alert('NavBar', 'Add button pressed');
          }
        }
      }
  render() {
    return (
      <View style={styles.container}>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.categoryList}
          renderRow={this._renderRow} 
          renderHeader = {this.renderListTitle}/>
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
  renderListTitle(){
    return(
      <View style={styles.listTitles}>
        <View style={{flex:0.3,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>ID</Text>
        </View>
        <View style={{flex:0.65,paddingLeft:Settings.getX(2),alignItems:'center',justifyContent:'center',}}>
          <Text style={styles.listTitleFont}>Name</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
  listTitles:{
    flexDirection:'row',
    paddingVertical:Settings.getY(13),
    marginHorizontal: Settings.getX(33),
    justifyContent:'center',
  },
  listTitleFont:{
    fontSize:15,
    fontFamily:'Noto Sans CJK SC',
    fontWeight: 'bold',
    color:'black',
    justifyContent:'center',
  },
});