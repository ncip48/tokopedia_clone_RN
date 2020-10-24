import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Platform,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import config from '../Setting/config';

export default class Kategori extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      dataSkeleton: ['1', '2', '3', '4', '5', '6', '7', '8'],
    };
  }

  componentDidMount() {
    this.GetData(this.page); //Method for API call
  }

  GetData() {
    return fetch(config.baseurl + 'api/kategori', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            showloadingsearch: false,
            refreshing: false,
            isLoading: false,
            dataSource: responseJson.data,
            //dataSkeleton: responseJson.data
          },
          function () {},
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  _onRefresh = () => {
    this.setState({refreshing: true, isLoading: true});
    this.GetData();
  };

  render() {
    return (
      <View>
        <Header
          statusBarProps={{translucent: true}}
          centerComponent={{
            text: 'Kategori',
            style: {color: 'white', fontSize: 20},
          }}
          containerStyle={{
            backgroundColor: 'red',
            justifyContent: 'space-around',
          }}
        />
        <View>
          {this.state.isLoading ? (
            <FlatList
              data={this.state.dataSkeleton}
              renderItem={() => (
                <ShimmerPlaceHolder
                  autoRun={true}
                  //visible={!this.state.isLoading}
                  visible={false}
                  width={Dimensions.get('window').width - 20}
                  height={50}
                  style={{
                    padding: 5,
                    marginLeft: 10,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
              )}
            />
          ) : (
            <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => (
                <Text
                  style={styles.FlatListItemStyle}
                  onPress={() =>
                    this.props.navigation.navigate('Kategori Produk', {
                      item: item,
                    })
                  }>
                  {item.nama_kategori}
                </Text>
              )}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
