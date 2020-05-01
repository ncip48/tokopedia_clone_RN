// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Header, Button, SearchBar, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import all the components we are going to use.
function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default class ProdukDetails extends Component {
  static navigationOptions = {
    //Setting the header of the screen
    title: 'ssProduk Details',
  };
  render() {
      //console.log(JSON.stringify(this.props.navigation.state.params.id_produk))
      const { navigation } = this.props;
       const item = this.props.route.params.item;
    return (
      <View style={styles.container}>
        <Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'white' }}
        barStyle="light-content" // or directly
        leftComponent={<Button type="clear" icon={<Ionicons name={"ios-arrow-back"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>}
        centerComponent={
        <SearchBar
        placeholder="cari produk..."
        round={false}
        lightTheme={true}
        searchIcon={true}
        showCancel={true}
        inputContainerStyle={{
          backgroundColor: '#e5e5e5',
        }}
        containerStyle={{
            backgroundColor: 'transparent',
            margin: 0,
            width: Dimensions.get('window').width - 150,
            right: 20,
            padding: 0,
            borderRadius: 5,
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
        <Button type="clear" icon={<Ionicons name={"md-share"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>
        <Button type="clear" icon={<Ionicons name={"ios-cart"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>

        </View>
      }
        containerStyle={{
          backgroundColor: 'light',
          justifyContent: 'space-around',
          padding: 0,
          backgroundColor: 'white'
        }}
      />
      <ScrollView>
      <View style={styles.Card}>
        <Image style={styles.ImageComponentStyle} source = {{ uri: "https://nusaserver.com/market_ncip/asset/foto_produk/" + item.gambar }} />
        <Text style={styles.NamaProduk}>{item.nama_produk}</Text>
        <Text style={styles.HargaProduk}>{currencyFormat(parseInt(item.harga_konsumen))}</Text>
      </View>
      <View style={styles.Card}>
        <Text style={styles.Deskripsi}>Informasi Produk</Text>
        <Text style={styles.ContainerDeskripsi}>Berat</Text>
        <Text style={styles.ContainerDeskripsi}>Satuan</Text>
        <Text style={styles.ContainerDeskripsi}>Kategori</Text>
        </View>
      <View style={styles.Card}>
        <Text style={styles.Deskripsi}>Deskripsi Produk</Text>
        <HTML html={item.keterangan} containerStyle={styles.RenderDeskripsi} classesStyle={{color:'#4c4c4c'}} />
        </View>
        </ScrollView>
        <View style={styles.Footer}>
        <View style={styles.button_chat}>
        <Button
          icon={<Ionicons name={"ios-heart"} color={"tomato"} size={18} onPress={() => navigation.goBack()} />} 
          type="outline"
          onPress={() => navigation.goBack()} 
          titleStyle={{fontSize:12}}
        />
        </View>
        <View style={styles.button_beli}>
        <Button 
          type="outline"  
          title="Beli" 
          onPress={() => navigation.goBack()} 
          titleStyle={{fontSize:12,color:"tomato"}}
        />
        </View>
        <View style={styles.button_cart}>
        <Button 
          buttonStyle={{backgroundColor:"tomato"}} 
          title="Tambah ke keranjang" 
          onPress={() => navigation.goBack()}
          titleStyle={{fontSize:12}}
        />
        </View>
        </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    //alignItems: 'center',
    //justifyContent: 'center',
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
  ContainerDeskripsi:{
    marginTop:0,
    margin: 15,
    marginBottom:10,
    fontSize: 13,
    color:'#4c4c4c'
  },
  RenderDeskripsi:{
    marginTop:-15,
    margin:15
  },
  NamaProduk: {
    margin: 15,
    marginBottom:10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  HargaProduk: {
    marginTop:0,
    margin: 15,
    marginBottom:10,
    fontSize: 14,
    fontWeight: 'bold',
    color:'red'
  },
  ImageComponentStyle: {
     
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: Dimensions.get('window').height - 500,
    width: Dimensions.get('window').width,
    borderRadius:0,
    borderWidth: 1,
   
  },
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#f00',
  },
  Footer: {
    //position: 'absolute', 
    //left: 0, 
    //right: 0, 
    //bottom: 0, 
    flexDirection:"row", 
    backgroundColor:"#fff",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'white'
    
  },
  button_chat:{
    width: '10%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  button_beli:{
    width: '30%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  button_cart:{
    width: '50%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  }
});