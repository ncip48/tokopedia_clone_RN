//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
//import all the basic component we have used
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const chartConfig= {
  backgroundColor: "red",
  backgroundGradientFrom: "red",
  backgroundGradientTo: "red",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `white`,
  labelColor: (opacity = 1) => `white`,
  style: {
      borderRadius: 16
  }
}

export default class GrafikScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isLoading: true,
       data: {
        labels: [],
        datasets: [
            {
                data: [],
            }
        ]
      }
    }
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = () => {
    const self = this;
    return fetch('https://nusaserver.com/pasar/pemasukan')
    .then((response) => response.json())
    .then((responseJson) => {
      const dataClone = {...self.state.data}
      const values = responseJson.map(value => value.jumlah);
      const label = responseJson.map(value => value.tanggal);
      dataClone.datasets[0].data = values;
      dataClone.labels= label;
        this.setState({
          isLoading: false,
          data: dataClone,
        });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  //Home Screen to show in Home Option
  render() {
    //data.datasets[0].data = this.state.dataSource.map(value => value.jumlah);
    //console.warn(data);
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>
              Grafik Pemasukan
            </Text>
          </View>
          <LineChart
            data={this.state.data}
            width={Dimensions.get("window").width - 50}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

<FlatList
        data={listData}
        renderItem={({ item }) => <Item title={item.tanggal} />}
        keyExtractor={item => item.tanggal}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />