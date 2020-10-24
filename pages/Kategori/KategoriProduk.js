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
  TouchableOpacity,
} from 'react-native';
import {SearchBar, Header, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import CustomIcon from '../../components/CustomIcon';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import config from '../Setting/config';

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export default class Produk extends React.Component {
  constructor(props) {
    super(props);
    this.page = 4;
    this.state = {
      showloadingsearch: false,
      search: '',
      refreshing: false,
      isLoading: true,
      id_kategori: this.props.route.params.item.id_kategori_produk,
      item: this.props.route.params.item,
      temp: ['1', '2', '3', '4', '5', '6', '7', '8'],
    };
  }

  componentDidMount() {
    this.GetData(this.page); //Method for API call
  }

  GetData(page) {
    return fetch(
      config.baseurl + `api/kategori?id=${this.props.route.params.item.id_kategori_produk}&page=${page}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        this.setState(
          {
            showloadingsearch: false,
            refreshing: false,
            isLoading: false,
            dataSource: responseJson.data,
            result: responseJson,
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

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.page = this.page + 4; // increase page by 1
      this.GetData(this.page); // method for API call
    }
  };

  GetFlatListItem(nama_produk) {
    Alert.alert(nama_produk);
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.GetData(4);
    this.page = 4;
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator style={{color: '#000'}} />
      </View>
    );
  };

  updateSearch = (search) => {
    this.setState({search, showloadingsearch: true});
    this.GetData(this.page);
  };

  clearSearch = (search) => {
    this.GetData(this.page);
  };

  render() {
    const {navigation} = this.props;
    const {search} = this.state;

    return (
      <View style={styles.MainContainer}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            translucent: true,
            backgroundColor: 'white',
          }}
          barStyle="light-content" // or directly
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
              <CustomIcon name={'arrow-left'} color={'red'} size={22} />
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={{fontSize: 18}}>
              Kategori {this.state.item.nama_kategori}
            </Text>
          }
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            padding: 0,
          }}
        />
        {this.state.isLoading ? (
          <FlatList
            data={this.state.temp}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
              <View style={styles.Pembungkus}>
                <ShimmerPlaceHolder
                  autoRun={true}
                  visible={false}
                  height={20}
                  style={styles.ImageSkeleton}
                />
                <ShimmerPlaceHolder
                  autoRun={true}
                  visible={false}
                  height={20}
                  style={styles.JudulSkeleton}
                />
                <ShimmerPlaceHolder
                  autoRun={true}
                  visible={false}
                  height={15}
                  style={styles.JudulSkeleton}
                />
              </View>
            )}
            numColumns={2}
            contentContainerStyle={{margin: 5, marginTop: 0}}
          />
        ) : this.state.result.result == 0 ? (
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center', // <-- the magic
                //fontSize: 15,
                color: 'green',
              }}>
              {this.state.result.message}
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <TouchableOpacity
              activeOpacity={1}
                onPress={() =>
                  this.props.navigation.navigate('Produk Detail', {item: item})
                }
                style={styles.Pembungkus}>
                {/*item && item.length ? <Text>Some Text</Text> : <Text> Text</Text>*/}
                <Image
                  style={styles.ImageComponentStyle}
                  source={{
                    uri:
                      config.baseurl + 'asset/foto_produk/' +
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
                  {item.nama_produk.length > 20 ? item.nama_produk.substring(0, 20) + '...' : item.nama_produk}
                </Text>
                <Text style={styles.Harga}>
                  {currencyFormat(parseInt(item.harga_konsumen))}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
            contentContainerStyle={{margin: 5, marginTop: 0}}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    //margin: 10,
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },

  Row: {
    //flex:1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
    height: 250,
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

  Judul: {
    color: '#000',
    padding: 2,
    marginTop:3,
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
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
  ImageSkeleton: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    width: '100%',
    borderRadius: 0,
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
});
