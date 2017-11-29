/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Navigator,
   Text,
   View
 } from 'react-native';

import Show from './show/show';
import Root from './root/root';


class DinDin extends Component{

  renderScene(route, navigator) {
    console.log(route);
    if(route.name === 'root') {
      return <Root navigator={navigator} />;
    }
    if(route.name === 'show') {
      return <Show navigator={navigator} />;
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Navigator
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
