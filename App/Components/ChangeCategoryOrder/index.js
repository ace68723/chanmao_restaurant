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
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from '../Category/Row'
const window = Dimensions.get('window');


const data = {
  0: {
    name: '22',
    ds_id: 22,
  },
  1: {
    name: '22',
    ds_id: 22,
  },
  2: {
    name: '22',
    ds_id: 22,
  },
  3: {
    name: '22',
    ds_id: 22,
  },
  4: {
    name: '22',
    ds_id: 22,
  },
  5: {
    name: '22',
    ds_id: 22,
  },
  6: {
    name: '22',
    ds_id: 22,
  },
  7: {
    name: '22',
    ds_id: 22,
  },
  8: {
    name: '22',
    ds_id: 22,
  },
  9: {
    name: '22',
    ds_id: 22,
  },
  10: {
    name: '22',
    ds_id: 22,
  },
  11: {
     name: '22',
    ds_id: 22,
  },
  12: {
     name: '22',
    ds_id: 22,
  },
  13: {
     name: '22',
    ds_id: 22,
  },
};

export default class ChangeCategoryOrder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>React Native Sortable List</Text>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderRow={this._renderRow} />
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
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
});