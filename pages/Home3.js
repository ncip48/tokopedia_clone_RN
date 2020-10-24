//This is an example code for React Native Collapsible Toolbar//
import React, {Component} from 'react';
//import react in our code.
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
//import all the components we are going to use.
//import { Header } from 'react-navigation-stack';
//const headerHeight = Header.HEIGHT;
import {
  SearchBar,
  Header,
  Button,
  withBadge,
  Icon,
  Badge,
} from 'react-native-elements';
import CustomIcon from '../components/CustomIcon.js';

const Header_Maximum_Height = 200;
//Max Height of the Header
const Header_Minimum_Height = 50;
const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
const AnimatedHeader = Animated.createAnimatedComponent(Header);
const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
const AnimatedIcon = Animated.createAnimatedComponent(CustomIcon);
const BadgedIcon = withBadge(3, {left: 5, top: -2})(AnimatedIcon);
//Min Height of the Header
export default class Home3 extends Component<{}> {
  constructor() {
    super();
    this.AnimatedStatusBarValue = new Animated.Value(0);
    this.AnimatedHeaderValue = new Animated.Value(0);
    this.AnimatedSearchBarValue = new Animated.Value(0);
  }

  render() {
    const TextColor = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['white', 'red'],
      extrapolate: 'clamp',
    });
    const BarColor = this.AnimatedStatusBarValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['transparent', 'white'],
      extrapolate: 'clamp',
    });
    const HeaderColor = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['transparent', 'white'],
      extrapolate: 'clamp',
    });
    const BarStyle = this.AnimatedStatusBarValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['black', 'white'],
      extrapolate: 'clamp',
    });
    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: [Header_Maximum_Height, Header_Minimum_Height],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.MainContainer}>
        <AnimatedStatusBar
          translucent
          backgroundColor={this.AnimatedHeaderValue.interpolate({
            inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
            outputRange: ['transparent', 'white'],
            extrapolate: 'clamp',
          })}
          //barStyle={BarStyle}
        />
        <AnimatedHeader
          statusBarProps={{translucent: true}}
          //leftComponent={<Button type="clear" icon={<Ionicons name={"ios-arrow-back"} color={"#fc4426"} size={25} onPress={() => navigation.goBack()} />}/>}
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
                color: this.AnimatedSearchBarValue.interpolate({
                  inputRange: [
                    0,
                    Header_Maximum_Height - Header_Minimum_Height,
                  ],
                  outputRange: ['#000', '#e5e5e5'],
                  extrapolate: 'clamp',
                }),
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
            justifyContent: 'space-around',
            padding: 0,
            //backgroundColor: 'transparent',
            //backgroundColor: HeaderColor
            borderBottomColor: 'transparent',
          }}
        />

        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: Header_Maximum_Height}}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.AnimatedHeaderValue}}},
          ])}>
          {/* Put all your Component here inside the ScrollView */}
          <Text style={styles.TextViewStyle}>Text</Text>
          <Text style={styles.TextViewStyle}> Input</Text>
          <Text style={styles.TextViewStyle}>Button</Text>
          <Text style={styles.TextViewStyle}>Card</Text>
          <Text style={styles.TextViewStyle}>CheckBox</Text>
          <Text style={styles.TextViewStyle}>Divider</Text>
          <Text style={styles.TextViewStyle}>Header</Text>
          <Text style={styles.TextViewStyle}>List Item</Text>
          <Text style={styles.TextViewStyle}>Pricing</Text>
          <Text style={styles.TextViewStyle}>Rating</Text>
          <Text style={styles.TextViewStyle}>Search Bar</Text>
          <Text style={styles.TextViewStyle}>Slider</Text>
          <Text style={styles.TextViewStyle}>Tile</Text>
          <Text style={styles.TextViewStyle}>Icon</Text>
          <Text style={styles.TextViewStyle}>Avatar</Text>
        </ScrollView>
        {/*<Animated.View
          style={[
            styles.Header,
            {
              top: StatusBar.currentHeight,
              height: 50,
              backgroundColor: AnimateHeaderBackgroundColor,
              //opacity: headerOpacity
            },
          ]}>
          <Animated.View
            style={(styles.HeaderInsideText, {color: TextColor, opacity: 1})}>
            <AnimatedSearchBar
              placeholder="cari produk..."
              //onChangeText={this.updateSearch}
              //showLoading={this.state.showloadingsearch}
              //value={search}
              round={false}
              lightTheme={true}
              showCancel={true}
              inputContainerStyle={{
                //backgroundColor: '#e5e5e5',
                backgroundColor: this.AnimatedSearchBarValue.interpolate({
                  inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
                  outputRange: ['#e5e5e5', 'white'],
                  extrapolate: 'clamp',
                })
              }}
              containerStyle={{
                backgroundColor: 'transparent',
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
          </Animated.View>
        </Animated.View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    //paddingTop: Platform.OS == 'ios' ? 20 : 0,
    backgroundColor: '#e5e5e5',
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    //top: Platform.OS == 'ios' ? 20 : 0,
  },
  HeaderInsideText: {
    fontSize: 18,
    textAlign: 'center',
    //opacity:1
  },
  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
  },
});
