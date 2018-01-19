import React, { Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import Setting from '../../Config/Setting'
import {GOOGLE_API_KEY} from '../../Config/API'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      value: '',
      showList: false
    };
    this.searchLocation = this.searchLocation.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
  }

  async searchLocation(query) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
                GOOGLE_API_KEY
                }&input=${query}
                &components=country:ca&types=address&language=en`;
    this.setState({ isLoading: true, value: query });
    const response = await fetch(url);
    const jsonResponse = await response.json();
    //console.log(jsonResponse.predictions)
    this.setState({
      isLoading: false,
      data: jsonResponse.predictions
    });
  }

  renderRow(prediction) {
    return (
      <TouchableOpacity
        onPress={() => this.onListItemClicked(prediction)}
        style={styles.listItem}
      >
        <Text
          style={{ fontSize: 20 }}>{prediction.description}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.listItemSeparator} />;
  }

  async onListItemClicked(prediction) {
    this.setState({
      value: prediction.description,
      data: [],
      isLoading: true,
    });
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
      prediction.place_id
    }&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    this.setState({ isLoading: false });
    this.setState({ showList: true });
    this.props.onChangeText(prediction);
  }

  onFocusInput(){
    this.setState({ showList: true });
  }

  onBlurInput(){
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
          onSubmitEditing={this.onBlurInput}
          autoFocus={this.props.autoFocus}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder='Address' />

        {this.state.showList && this.state.value != '' &&
          <FlatList
            data={this.state.data}
            style={styles.listView}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => this.renderRow(item)}
            ItemSeparatorComponent={this.renderSeparator}
          />
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
    width: Setting.getX(540),
    height: Setting.getY(60),
    borderWidth: 0.5,
    borderColor: '#6D6E71',
    padding:1,
    paddingLeft:10,
    fontSize: 20,
  },
  listView: {
    elevation: 5, // fix that shit...
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: Setting.getY(60),
    height: Setting.getY(380),
    width: Setting.getX(540),
  },
  listItem: {
    padding: 10,
  },
  listItemSeparator: {
    alignSelf: 'center',
    width: Setting.getY(480),
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
});
