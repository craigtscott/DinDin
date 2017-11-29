import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text,
        View,
        StyleSheet,
        Navigator,
        TouchableHighlight,
        AsyncStorage,
        AppRegistry,
        TextInput,
        Button,
        ActivityIndicatorIOS,
        Platform,
        Picker,
        } from 'react-native';

class Show extends Component{
  constructor(props){
    super(props);

    this.state = {
      position: this.props.navigator.state.routeStack[1].passProps.position,
      price: this.props.navigator.state.routeStack[1].passProps.price,
      radius: this.props.navigator.state.routeStack[1].passProps.radius,
    };

  }

  componentDidMount() {
    debugger;
  }

  render(){
    return(
      <View>
        <Text> show </Text>
      </View>
    );
  }
}

export default Show;
