/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';



import NavigationExperimental from 'react-native-deprecated-custom-components';

import Show from './components/show/show';
import Root from './components/root/root';




export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this._fetchYelpPost = this._fetchYelpPost.bind(this);
    this._fetchYelpGet = this._fetchYelpGet.bind(this);
  }

  renderScene(route, navigator) {
  console.log(route);
  if(route.name === 'root') {
    return <Root navigator={navigator} />;
  }
  if(route.name === 'show') {
    return <Show navigator={navigator} />;
  }
}

  _fetchYelpPost(){
    var details = {
      'client_id': '-qWaHcsd1FNhDOLm5IG1zw',
      'client_secret': '2Z8KwxPhOiPr2NHmXzSGMppsocPykN4wLHaSl59icE0IRNNyEwHfCKO85ZZ071no',
      'grant_type': 'client_credentials'
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://api.yelp.com/oauth2/token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
  }


  _fetchYelpGet(){
    let data = {
      method: 'GET',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Bearer y3Y6d_hVuQYBVSsBWZPhSJHsGx1uigpSZu5LGYv1Q3jTh6XMpOvaXG0O8NjNpFg5wJ3j2lE96pFTa8AXA7Mffg40PV6sOjbvE2R10Ie3kUz24Y_ONfCVpufsPH0gWnYx'
      }
    }
    return fetch('https://api.yelp.com/v3/businesses/search?term=restaurants&location=37.786882,-122.399972&limit=1', data)
            .then(response => response.json());
  }
  render() {
    return(
      <View style={styles.container}>
        <NavigationExperimental.Navigator
          initialRoute={{name: 'root'}}
          renderScene={this.renderScene.bind(this)}
          />
      </View>
    );
  }
}
AppRegistry.registerComponent('DinDin', () => DinDin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
