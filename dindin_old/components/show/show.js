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


    navigate() {
      this.props.navigator.push({
        name: "root"
      });
    }

  render(){
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View style={styles.show}>
        <Text> show </Text>
        <Text style={styles.lable}> Check out restaurants </Text>

        <TouchableElement
          style={styles.button}
          onPress={this.navigate.bind(this)}>
          <Text style={styles.buttonText}> Back </Text>
        </TouchableElement>
      </View>
    );
  }
}


const styles = StyleSheet.create({

show:{
  flex: 1,
  width: "100%",
  backgroundColor: 'steelblue',
  marginTop: 20,
},
button: {

  backgroundColor: 'steelblue',
  width: 100,
  borderWidth: 3,
  borderColor: 'black',
  borderRadius: 7,
  alignItems: 'center',
  justifyContent: 'center',
  height:100,
},
buttonText:{
  fontFamily: 'Futura-CondensedExtraBold',
  fontSize: 30,
  textShadowOffset: {width: 1, height: 1},
  textShadowColor: "blue",
},
lable:{
  fontFamily: 'Futura-CondensedExtraBold',
  fontSize: 24,
  textShadowOffset: {width: 1, height: 1},
  textShadowColor: "blue",
}
});


export default Show;
