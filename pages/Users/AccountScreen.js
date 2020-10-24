import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {Header, Button, Input, ListItem} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import config from '../Setting/config';

export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      dataUser: '',
    };
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result);
        this.cekUser(resultParsed.id_konsumen);
        this.setState({
          id_konsumen: resultParsed.id_konsumen,
          isLogin: true,
        });
        //console.log(resultParsed);
      }
    });
  }

  componentDidMount() {
    this.cekUser(this.state.id_konsumen);
  }

  cekUser = (id) => {
    //const { username }  = this.state ;
    //const { password }  = this.state ;
    //this.setState({loadingbtn: true});

    fetch(config.baseurl + 'api/cekuser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_konsumen: id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
        //console.log(responseJson.result)
        if (responseJson.result == '1') {
          //Then open Profile activity and send user email to profile activity.
          //this.props.navigation.navigate('Second', { Email: UserEmail });
          //console.log(responseJson.data[0])
          this.setState({
            dataUser: responseJson.data[0],
            //loadingbtn: false,
            //message: responseJson.message
          });
        } else {
          this.setState({
            //loadingbtn: false,
            //message: responseJson.message
          });
          //console.log(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  Logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      this.props.navigation.navigate('Default');
    } catch (error) {
      // Error removing
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            translucent: true,
            backgroundColor: 'white',
          }}
          barStyle="light-content" // or directly
          //leftComponent={<Button type="clear" icon={<Ionicons name={"ios-arrow-back"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>}
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
            fontSize: 14
          }}
          //placeholderTextColor={'#000'}
        />
        }*/
          centerComponent={<Text style={{fontSize: 18}}>Akun Saya</Text>}
          /*rightComponent={
          <View style={{flexDirection:"row"}}>
          <Button type="clear" icon={<Ionicons name={"md-share"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>
          <Button type="clear" icon={<Ionicons name={"ios-cart"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>
  
          </View>
        }*/
          rightComponent={
            <Button
              type="clear"
              icon={<Ionicons name={'ios-log-out'} color={'black'} size={25} />}
              onPress={() => this.Logout()}>
              Logout
            </Button>
          }
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            padding: 0,
            margin: 0,
          }}
        />
        {/*this.state.loadingbtn ? 
         <ProgressBar styleAttr="Horizontal" color="tomato" style={{marginTop:-5}} />
         : null*/}

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View>
            <ListItem
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: {x: 1, y: 0},
                end: {x: 0.2, y: 0},
              }}
              ViewComponent={LinearGradient} // Only if no expo
              leftAvatar={{
                rounded: true,
                source: {
                  uri:
                    config.baseurl + 'asset/foto_user/' +
                    this.state.dataUser.foto,
                },
              }}
              title={this.state.dataUser.username}
              titleStyle={{color: 'white', fontWeight: 'bold'}}
              subtitleStyle={{color: 'white'}}
              subtitle={this.state.dataUser.email}
              chevron={{color: 'white'}}
              containerStyle={{margin: 10}}
            />
          </View>
        </ScrollView>
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

  TextInputStyleClass: {
    textAlign: 'center',
    marginBottom: 7,
    //height: 40,
    //borderWidth: 1,
    // Set border Hex Color Code Here.
    //borderColor: '#2196F3',

    // Set border Radius.
    //borderRadius: 5 ,
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
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },

  btnLogin: {
    width: '50%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
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
