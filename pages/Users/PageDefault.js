import React, { Component } from 'react';

import { StyleSheet, Text, View, Platform, ScrollView, YellowBox} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, Button, Input, ListItem  } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo


export default class PageDefault extends React.Component {
  
    constructor(props)
    {
  
      super(props);
      this.state = {
        isLogin: null,
        dataUser: '',
      }
      /*AsyncStorage.getItem('user', (error, result) => {
        if (result != null) {
           this.setState({
             isLogin: true
         });
        }
      }); */
  
    }
  
    /*componentDidMount() {
        //this.cekUser(this.state.id_konsumen);
           console.log(this.state.isLogin)
         } */
  componentDidMount = async () => {
      const value = await AsyncStorage.getItem('user');
      {value !== null 
      ?
        this.setState({
          isLogin: true,
        })
      :
        this.setState({
          isLogin: false,
        })
      }
      {this.state.isLogin 
        ? 
        this.props.navigation.navigate('Account')
        : null 
      }
    }

    render() {

      return (
  <View style={styles.MainContainer}>
  <Header
          statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'white' }}
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
          centerComponent={<Text style={{fontSize: 18}}>Login / Register</Text>}
        /*rightComponent={
          <View style={{flexDirection:"row"}}>
          <Button type="clear" icon={<Ionicons name={"md-share"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>
          <Button type="clear" icon={<Ionicons name={"ios-cart"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>
  
          </View>
        }*/
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'space-around',
            padding: 0,
            margin:0
          }}
        />
        {/*this.state.loadingbtn ? 
         <ProgressBar styleAttr="Horizontal" color="tomato" style={{marginTop:-5}} />
         : null*/
        }
  
  
  <ScrollView contentContainerStyle={{flexGrow : 1, }}>
  <View>
  <ListItem
  Component={TouchableScale}
  onPress={() => this.props.navigation.navigate('Login Page', {cekUser: () => this.cekUser(this.state.id_konsumen)})}
  friction={90} //
  tension={100} // These props are passed to the parent component (here TouchableScale)
  activeScale={0.95} //
  linearGradientProps={{
    colors: ['#FF9800', '#F44336'],
    start: { x: 1, y: 0 },
    end: { x: 0.2, y: 0 },
  }}
  ViewComponent={LinearGradient} // Only if no expo
  leftAvatar={{ rounded: true}}
  title="login"
  titleStyle={{ color: 'white', fontWeight: 'bold' }}
  subtitleStyle={{ color: 'white' }}
  subtitle="login ke akun anda"
  chevron={{ color: 'white' }}
  containerStyle={{margin:10}}
/>
  </View>

  </ScrollView>
  </View>
              
      );
    }
  }

  const styles = StyleSheet.create({

    MainContainer :{

    justifyContent: 'center',
    flex:1,
    backgroundColor: '#fff',
    //margin: 10,
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0,

    },

    Row: {
      //flex:1,
      margin: 10,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
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

   btnLogin:{
    width: '50%',
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
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