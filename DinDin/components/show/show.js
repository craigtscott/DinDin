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
        ListView,
        TouchableOpacity,
        } from 'react-native';

class Show extends Component{
  constructor(props){
    super(props);
    var dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})

    let ran = Math.floor(Math.random() * this.props.navigator.state.routeStack[1].passProps.resp.businesses.length) + 1;

    this.state = {
      position: this.props.navigator.state.routeStack[1].passProps.position,
      price: this.props.navigator.state.routeStack[1].passProps.price,
      radius: this.props.navigator.state.routeStack[1].passProps.radius,
      resp: this.props.navigator.state.routeStack[1].passProps.resp,
      access_token: this.props.navigator.state.routeStack[1].passProps.access_token,
      reviews: [null],
      resturant: this.props.navigator.state.routeStack[1].passProps.resp.businesses[ran],
      results: dataStore.cloneWithRows(this.props.navigator.state.routeStack[1].passProps.resp.businesses)

    };
    console.log("const");
    debugger
    this._fetchYelpGetReviews();
    console.log("inside const");
    console.log(this.state.reviews);

  }

  componentWillMount() {

  console.log("will mount");
  console.log("inside willmount");
  console.log(this.state.reviews);
  }
  componentDidMount() {
    // if (this.state.reviews[0]){
    //
    //   this._fetchYelpGetReviews2();
    // }

    console.log("didmount");
    console.log("inside didmount");
    console.log(this.state.reviews);

  }
  componentDidUpdate() {
    //debugger;
   //this._fetchYelpGetReviews2();
  console.log("didupdate");
  console.log("inside didmount");
  console.log(this.state.reviews);
  }

  // _pickResturaunt() {
  //   let ran = Math.floor(Math.random() * this.state.resp.businesses.length) + 1;
  //   this.setState({resturant: this.state.resp.businesses[ran]});
  //
  //
  // }


  _fetchYelpGetReviews() {
    let authorization = this.state.access_token["token_type"]+ " " +this.state.access_token["access_token"]
    let data = {
      method: 'GET',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization,
        }
      };

      console.log(this.state.resturant.id);

      let url = "https://api.yelp.com/v3/businesses/" + this.state.resturant.id + "/reviews"
      console.log(url);
      fetch(url, data)
              .then(response => response.json())
              .then((responceJson) => this.setState({reviews: responceJson.reviews}))
              //.then(()=> {this._fetchYelpGetReviews2.bind(this);})
              .catch(error => {
        console.error(error);
      });
      debugger;
      console.log("inside function");

      console.log(this.state.reviews);

    }
  _fetchYelpGetReviews2() {

      //debugger;
      var dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
      console.log(dataStore);
      this.setState({
          results: dataStore.cloneWithRows(this.state.reviews)
      });
      //debugger;
      console.log(this.state);
      console.log(this.state.reviews);

    }

    navigate() {
      this.props.navigator.push({
        name: "root"
      });
    }

  render(){
    //console.log(this.state.access_token);
    console.log("render");

    console.log(this.state);
    console.log("inside render");
    console.log(this.state.reviews);
    // if (this.state.reviews[0]){
    //
    //   this._fetchYelpGetReviews2();
    // }
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
    TouchableElement = TouchableNativeFeedback;
    }
    return(
      <View style={styles.show}>
        <Text> show </Text>
        <Text style={styles.lable}> Check out restaurants </Text>
        <Text>Name of the Restaurant: {this.state.resturant.name}</Text>
        <Text>Phone: {this.state.resturant.display_phone}</Text>
        <Text>Rating: {this.state.resturant.rating}</Text>
        <Image source={{uri: this.state.resturant.image_url}}
          style={{width: 80, height: 80, justifyContent: 'flex-start'}} />


        <TouchableElement
          style={styles.button}
          onPress={this.navigate.bind(this)}>
          <Text style={styles.buttonText}> Back </Text>
        </TouchableElement>
        <TouchableElement
          style={styles.button}
          onPress={this._fetchYelpGetReviews2.bind(this)}>
          <Text style={styles.buttonText}> list </Text>
        </TouchableElement>
        <ListView
         style={{marginTop: 100}}
         initialListSize={10}
         dataSource={this.state.results}
         renderRow={(result) => { return this.renderResult(result) }} />
      </View>
    );
  }
  renderResult(result) {
    return (
      <TouchableOpacity>

       <View style={{flexDirection: 'column', justifyContent: 'center'}}>
         <Text style={{fontWeight: 'bold'}}>{`${result.text}`}</Text>
         <Text>Rating: {`${result.rating}`}</Text>
       </View>
      </TouchableOpacity>
    )
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
