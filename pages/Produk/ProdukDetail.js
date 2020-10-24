import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  StatusBar,
} from 'react-native';
import HTML from 'react-native-render-html';
import {
  Header,
  Button,
  SearchBar,
  Card,
  withBadge,
  Icon,
  Badge,
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../components/CustomIcon.js';
//#fc4426
import config from '../Setting/config';

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

const Header_Maximum_Height = 400;
const Header_Minimum_Height = 50;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);
const AnimatedIcon = Animated.createAnimatedComponent(CustomIcon);
const BadgedIcon = withBadge(3, {left: 5, top: -2})(AnimatedIcon);
export default class ProdukDetails extends Component {
  constructor(props) {
    super(props);
    this.AnimatedStatusBarValue = new Animated.Value(0);
    this.scroll = new Animated.Value(0);
    this.AnimatedHeaderValue = new Animated.Value(0);
    this.AnimatedSearchBarValue = new Animated.Value(0);
    this.state = {
      dark: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.related_page();
  }

  related_page() {
    return fetch(
      config.baseurl + `api/kategori?id=${this.props.route.params.item.id_kategori_produk}&page=5`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        this.setState(
          {
            isLoading: false,
            related: responseJson.data,
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
    //const BadgedIcon = withBadge(3, {left: 5, top: -2})(CustomIcon);
    const {navigation} = this.props;
    const {dark} = this.state;
    const item = this.props.route.params.item;
    return (
      <View style={styles.container}>
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
              leftComponent={
                <AnimatedTouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    backgroundColor: this.AnimatedHeaderValue.interpolate({
                      inputRange: [
                        0,
                        Header_Maximum_Height - Header_Minimum_Height,
                      ],
                      outputRange: ['grey', 'transparent'],
                      extrapolate: 'clamp',
                    }),
                    //padding:10,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    //flex: 1,
                    alignItems: 'center',
                    borderRadius:
                      Math.round(
                        Dimensions.get('window').width +
                          Dimensions.get('window').height,
                      ) / 2,
                  }}>
                  <AnimatedIcon
                    name={'arrow-left'}
                    //color={'white'}
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
                    size={20}
                  />
                </AnimatedTouchableOpacity>
              }
              centerComponent={
                <AnimatedText
                  style={{
                    color: this.AnimatedHeaderValue.interpolate({
                      inputRange: [
                        0,
                        Header_Maximum_Height - Header_Minimum_Height,
                      ],
                      outputRange: ['transparent', 'black'],
                      extrapolate: 'clamp',
                    }),

                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {item.nama_produk}
                </AnimatedText>
              }
              /*centerComponent={
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
                fontSize: 14,
              }}
            />
          }*/
              rightComponent={
                <View style={{flexDirection: 'row'}}>
                  <AnimatedTouchableOpacity
                    //onPress={() => navigation.goBack()}
                    style={{
                      backgroundColor: this.AnimatedHeaderValue.interpolate({
                        inputRange: [
                          0,
                          Header_Maximum_Height - Header_Minimum_Height,
                        ],
                        outputRange: ['grey', 'transparent'],
                        extrapolate: 'clamp',
                      }),
                      marginLeft: 5,
                      marginRight: 5,
                      //padding:10,
                      height: 30,
                      width: 30,
                      justifyContent: 'center',
                      //flex: 1,
                      alignItems: 'center',
                      borderRadius:
                        Math.round(
                          Dimensions.get('window').width +
                            Dimensions.get('window').height,
                        ) / 2,
                    }}>
                    <AnimatedIcon
                      name={'share'}
                      //color={'white'}

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
                      size={20}
                    />
                  </AnimatedTouchableOpacity>

                  <AnimatedTouchableOpacity
                    onPress={() => this.props.navigation.navigate('Cart Page')}
                    style={{
                      backgroundColor: this.AnimatedHeaderValue.interpolate({
                        inputRange: [
                          0,
                          Header_Maximum_Height - Header_Minimum_Height,
                        ],
                        outputRange: ['grey', 'transparent'],
                        extrapolate: 'clamp',
                      }),
                      marginLeft: 5,
                      marginRight: 5,
                      //padding:10,
                      height: 30,
                      width: 30,
                      justifyContent: 'center',
                      //flex: 1,
                      alignItems: 'center',
                      borderRadius:
                        Math.round(
                          Dimensions.get('window').width +
                            Dimensions.get('window').height,
                        ) / 2,
                    }}>
                    <AnimatedIcon
                      name={'basket'}
                      //color={'white'}
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
                      size={20}
                    />
                  </AnimatedTouchableOpacity>
                </View>
              }
              rightContainerStyle={
                {
                  //right: 5,
                  //marginLeft:5,
                  //marginRight:5,
                }
              }
              backgroundColor={this.AnimatedHeaderValue.interpolate({
                inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
                outputRange: ['transparent', 'white'],
                extrapolate: 'clamp',
              })}
              containerStyle={{
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
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.AnimatedHeaderValue}}}],
            {
              listener: (event) => {
                this.changeStatusBar(event);
              },
            },
          )}>
          <View style={styles.Card}>
            <Image
              resizeMode="contain"
              style={styles.ImageComponentStyle}
              source={{
                uri:
                  config.baseurl + 'asset/foto_produk/' +
                  item.gambar,
              }}
            />
            <Text style={styles.NamaProduk}>{item.nama_produk}</Text>
            <Text style={styles.HargaProduk}>
              {currencyFormat(parseInt(item.harga_konsumen))}
            </Text>
          </View>
          <View style={styles.Card}>
            <Text style={styles.Deskripsi}>Informasi Produk</Text>
            <Text style={styles.ContainerDeskripsi}>
              Berat : {item.berat} gram
            </Text>
            <Text style={styles.ContainerDeskripsi}>
              Satuan : {item.satuan}
            </Text>
            <Text style={styles.ContainerDeskripsi}>
              Kategori : {item.id_kategori_produk}
            </Text>
          </View>
          <View style={styles.Card}>
            <Text style={styles.Deskripsi}>Deskripsi Produk</Text>
            <View>
              {item.keterangan.length > 500 ? (
                <HTML
                  html={item.keterangan.substring(0, 500) + '....'}
                  containerStyle={styles.RenderDeskripsi}
                  classesStyle={{color: '#4c4c4c'}}
                />
              ) : (
                <HTML
                  html={item.keterangan}
                  containerStyle={styles.RenderDeskripsi}
                  classesStyle={{color: '#4c4c4c'}}
                />
              )}
            </View>
          </View>
          <View style={styles.Card}>
            <Text style={styles.Deskripsi}>Ulasan Produk</Text>
          </View>
          <View style={styles.Card}>
            <Text style={styles.Deskripsi}>Produk Terkait</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.related}
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
                    style={styles.ImageComponentStyles}
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
                    {item.nama_produk}
                  </Text>
                  <Text style={styles.Harga}>
                    {currencyFormat(parseInt(item.harga_konsumen))}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{margin: 5, marginTop: 0}}
            />
          </View>
        </ScrollView>
        <View style={styles.Footer}>
          <View style={styles.button_chat}>
            <Button
              icon={
                <Ionicons
                  name={'ios-heart'}
                  color={'red'}
                  size={18}
                  onPress={() => navigation.goBack()}
                />
              }
              type="outline"
              onPress={() => navigation.goBack()}
              titleStyle={{fontSize: 12}}
            />
          </View>
          <View style={styles.button_beli}>
            <Button
              type="outline"
              title="Beli"
              onPress={() => navigation.goBack()}
              titleStyle={{fontSize: 12, color: 'red'}}
            />
          </View>
          <View style={styles.button_cart}>
            <Button
              buttonStyle={{backgroundColor: 'red'}}
              title="Tambah ke keranjang"
              onPress={() => navigation.goBack()}
              titleStyle={{fontSize: 12}}
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
  ContainerDeskripsi: {
    marginTop: 0,
    margin: 15,
    marginBottom: 10,
    fontSize: 13,
    color: '#4c4c4c',
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
  Juduls: {
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
    //flex: 1,
    alignItems: 'center',
    //height: Dimensions.get('window').height - 500,
    //width: Dimensions.get('window').width,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 0,
    borderWidth: 1,
    zIndex: 0,
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button_chat: {
    width: '10%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  button_beli: {
    width: '30%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  button_cart: {
    width: '50%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
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
  ImageComponentStyles: {
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
