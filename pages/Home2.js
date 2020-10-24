import React, { Component } from 'react';

import { ScrollView, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, Image, RefreshControl, StatusBar, Dimensions, AsyncStorage,} from 'react-native';
import { SearchBar,Header, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
import url from './Setting/config';

function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default class HomeScreen extends React.Component {
  
  constructor(props)
  {

    super(props);
    this._handleScroll = this._handleScroll.bind(this)
    this.page = 4;
    this.state = {
        showloadingsearch: false,
        search: '',
        refreshing: false,
        isLoading: true,
        id_kat: '2',
        color: '',
        coloricon: "white",
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
        //this.handleScroll();
        this.GetData(this.page); //Method for API call
        console.log(url)
        //this.GetKategori.bind(this);
        //this.GetProduk();
        //console.log(this.props.route.params.statusbar);
    }

    _handleScroll(event) {
        if(event.nativeEvent.contentOffset.y > 10) {
            //console.log('Putih');
            //if(!this.state.color){
                this.setState({ color: "white", coloricon: "#999999" });   
              //}
        }else{
            //if(this.state.className){
                this.setState({ color: "transparent", coloricon: "white" });
            //}
        }
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
        <View style={{ position: 'absolute' }}>   
            <View style={{ zIndex: 1 }} >
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
            backgroundColor: 'white',
          }}
          containerStyle={{
              backgroundColor: 'transparent',
              margin: 0,
              width: Dimensions.get('window').width-135,
              right: 60,
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
        <Button type="clear" icon={<Ionicons name={"ios-heart"} color={this.state.coloricon} size={25} onPress={() => navigation.goBack()} />}/>
        <Button type="clear" icon={<Ionicons name={"md-mail"} color={"white"} size={25} onPress={() => navigation.goBack()} />}/>
        <Button type="clear" icon={<Ionicons name={"md-notifications"} color={"white"} size={25} onPress={() => navigation.goBack()} />}/>
        </View>
      }
      //backgroundColor='white'
        containerStyle={{
          backgroundColor: 'transparent',
          //justifyContent: 'space-around',
          padding: 0,
          //backgroundColor: 'transparent',
          //backgroundColor: this.state.color,
          //marginTop:10,
          position:'absolute',
          width:Dimensions.get('window').width,
          //zIndex: 1
          //left:4,
          //margin:0,
          //right: 0,
          borderBottomColor:'transparent'
        }}
        
      />
            </View> 
           
            
        </View>
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
        onScroll={this._handleScroll}     
                onScrollAnimationEnd={this._handleScroll} 
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
            marginTop: STATUSBAR_HEIGHT,
          //position:'absolute',
          zIndex: 0
          }}
      />
      {/*this.state.kategori.map(item => {
        //this.setState({id_kat: item.id_kategori_produk})
        //this.GetProduk(item.id_kategori_produk)
        //console.log(this.state.produk.nama_produk)
        //this.getprod(item.id_kategori_produk)
          return (
            <View style={styles.Card}>
              <Text style={styles.Deskripsi}>{item.nama_kategori}</Text>
            </View>
          );
        })*/}

      <View style={styles.Card}>
        <Text style={styles.Deskripsi}>Semua Produk</Text>
       <FlatList
       
          data={ this.state.dataSource }
          //horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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

    //justifyContent: 'center',
    flex:1,
    //position: "absolute",
    backgroundColor: '#e5e5e5',
    //backgroundColor: 'blue'
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
        height: 200,
        width: 150
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

