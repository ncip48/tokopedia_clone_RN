//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
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
  backgroundColor: "yellow",
  backgroundGradientFrom: "yellow",
  backgroundGradientTo: "yellow",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `black`,
  labelColor: (opacity = 1) => `black`,
  style: {
      borderRadius: 16,
  }
}

class App extends Component {
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
    return fetch('https://nusaserver.com/pasar/pemasukan/laba')
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson.laba);
      const dataClone = {...self.state.data}
      const values = responseJson.laba.map(value => value.laba);
      const label = responseJson.laba.map(value => value.tanggal);
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
          <View style={styles.sectionContainer}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>
                Grafik Laba
                </Text>
            </View>
              <LineChart
                data={this.state.data}
                width={Dimensions.get("window").width - 50}
                height={220}
                chartConfig={chartConfig}
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            
          </View>
        );
      }
  }
  
  const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
  });
  
  export default App;