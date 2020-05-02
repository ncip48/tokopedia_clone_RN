import React, { Component } from 'react';
 
import { StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, RefreshControl} from 'react-native';
import { Header } from 'react-native-elements';

export default class Kategori extends React.Component {
  
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    isLoading: true
  }
  }
 
  componentDidMount() {
    this.GetData(this.page) //Method for API call
}

 GetData() {
    return fetch('https://nusaserver.com/market_ncip/produk/kategori?type=json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
          showloadingsearch: false,
       refreshing: false,
        isLoading: false,
        dataSource: responseJson
      }, function() {
        // In this block you can do something with new state.
      });
    })
    .catch((error) => {
      console.error(error);
    });
 }

 
FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
 
  GetFlatListItem (fruit_name) {
   
  Alert.alert(fruit_name);
 
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.GetData(4);
  }
 
 
  render() {
      
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

    return (
        <View>
        
        <Header
        statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'tomato' }}
        barStyle="light-content" // or directly
  barStyle="light-content" // or directly
  centerComponent={{ text: 'Kategori', style: { color: 'white', fontSize: 20 } }}
  containerStyle={{
    backgroundColor: 'tomato',
    justifyContent: 'space-around',
  }}
/>


<View>
  
       <FlatList
       
          data={ this.state.dataSource }
          
          ItemSeparatorComponent = {this.FlatListItemSeparator}
 
          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={() => this.props.navigation.navigate('Kategori Produk', {item: item, })} > {item.nama_kategori} </Text>}
          //onPress={() => this.props.navigation.navigate('Kategori Produk', {item: item, })}
          keyExtractor={(item, index) => index}
          refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }
          
         />
    
    
</View>
</View>
            
    );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
 
});