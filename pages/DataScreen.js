import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Image, RefreshControl} from 'react-native';
import { SearchBar } from 'react-native-elements';

function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default class Data extends React.Component {
  
  constructor(props)
  {

    super(props);
    this.page = 4;
    this.state = {
        showloadingsearch: false,
        search: '',
        refreshing: false,
        isLoading: true
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
    this.GetData(this.page);
  };


  render() {
    const { search } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
<View style={styles.MainContainer}>
<SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        round={true}
        lightTheme={true}
        showCancel={true}
        showLoading={this.state.showloadingsearch}
        containerStyle={{
            backgroundColor: 'none',
            margin: 0
        }}
      />
  
       <FlatList
       
          data={ this.state.dataSource }
          

          renderItem={({item}) => <View style={styles.Pembungkus}> 
       
            <Image style={styles.ImageComponentStyle} source = {{ uri: "https://nusaserver.com/market_ncip/asset/foto_produk/" + item.gambar }} />

            <Text style={styles.Judul}>{item.nama_produk}</Text>
            <Text style={styles.Harga}>{currencyFormat(parseInt(item.harga_konsumen))}</Text>

            </View>}
            numColumns = { 2 }

          keyExtractor={(item, index) => index}
          refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }
        ListFooterComponent={this.renderFooter.bind(this)}
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
          
         />
    
    
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

    Pembungkus: {
        flex:1,
        flexDirection: 'column', 
        margin:4, 
        backgroundColor:'#fff', 
        borderRadius:10, 
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
    },

    FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  ImageComponentStyle: {
     
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 100,
    borderRadius:10,
    borderWidth: 1,
   
  }
  ,
   
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

