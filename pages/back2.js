import React, {Component} from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Image,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import {
  SearchBar,
  Header,
  Button,
  withBadge,
  Icon,
  Badge,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SliderBox} from 'react-native-image-slider-box';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import url from './Setting/config';
import CustomIcon from '../components/CustomIcon.js';

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const Header_Maximum_Height = 150;
const Header_Minimum_Height = 50;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
const AnimatedIcon = Animated.createAnimatedComponent(CustomIcon);
const BadgedIcon = withBadge(3, {left: 5, top: -2})(AnimatedIcon);
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.AnimatedStatusBarValue = new Animated.Value(0);
    this.scroll = new Animated.Value(0);
    this.AnimatedHeaderValue = new Animated.Value(0);
    this.AnimatedSearchBarValue = new Animated.Value(0);
    this.page = 4;
    this.state = {
      showloadingsearch: false,
      search: '',
      refreshing: false,
      isLoading: true,
      dark: true,
      colorsearch: 'white',
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',
      ],
    };
  }
  componentDidMount() {
    this.GetData(this.page);
    //console.log(this.props.route.params)
    this.GetProdukKategori();
  }

  GetData(page) {
    return fetch(
      `https://nusaserver.com/market_ncip/produk?type=json&page=${page}&search=${this.state.search}`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
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

  GetProdukKategori(){

  }

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.page = this.page + 4; // increase page by 1
      this.GetData(this.page); // method for API call
    }
  };

  _onRefresh = () => {
    this.setState({refreshing: true, isLoading: true});
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
    //this.state.search=='' ? this.GetData(4) : this.GetData(this.page);
  };

  clearSearch = (search) => {
    this.GetData(this.page);
  };

  changeStatusBar = ({nativeEvent}) => {
    let y = nativeEvent.contentOffset.y;
    this.scroll.setValue(y); // set scroll animation value here
    const {dark} = this.state;
    let scrollValue = y;
    if (scrollValue > 100 && dark) {
      this.setState({dark: false, colorsearch: '#e5e5e5'});
    }
    if (scrollValue < 100 && !dark) {
      this.setState({dark: true, colorsearch: '#fff'});
    }
  };

  render() {
    const {search, dark} = this.state;
    return (
      <View style={styles.MainContainer}>
        <View style={{position: 'absolute'}}>
          <View style={{zIndex: 1}}>
            <AnimatedStatusBar
              translucent
              barStyle={!dark ? 'dark-content' : 'light-content'}
              backgroundColor={this.AnimatedHeaderValue.interpolate({
                inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
                outputRange: ['transparent', 'white'],
                extrapolate: 'clamp',
              })}
            />
            <AnimatedHeader
              statusBarProps={{translucent: true}}
              centerComponent={
                <AnimatedSearchBar
                  placeholder="cari produk..."
                  //onChangeText={this.updateSearch}
                  //showLoading={this.state.showloadingsearch}
                  //value={search}
                  round={false}
                  lightTheme={true}
                  showCancel={true}
                  inputContainerStyle={{
                    //backgroundColor: 'white',
                    backgroundColor: this.state.colorsearch
                  }}
                  containerStyle={{
                    backgroundColor: 'white',
                    margin: 0,
                    width: Dimensions.get('window').width - 135,
                    right: 60,
                    padding: 0,
                    borderRadius: 5,
                  }}
                  inputStyle={{
                    color: '#000',
                    height: 10,
                    fontSize: 14,
                  }}
                />
              }
              rightComponent={
                <View style={{flexDirection: 'row'}}>
                  <Button
                    type="clear"
                    icon={
                      <AnimatedIcon
                        name={'heart'}
                        //color={'red'}
                        style={{
                          color: this.AnimatedHeaderValue.interpolate({
                            inputRange: [
                              0,
                              Header_Maximum_Height - Header_Minimum_Height,
                            ],
                            outputRange: ['white', 'red'],
                            extrapolate: 'clamp',
                          }),
                        }}
                        size={23}
                        onPress={() => navigation.goBack()}
                      />
                    }
                  />
                  <Button
                    type="clear"
                    icon={
                      <AnimatedIcon
                        name={'bell'}
                        //color={'red'}
                        style={{
                          color: this.AnimatedHeaderValue.interpolate({
                            inputRange: [
                              0,
                              Header_Maximum_Height - Header_Minimum_Height,
                            ],
                            outputRange: ['white', 'red'],
                            extrapolate: 'clamp',
                          }),
                        }}
                        size={23}
                        onPress={() => navigation.goBack()}
                      />
                    }
                  />
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Cart Page')}
                    style={{top: 7}}
                    activeOpacity={1}>
                    <BadgedIcon
                      name={'basket'}
                      size={23}
                      style={{
                        color: this.AnimatedHeaderValue.interpolate({
                          inputRange: [
                            0,
                            Header_Maximum_Height - Header_Minimum_Height,
                          ],
                          outputRange: ['white', 'red'],
                          extrapolate: 'clamp',
                        }),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              }
              rightContainerStyle={{
                right: 5,
              }}
              backgroundColor={this.AnimatedHeaderValue.interpolate({
                inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
                outputRange: ['transparent', 'white'],
                extrapolate: 'clamp',
              })}
              containerStyle={{
                //backgroundColor: 'light',
                padding: 0,
                //backgroundColor: 'transparent',
                //backgroundColor: this.state.color,
                //marginTop:10,
                //position: 'absolute',
                width: Dimensions.get('window').width,
                //backgroundColor: 'transparent',
                //backgroundColor: HeaderColor
                borderBottomColor: 'transparent',
              }}
            />
          </View>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: 0}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.AnimatedHeaderValue}}}],
            {
              listener: (event) => {
                this.changeStatusBar(event);
              },
            },
          )}
          //onScroll={this.changeStatusBar}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.state.isLoading ? (
            <ShimmerPlaceHolder
              autoRun={true}
              //visible={!this.state.isLoading}
              visible={!this.state.isLoading}
              width={Dimensions.get('window').width}
              height={230}
              style={{zindex: 1}}
            />
          ) : (
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
                backgroundColor: 'rgba(128, 128, 128, 0.92)',
              }}
              ImageComponentStyle={{
                marginTop: 0,
                //position:'absolute',
                zIndex: 0,
                height: 230,
              }}
            />
          )}
          <View style={styles.Card}>
            {this.state.isLoading ? (
              <ShimmerPlaceHolder
                autoRun={true}
                visible={!this.state.isLoading}
                height={20}
                width={100}
                style={styles.Deskripsi}
              />
            ) : (
              <Text style={styles.Deskripsi}>Semua Produk</Text>
            )}
            {this.state.isLoading ? (
              <FlatList
                data={this.state.images}
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
            ) : (
              <FlatList
                data={this.state.dataSource}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
                numColumns={2}
                contentContainerStyle={{margin: 5, marginTop: 0}}
                keyExtractor={(item, index) => index}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReachedThreshold={0.4}
                onEndReached={this.handleLoadMore.bind(this)}
              />
            )}
          </View>
        </ScrollView>
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
