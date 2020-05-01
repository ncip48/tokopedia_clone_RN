import React, { Component } from 'react';

import { ScrollView, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Image, RefreshControl, Dimensions} from 'react-native';
import { SearchBar,Header, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";

function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default class HomeScreen extends React.Component {
  
  constructor(props)
  {

    super(props);
    this.page = 4;
    this.state = {
        showloadingsearch: false,
        search: '',
        refreshing: false,
        isLoading: true,
        images: [
          "https://source.unsplash.com/1024x768/?nature",
          "https://source.unsplash.com/1024x768/?water",
          "https://source.unsplash.com/1024x768/?girl",
          "https://source.unsplash.com/1024x768/?tree", // Network image
        ]
  }
  }

  /*componentDidMount() {
    this.GetData(5);
       
     } */

    componentDidMount() {
        this.GetData(this.page) //Method for API call
    }

     GetData(page) {
        return fetch(`https://nusaserver.com/market_ncip/produk?type=json&page=${page}&search=${this.state.search}`)
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

     handleLoadMore = () => {
        if (!this.state.isLoading) {
          this.page = this.page + 4; // increase page by 1
          this.GetData(this.page); // method for API call
        }
      };

  GetFlatListItem (nama_produk) {
   
  Alert.alert(nama_produk);

  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.GetData(4);
    this.page = 4;
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
     if (!this.state.isLoading) return null;
     /*return (
       <ActivityIndicator
         style={{ color: '#000' }}
       />
     );*/
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator style={{ color: '#000' }}/>
              </View>
            );
   };

   updateSearch = search => {
    this.setState({ search, showloadingsearch: true, });
    this.GetData(this.page)
    //this.state.search=='' ? this.GetData(4) : this.GetData(this.page);
  };

  clearSearch = search => {
    this.GetData(this.page);
  }


  render() {
    const { search } = this.state;

    
    return (
<View style={styles.MainContainer}>
<Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'white' }}
        barStyle="light-content" // or directly
        //leftComponent={<Button type="clear" icon={<Ionicons name={"ios-arrow-back"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>}
        centerComponent={
        <SearchBar
        placeholder="cari produk..."
        onChangeText={this.updateSearch}
        showLoading={this.state.showloadingsearch}
        value={search}
        round={false}
        lightTheme={true}
        showCancel={true}
        inputContainerStyle={{
          backgroundColor: '#e5e5e5',
        }}
        containerStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            width: Dimensions.get('window').width-135,
            right: 55,
            padding: 0,
            borderRadius: 5
        }}
        inputStyle={{
          color: '#000',
          height: 10,
          fontSize: 14
        }}
        //placeholderTextColor={'#000'}
      />
      }
      rightComponent={
        <View style={{flexDirection:"row"}}>
        <Button type="clear" icon={<Ionicons name={"ios-heart"} color={"#999999"} size={25} onPress={() => navigation.goBack()} />}/>
        <Button type="clear" icon={<Ionicons name={"md-mail"} color={"#999999"} size={25} onPress={() => navigation.goBack()} />}/>
        <Button type="clear" icon={<Ionicons name={"md-notifications"} color={"#999999"} size={25} onPress={() => navigation.goBack()} />}/>
        </View>
      }
      backgroundColor='transparent'
        containerStyle={{
          backgroundColor: 'white',
          padding: 0,
          marginTop:10,
          //position:'absolute',
          //zIndex: 1
        }}
      />
      
      {this.state.isLoading ? 
      <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      :
      <ScrollView
      refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        
        >
      <SliderBox 
        images={this.state.images} 
        autoplay
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)"
        }}
        ImageComponentStyle={{
          //marginTop: -100,
          //position:'absolute',
          //zIndex: 0
          }}
      />
      <View style={styles.Card}>
        <Text style={styles.Deskripsi}>Semua Produk</Text>
       <FlatList
       
          data={ this.state.dataSource }

          renderItem={({item}) => 
            
          <View style={styles.Pembungkus}>

            {/*item && item.length ? <Text>Some Text</Text> : <Text> Text</Text>*/ }
            <Image style={styles.ImageComponentStyle} source = {{ uri: "https://nusaserver.com/market_ncip/asset/foto_produk/" + item.gambar }} onPress={() => this.props.navigation.navigate('Produk Detail', {item: item, })} />

            <Text 
            style={styles.Judul}
            onPress={() => this.props.navigation.navigate('Produk Detail', {item: item, })}
            >{item.nama_produk}</Text>
            <Text style={styles.Harga}>{currencyFormat(parseInt(item.harga_konsumen))}</Text>

            </View>}
            numColumns = { 2 }
            contentContainerStyle={{margin:5, marginTop:0}}
          keyExtractor={(item, index) => index}
          
        ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
          
         />
         </View>
         </ScrollView>
      }
    
    
</View>
            
    );
  }
}

const styles = StyleSheet.create({

    MainContainer :{

    justifyContent: 'center',
    flex:1,
    backgroundColor: '#e5e5e5'
    //margin: 10,
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0,

    },
    Card:{
      backgroundColor: 'white',
      marginBottom: 10
    },
    Deskripsi:{
      margin: 15,
      marginBottom:15,
      fontSize: 14,
      fontWeight: 'bold',
    },

    Pembungkus: {
        flex:1,
        flexDirection: 'column',
        backgroundColor:'#fff', 
        borderRadius:5, 
        borderWidth: 1,
        borderColor: '#e5e5e5',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        margin: 5,
        height: 250
    },

    FlatListItemStyle: {
      margin: 10,
    padding: 10,
    fontSize: 18,
    height: 500,
  },

  ImageComponentStyle: {
     
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    borderRadius:0,
    borderWidth: 1,
   
  },
   
  Judul: {
   
     color: '#000',
     padding: 2,
     fontSize: 15,
     textAlign: 'left',
     marginBottom: 5,
     marginLeft:10,
     marginRight:10,
     justifyContent: 'center'
   },

   Harga:{
    color: '#cc0000',
    padding: 2,
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
    marginRight:10,
    justifyContent: 'center'
   }

});

