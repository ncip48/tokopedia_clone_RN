import React, {Component} from 'react';

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Button,
  SearchBar,
  Card,
  withBadge,
} from 'react-native-elements';

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export default class Berita extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      isloading2: true,
      planets: [],
      produk: [],
    };
  }
  componentDidMount() {
    this.GetData();
    //console.log(this.props.route.params)
    //this.callBoth();
    //this.jancok();
  }
  GetData() {
    return fetch('http://192.168.1.101/market_ncip/api/anu2')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState(
          {
            showloadingsearch: false,
            refreshing: false,
            isLoading: false,
            dataSource: responseJson,
          },
          function () {},
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  GetDataProduk(id) {
    return fetch(`http://192.168.1.100/market_ncip/api/produk4?id=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        /*console.log(responseJson);
        this.setState(
          {
            //showloadingsearch: false,
            //refreshing: false,
            isLoading2: false,
            produkk: responseJson,
          },
          function () {},
        );*/
        return <Text>{responseJson.nama_produk}</Text>;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  jancok() {
    let initialPlanets = [];
    return fetch('http://192.168.1.100/market_ncip/api/produk3')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        //data.map((planet) => this.GetDataProduk(planet.id_kategori_produk));
        data.map((planet) => {
          //return planet.id_kategori_produk
          return fetch(
            `http://192.168.1.100/market_ncip/api/produk4?id=${planet.id_kategori_produk}`,
          )
            .then((response) => response.json())
            .then((responseJson) => {
              /*responseJson.map((dataproduk) => 
              this.setState(
              {
                //showloadingsearch: false,
                //refreshing: false,
                isLoading2: false,
                produk: dataproduk,
              },
            ))*/
              //console.log(responseJson);
              this.setState({
                //showloadingsearch: false,
                //refreshing: false,
                isLoading2: false,
                produk: responseJson,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        });
        //console.log(initialPlanets);
        this.setState({
          //refreshing: false,
          //idddd: initialPlanets,
          isLoading: false,
          planets: data,
        }),
          function () {};
      });
  }

  render() {
    //console.log(this.state.idddd)
    //console.log(this.state.produk.map((produk, index) => console.log(produk.nama_produk)))
    //console.log(this.state.produk)
    return (
      <View style={{marginTop: 150}}>
        {this.state.isLoading
          ? null
          : this.state.dataSource.map((data) => (
              <View>
                <Text> {data.nama_kategori} </Text>
                <FlatList
                  horizontal
                  data={data.produk}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Produk Detail', {
                          item: item,
                        })
                      }
                      style={styles.Pembungkus}
                      activeOpacity={1}>
                      <Image
                        style={styles.ImageComponentStyle}
                        source={{
                          uri:
                            'https://nusaserver.com/market_ncip/asset/foto_produk/' +
                            item.gambar,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('Produk Detail', {
                            item: item,
                          })
                        }
                      />
                      <Text
                        style={styles.Judul}
                        onPress={() =>
                          this.props.navigation.navigate('Produk Detail', {
                            item: item,
                          })
                        }>
                        {item.nama_produk}
                      </Text>
                      <Text style={styles.Harga}>
                        {currencyFormat(parseInt(item.harga_konsumen))}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    //justifyContent: 'center',
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  Card: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  Deskripsi: {
    margin: 15,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  Pembungkus: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 5,
    height: 200,
    width: 150,
  },
  FlatListItemStyle: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    height: 500,
  },
  ImageComponentStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    borderRadius: 0,
    borderWidth: 1,
  },
  ImageSkeleton: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    width: '100%',
    borderRadius: 0,
  },
  Judul: {
    color: '#000',
    padding: 2,
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  JudulSkeleton: {
    color: '#000',
    padding: 2,
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    justifyContent: 'center',
    width: 120,
  },
  Harga: {
    color: '#cc0000',
    padding: 2,
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
});
