import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import HTML from 'react-native-render-html';
import {Header, Button, ListItem, Card} from 'react-native-elements';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../components/CustomIcon.js';
//#fc4426
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import config from '../Setting/config';

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_konsumen: '',
      isLoading: true,
      refreshing: false,
      temp: ['1', '2', '3', '4', '5'],
    };
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result);
        this.GetData(resultParsed.id_konsumen);
        this.setState({
          id_konsumen: resultParsed.id_konsumen,
        });
        //console.log(resultParsed);
      }
    });
  }

  componentDidMount() {
    //this.GetData(this.state.id_konsumen) //Method for API call
  }

  GetData(id_konsumen) {
    return fetch(
      config.baseurl + `api/cart?id_konsumen=${id_konsumen}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var sum = 0;
        responseJson.forEach((funds) => {
          sum += parseFloat((funds.harga_jual - funds.diskon) * funds.jumlah);
        });
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            refreshing: false,
            total: sum,
            dataSource: responseJson,
          },
          function () {
            // In this block you can do something with new state.
          },
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh = () => {
    this.setState({isLoading: true, refreshing: true});
    this.GetData(this.state.id_konsumen);
  };

  render() {
    const {navigation} = this.props;
    //const item = this.props.route.params.item;
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            translucent: true,
            backgroundColor: 'white',
          }}
          barStyle="light-content" // or directly
          leftComponent={
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={1}>
              <CustomIcon name={'arrow-left'} color={'red'} size={22} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Keranjang Belanja',
            style: {color: 'red', fontSize: 20},
          }}
          /*rightComponent={
            <View style={{flexDirection:"row"}}>
            <Button type="clear" icon={<CustomIcon name={"share"} color={"red"} size={23} onPress={() => navigation.goBack()} />}/>
            <Button type="clear" icon={<CustomIcon name={"basket"} color={"red"} size={23} onPress={() => navigation.goBack()} />}/>
            </View>
          }*/
          containerStyle={{
            backgroundColor: 'light',
            justifyContent: 'space-around',
            padding: 0,
            backgroundColor: 'white',
            //borderBottomColor:'grey',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.state.isLoading ? (
            this.state.temp.map((item, i) => (
              <ListItem
                key={i}
                rightIcon={
                  <ShimmerPlaceHolder
                    autoRun={true}
                    visible={!this.state.isLoading}
                    height={30}
                    width={30}
                    style={{marginTop: 5}}
                  />
                }
                leftAvatar={{}}
                title={
                  <ShimmerPlaceHolder
                    autoRun={true}
                    visible={!this.state.isLoading}
                    height={40}
                    width={Dimensions.get('window').width - 200}
                    //style={styles.JudulSkeleton}
                  />
                }
                subtitle={
                  <ShimmerPlaceHolder
                    autoRun={true}
                    visible={!this.state.isLoading}
                    height={15}
                    width={Dimensions.get('window').width - 300}
                    style={{marginTop: 5}}
                  />
                }
                rightTitle={
                  <ShimmerPlaceHolder
                    autoRun={true}
                    visible={!this.state.isLoading}
                    height={15}
                    width={35}
                    style={{marginTop: 5}}
                  />
                }
                //bottomDivider
                //chevron
              />
            ))
          ) : this.state.dataSource.length > 1 ? (
            <View style={styles.Card}>
              {this.state.dataSource.map((item, i) => (
                <ListItem
                  key={i}
                  rightIcon={
                    <CustomIcon name={'trash'} color={'red'} size={20} />
                  }
                  leftAvatar={{
                    source: {
                      uri:
                        config.baseurl + 'asset/foto_produk/' +
                        item.gambar,
                    },
                  }}
                  title={item.nama_produk.length > 20 ? item.nama_produk.substring(0, 20) + '...' : item.nama_produk}
                  subtitle={
                    item.diskon > 0 ? (
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.coret}>
                          {currencyFormat(parseInt(item.harga_jual))}
                        </Text>
                        <Text style={{color: 'grey'}}>
                          {' '}
                          {currencyFormat(
                            parseInt(item.harga_jual - item.diskon),
                          )}
                        </Text>
                      </View>
                    ) : (
                      currencyFormat(parseInt(item.harga_jual))
                    )
                  }
                  rightTitle={item.jumlah + ' ' + item.satuan}
                  //bottomDivider
                  //topDivider
                  //containerStyle={{marginBottom:5}}
                  //chevron
                />
              ))}
            </View>
          ) : (
            <View style={styles.CardJustify}>
              <Text style={{textAlign: 'center'}}>Kosong</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.Footer}>
          <View style={styles.total}>
            {this.state.isLoading ? (
              <ShimmerPlaceHolder
                autoRun={true}
                visible={!this.state.isLoading}
                height={20}
                width={Dimensions.get('window').width - 200}
                //style={styles.JudulSkeleton}
              />
            ) : (
              <Text>Total : {currencyFormat(parseInt(this.state.total))}</Text>
            )}
          </View>
          <View style={styles.button_checkout}>
            {this.state.isLoading ? (
              <ShimmerPlaceHolder
                autoRun={true}
                visible={!this.state.isLoading}
                height={40}
                width={Dimensions.get('window').width - 250}
                //style={styles.JudulSkeleton}
              />
            ) : (
              <Button
                buttonStyle={{backgroundColor: 'red'}}
                title="Checkout"
                onPress={() => navigation.goBack()}
                titleStyle={{fontSize: 12}}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //backgroundColor: '#e5e5e5',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  Card: {
    //backgroundColor: 'white',
    //marginTop:5,
    marginBottom: 10,
  },
  CardJustify: {
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Deskripsi: {
    margin: 15,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ContainerDeskripsi: {
    marginTop: 0,
    margin: 15,
    marginBottom: 10,
    fontSize: 13,
    color: '#4c4c4c',
  },
  coret: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'red',
  },
  RenderDeskripsi: {
    marginTop: -15,
    margin: 15,
  },
  NamaProduk: {
    margin: 15,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  HargaProduk: {
    marginTop: 0,
    margin: 15,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  ImageComponentStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: Dimensions.get('window').height - 500,
    width: Dimensions.get('window').width,
    borderRadius: 0,
    borderWidth: 1,
  },
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#f00',
  },
  Footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 0.7,
    borderTopColor: 'grey',
  },
  total: {
    width: '70%',
    marginRight: 'auto',
    margin: 10,
  },
  button_checkout: {
    marginLeft: 'auto',
    width: '40%',
    margin: 10,
    //marginRight:20,
  },
});
