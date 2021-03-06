'use strict';
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
        Image,
        ImageBackground,
        } from 'react-native';

const LATITUDE_DELTA = 0.0922;

class Root extends Component {
  constructor(){
    super();
    this._fetchYelpPost = this._fetchYelpPost.bind(this);
    this._fetchYelpGet = this._fetchYelpGet.bind(this);
    this._getResturaunt = this._getResturaunt.bind(this);

    this.state = {
      position: {
        latitude: 0,
        longitude: 0,
      },
      price: 4,
      radius: 10,
      resp: [null],
      access_token: {},
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      let initialpostiton = {
        latitude: lat,
        longitude: long,
      };
      this.setState({position: initialpostiton});
      }, (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this._fetchYelpPost();
  }


  changePrice(direction){
    let newPrice = this.state.price;
    if (direction === "add" && this.state.price <= 4){
      newPrice = this.state.price + 1;
    } else if(this.state.price > 1){
      newPrice = this.state.price - 1;
    }
    this.setState({price: newPrice});
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
    }).then(response => response.json())
      .then((responceJson) => this.setState({access_token: responceJson}))
      .catch(error => {
        console.error(error);
      });

  }

  _fetchYelpGet() {
    let authorization = this.state.access_token["token_type"]+ " " +this.state.access_token["access_token"]
    let data = {
      method: 'GET',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization,
        }
      };

      let latlng = this.state.position.latitude + "," + this.state.position.longitude
      let price_range = this.state.price
      let distance = this.state.radius * 1609.34
      let url = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" +latlng + "&price=" + price_range + "&distance=" + distance + "&rating>=3" + "&is_closed=false"
      fetch(url, data)
              .then(response => response.json())
              .then((responceJson) => this.setState({resp: responceJson}))
              .then(this.navigate.bind(this))
              .catch(error => {
        console.error(error);
      });;

    };

  _getResturaunt() {
    // this._fetchYelpPost();
    this._fetchYelpGet();
  }

  navigate() {
    this.props.navigator.push({
      name: "show",
      passProps: {
        position: this.state.position,
        price: this.state.price,
        radius: this.state.radius,
        resp: this.state.resp,
        access_token: this.state.access_token
      }
    });
  }

  render() {

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={styles.root}>
        
        <View style={styles.titleView}>

          <Text style={styles.title}> Welcome To </Text>
          <Text style={styles.title}> DinDin </Text>
          <Text style={styles.title}> We Pick the Resturant </Text>
        </View>
        <View style={styles.component}>
          <Text style={styles.lable}> How much </Text>
          <View style={styles.stars}>
            <Icon name="plus" size={30} color="green" onPress={() =>  this.changePrice("add")}/>
            <Icon name="usd" size={50} color={this.state.price >= 4 ? "gold" : "black"} />
            <Icon name="usd" size={50} color={this.state.price >= 3 ? "gold" : "black"} />
            <Icon name="usd" size={50} color={this.state.price >= 2 ? "gold" : "black"} />
            <Icon name="usd" size={50} color={this.state.price >= 1 ? "gold" : "black"} />
            <Icon name="minus" size={30} color="red" onPress={() =>  this.changePrice("minus")}/>
          </View>
        </View>
        <View style={styles.component}>
          <Text style={styles.lable}> How far </Text>
          <Picker
            selectedValue={this.state.radius}
            onValueChange={(itemValue) => this.setState({radius: itemValue})}
            style={{width: 100}} >
            <Picker.Item label="1 mile" value='1' key='1'/>
            <Picker.Item label="2 miles" value='2' key='2'/>
            <Picker.Item label="5 miles" value='5' key='3'/>
            <Picker.Item label="10 miles" value='10' key='3'/>
          </Picker>
        </View>
        <TouchableElement
          style={styles.button}
          onPress={ () => this._getResturaunt()}>
          <Text style={styles.buttonText}> Find Food </Text>
        </TouchableElement>


      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'skyblue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontFamily: 'Futura-CondensedExtraBold',
    fontSize: 36,
    textShadowOffset: {width: 3, height: 3},
    textShadowColor: "blue",
  },
  titleView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stars:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'steelblue',
    width: 300,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    fontFamily: 'Futura-CondensedExtraBold',
    fontSize: 24,
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: "blue",
  },
  lable:{
    fontFamily: 'Futura-CondensedExtraBold',
    fontSize: 24,
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: "blue",
  },
  component: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: "center",
  },

  });

  export default Root;
