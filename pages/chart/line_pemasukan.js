//This is an example code for Bottom Navigation//
import React, {Component} from 'react';
//import react in our code.
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import FlashMessage, { showMessage } from "react-native-flash-message";
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
  backgroundColor: "blue",
  backgroundGradientFrom: "blue",
  backgroundGradientTo: "blue",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `white`,
  labelColor: (opacity = 1) => `white`,

  style: {
      borderRadius: 16,
  }
}

function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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
    return fetch('https://nusaserver.com/pasar/pemasukan')
    .then((response) => response.json())
    .then((responseJson) => {
      const dataClone = {...self.state.data}
      const values = responseJson.map(value => value.jumlah_total);
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

    render() {
        //data.datasets[0].data = this.state.dataSource.map(value => value.jumlah);
        //console.warn(data);
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
            </View>
          )
        }
        return (
          <View>
            <View style={{ alignItems: 'center', marginTop:30 }}>
                <Text style={{ fontSize: 20 }}>
                Grafik Pemasukan
                </Text>
            </View>
              <LineChart
                data={this.state.data}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                fromZero={1}
                yAxisLabel={"Rp "}
                yLabelsOffset={0}
                withOuterLines={true}
                withInnerLines={false}
                withDots={true}
                withShadow={true}
                segments={5}
                bezier
                //withScrollableDot={true}
                yAxisInterval={1} // optional, defaults to 1
                onDataPointClick={({ value, getColor }) =>
                  showMessage({
                    message: "Hasil : " + currencyFormat(parseInt(`${value}`)),
                    backgroundColor: getColor(0.9),
                    type: "info",
                  })
                }
                chartConfig={{
                  backgroundGradientFrom: "#1F1F1F",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => "#FF5500",
                  labelColor: (opacity = 1) => "#A0A0A0",
                  linejoinType: "round",

                  scrollableDotFill: "#fff",
                  scrollableDotRadius: 7,
                  scrollableDotStrokeColor: "#FF5500",
                  scrollableDotStrokeWidth: 3,

                  scrollableInfoViewStyle: {
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "#121212",
                    borderRadius: 2
                  },
                  scrollableInfoTextStyle: {
                    color: "#C4C4C4",
                    marginHorizontal: 4,
                    flex: 1,
                    textAlign: "center"
                  },
                  scrollableInfoSize: { width: 75, height: 40 },
                  scrollableInfoOffset: 15
                }}
                style={{
                  marginVertical: 8
                }}
              />
              <FlashMessage position="top" duration={1000} autoHide={false} />
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