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
        } from 'react-native';

const LATITUDE_DELTA = 0.0922;

class Root extends Component {
  constructor(){
    super();

    this.state = {
      position: {
        latitude: 0,
        longitude: 0,
      },
      price: 4,
      radius: 10,
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
  );}

  changePrice(direction){
    let newPrice = this.state.price;
    // debugger;
    if (direction === "add" && this.state.price <= 4){
      newPrice = this.state.price + 1;
    } else if(this.state.price > 1){
      newPrice = this.state.price - 1;
    }
    this.setState({price: newPrice});
  }


  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Welcome To DinDin</Text>
        <Text>We Pick the Resturant</Text>
        <View style={styles.height}>
          <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <Text>your location</Text>
          <Text>lattitude: {this.state.position.latitude}</Text>
          <Text>longitude: {this.state.position.longitude}</Text>
        </View>
        <View style={styles.stars}>
        <Icon name="minus" size={50} color="red" onPress={() =>  this.changePrice("minus")}/>
        <Icon name="usd" size={50} color={this.state.price >= 4 ? "gold" : "black"} />
        <Icon name="usd" size={50} color={this.state.price >= 3 ? "gold" : "black"} />
        <Icon name="usd" size={50} color={this.state.price >= 2 ? "gold" : "black"} />
        <Icon name="usd" size={50} color={this.state.price >= 1 ? "gold" : "black"} />

        <Icon name="plus" size={50} color="green" onPress={() =>  this.changePrice("add")}/>

        </View>
      </View>
    );
  }
  }

  const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B3CC57',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Futura-CondensedExtraBold',
  },
  stars:{
    flex: 1,
    flexDirection: 'row',
  }
  });

  export default Root;
