import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import CustomIcon from './components/CustomIcon.js';

import Home from './pages/HomeScreen';
import Kategori from './pages/Kategori/Kategori';
import KategoriProduk from './pages/Kategori/KategoriProduk';
import Data from './pages/DataScreen';
import Akun from './pages/Users/AccountScreen';
import ProdukDetail from './pages/Produk/ProdukDetail';
import Auth from './pages/Auth';
import Cart from './pages/Cart/Cart';
import Berita from './pages/Berita';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getActiveRouteName = (state) => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route;
};

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          /*if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Produk') {
              iconName = focused ? 'ios-pricetag' : 'ios-pricetag';
            } else if (route.name === 'Kategori') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'ios-cart' : 'ios-cart';
            } else if (route.name === 'Akun') {
              iconName = focused ? 'md-person' : 'md-person';
            }*/
          if (route.name === 'Home') {
            iconName = focused ? 'home-fill' : 'home';
          } else if (route.name === 'Berita') {
            iconName = focused ? 'grid-fill' : 'grid';
          } else if (route.name === 'Kategori') {
            iconName = focused ? 'tag-fill' : 'tag';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'basket-fill' : 'basket';
          } else if (route.name === 'Akun') {
            iconName = focused ? 'user-fill' : 'user';
          }
          // You can return any component that you like here!
          //return <Ionicons name={iconName} size={size} color={color} />;
          return <CustomIcon name={iconName} size={20} color={color} />;
        },
      })}
      tabBarOptions={{
        //showLabel: false,
        activeTintColor: 'red',
        inactiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{bgcolor: 'transparent', bar: 'light-content'}}
      />
      <Tab.Screen
        name="Berita"
        component={Berita}
        initialParams={{bgcolor: 'red', bar: 'light-content'}}
      />
      <Tab.Screen
        name="Kategori"
        component={Kategori}
        initialParams={{bgcolor: 'red', bar: 'light-content'}}
      />
      {/*<Tab.Screen
        name="Cart"
        component={Data}
        initialParams={{bgcolor: 'white', bar: 'dark-content'}}
      />*/}
      <Tab.Screen
        name="Akun"
        component={Auth}
        initialParams={{bgcolor: 'white', bar: 'dark-content'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);
  console.disableYellowBox = true;
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          const statusTheme = currentRouteName.params.bar;
          const bgColor = currentRouteName.params.bgcolor;
          StatusBar.setBarStyle(statusTheme);
          StatusBar.setBackgroundColor(bgColor);
          //console.log(bgColor);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={MainTabNavigator} />
        <Stack.Screen
          name="Produk Detail"
          component={ProdukDetail}
          initialParams={{bgcolor: 'transparent', bar: 'light-content'}}
        />
        <Stack.Screen
          name="Kategori Produk"
          component={KategoriProduk}
          initialParams={{bgcolor: 'white', bar: 'dark-content'}}
        />
        <Stack.Screen
          name="Account Page"
          component={Akun}
          initialParams={{bgcolor: 'white', bar: 'dark-content'}}
        />
        <Stack.Screen
          name="Cart Page"
          component={Cart}
          initialParams={{bgcolor: 'white', bar: 'dark-content'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
