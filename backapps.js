import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './pages/HomeScreen';
import Kategori from './pages/Kategori';
import Data from './pages/DataScreen';
import Produk from './pages/Produk';
import Setting from './pages/SettingsScreen';
import Profile from './pages/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Produk') {
              iconName = focused ? 'ios-pricetag' : 'ios-pricetag';
            } else if (route.name === 'Kategori') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'ios-cart' : 'ios-cart';
            } else if (route.name === 'Akun') {
              iconName = focused ? 'md-person' : 'md-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Produk" component={Produk} />
        <Tab.Screen name="Kategori" component={Kategori} />
        <Tab.Screen name="Cart" component={Data} />
        <Tab.Screen name="Akun" component={Setting} />
      </Tab.Navigator>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}b