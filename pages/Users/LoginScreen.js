import React, { Component } from 'react';

import { StyleSheet, Text, View, Platform, ScrollView, AsyncStorage,} from 'react-native';
import { Header, Button, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import config from '../Setting/config';

function currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default class LoginScreen extends React.Component {
  
  constructor(props)
  {

    super(props);
    this.state = {
    username: '',
      password: '',
      loadingbtn: false
  }

  }

  /*componentDidMount() {
    this.GetData(5);
       
     } */

     AksiLogin = () =>{
        //const { username }  = this.state ;
        //const { password }  = this.state ;
        this.setState({loadingbtn: true});
        setTimeout(()=>{
        fetch(config.baseurl + 'api/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    username: this.state.username,
 
    password: this.state.password
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
        //console.log(responseJson.result)
       if(responseJson.result == '1')
        {

            //Then open Profile activity and send user email to profile activity.
            //this.props.navigation.navigate('Second', { Email: UserEmail });
            //console.log(responseJson.data[0].id_konsumen)
            let id_konsumen = responseJson.data[0].id_konsumen;
            let username = responseJson.data[0].username;
            let dataUser = {
                    id_konsumen: id_konsumen,
                    username: username
                }
            AsyncStorage.setItem('user', JSON.stringify(dataUser));
            this.setState({
              id_konsumen: responseJson.data[0].id_konsumen,
                loadingbtn: false,
                message: responseJson.message
            })
            this.props.navigation.navigate('Account')

        }
        else{
            this.setState({
                loadingbtn: false,
                message: responseJson.message
            })
          //console.log(responseJson);
        }

      }).catch((error) => {
        console.error(error);
      });
    },1500);
     }

     componentWillUnmount() {
      //this.props.navigation.state.params.cekUser()
    }


  render() {
    const { navigation } = this.props;
    return (
<View style={styles.MainContainer}>
<Header
        statusBarProps={{ barStyle: 'dark-content', translucent: true, backgroundColor: 'white' }}
        barStyle="light-content" // or directly
        leftComponent={<Button type="clear" icon={<Ionicons name={"ios-arrow-back"} color={"#fc4426"} size={25} />} onPress={() => navigation.goBack()}/>}
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
        centerComponent={<Text style={{fontSize: 18}}>User Login</Text>}
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
      {this.state.loadingbtn ? 
       <ProgressBar styleAttr="Horizontal" color="tomato" style={{marginTop:-5}} />
       : null
      }


<ScrollView contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}>
 <Input
   
   // Adding hint in Text Input using Place holder.
   placeholder="masukkan username/email"
   leftIcon={<Ionicons name={"ios-at"} color={"#999999"} size={25} />}
   onChangeText={value => this.setState({ username: value })}

   // Making the Under line Transparent.
   //underlineColorAndroid='transparent'

   style={styles.TextInputStyleClass}
 />

 <Input
   
   // Adding hint in Text Input using Place holder.
   placeholder=" masukkan password"
      leftIcon={<Ionicons name={"ios-lock"} color={"#999999"} size={25} />}
   onChangeText={value => this.setState({ password: value })}

   // Making the Under line Transparent.
   //underlineColorAndroid='transparent'

   style={styles.TextInputStyleClass}

   secureTextEntry={true}
 />
<View style={{flexDirection:"row",alignItems: "center",}} >

 <Button 
buttonStyle={{backgroundColor:"tomato", margin:10, width:'80%'}} 
titleStyle={{fontSize:14}}
 title="Login" 
 onPress={this.AksiLogin} color="#2196F3"
    disabled={this.state.loadingbtn}

    />

 <Text style={{fontStyle:"italic", color:'blue'}}>tidak ada akun?daftar?</Text>

    </View>
<Text style={{textAlign: 'center', // <-- the magic
    fontSize: 16, margin:10,
    color: 'red',}}>{this.state.message}</Text>
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

