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
      resp: ["hi"],

    };
    // debugger;
  }

  componentWillMount() {
    this._fetchYelpPost();
    this._fetchYelpGet();
    debugger;

  }
  componentHasMount() {
    debugger;
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
    });
  }

  _fetchYelpGet() {
      let data = {
        method: 'GET',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':'Bearer y3Y6d_hVuQYBVSsBWZPhSJHsGx1uigpSZu5LGYv1Q3jTh6XMpOvaXG0O8NjNpFg5wJ3j2lE96pFTa8AXA7Mffg40PV6sOjbvE2R10Ie3kUz24Y_ONfCVpufsPH0gWnYx'
        }
      };
      fetch('https://api.yelp.com/v3/businesses/search?term=restaurants&location=37.786882,-122.399972&limit=1', data)
              .then(response => response.json())
              .then((responceJson) => this.setState({resp: responceJson}))
              .catch(error => {
      console.error(error);
    });;

  };


    navigate() {
      this.props.navigator.push({
        name: "root"
      });
    }

  render(){
    console.log(this.state.resp);
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View style={styles.show}>
        <Text> show </Text>
        <Text style={styles.lable}> Check out restaurants </Text>
        <Text> {this.state.resp[0]}</Text>
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
