// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
//import all the components we are going to use.

export default class ProfileScreen extends Component {
  static navigationOptions = {
    //Setting the header of the screen
    title: 'Second Page',
  };
  render() {
      //console.log(JSON.stringify(this.props.navigation.state.params.id_produk))
      const { navigation } = this.props;
       const id = this.props.route.params.id_produk;
        console.log(id);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {id}</Text>
        </View>
    );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#f00',
  },
});