import React, { Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Setting from '../../Config/Setting.js'

const GOOGLE_API_KEY = 'AIzaSyD27tcH34ui-lyuJaPSlmCPAB7Kokra9Aw';
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: ds.cloneWithRows([]),
      value: '',
      showList: false
    };
    this.searchLocation = this.searchLocation.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.onFocusInput = this.onFocusInput.bind(this);
  }

  async searchLocation(query) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
      GOOGLE_API_KEY
    }&input=${query}`;
    this.setState({ isLoading: true, value: query });
    const response = await fetch(url);
    const jsonResponse = await response.json();
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(jsonResponse.predictions),
    });
  }

  renderRow(prediction) {
    return (
      <TouchableOpacity
        onPress={() => this.onListItemClicked(prediction)}
        style={styles.listItem}
      >
        <Text>{prediction.description}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.listItemSeparator} />;
  }

  async onListItemClicked(prediction) {
    this.setState({
      value: prediction.description,
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
    });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      prediction.place_id
    }&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    this.setState({ isLoading: false });
    this.setState({ showList: false });
  }
  onFocusInput(){
    this.setState({ showList: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.value}
          style={styles.input}
          onChangeText={this.searchLocation}
          onFocus={this.onFocusInput}
          underlineColorAndroid='rgba(0,0,0,0)'/>

        {this.state.showList &&
          <ListView
            enableEmptySections
            style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // backgroundColor: 'grey',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
  input: {
    textAlign: 'left',
    width: Setting.getX(340),
    height: Setting.getY(40),
    marginRight: Setting.getX(44),
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,

  },
  listView: {
    elevation: 20, // fix that shit...
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: Setting.getY(40),
    height: Setting.getY(200),
    width: Setting.getX(340),
  },
  listItem: {
    padding: 10,
  },
  listItemSeparator: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
});
