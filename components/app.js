import React, { Component } from 'react';
import {  Text,
          View,
          StyleSheet,
          Navigator,
          TouchableHighlight } from 'react-native';
import { Provider } from 'react-redux';
import SplashContainer from './splash/splashContainer';
import configureStore from '../store/store';
// import SpinnerContainer from './spinner/spinnerContainer';

class App extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'Splash':
        return (<SplashContainer navigator={navigator} />);
      case 'Spinner':
          return (<spinnerContainer navigator={navigator} />);
        break;

    }
  }
  render() {
    const store = configureStore();
    window.store = store;
    return (
      <Provider store={store}>
        <Navigator
        initialRoute={{name: 'Splash'}}
        renderScene={ this.renderScene }
        />
      </Provider>
    );
  }
}

export default App;
