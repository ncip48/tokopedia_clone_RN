import React, { Component } from 'react';

import { AsyncStorage,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AccountScreen from './Users/AccountScreen';
import Default from './Users/PageDefault';
import Login from './Users/LoginScreen';
const Stack = createStackNavigator();

export default class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: null,
    }
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
         this.setState({
          isLogin: true
        });
      }
    });
  }
  render() {
    return (
      <SafeAreaProvider>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Default" component={Default} initialParams={{bgcolor:'white' , bar:'dark-content'}}/>
          <Stack.Screen name="Account" component={AccountScreen} initialParams={{bgcolor:'white' , bar:'dark-content'}}/>
          <Stack.Screen name="Login Page" component={Login} initialParams={{bgcolor:'white' , bar:'dark-content'}}/>
        </Stack.Navigator>
      </SafeAreaProvider>
    );
  }
}