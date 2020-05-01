//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used
import LinePemasukan from './chart/line_pemasukan';
import LinePengeluaran from './chart/line_pengeluaran';
import LineLaba from './chart/line_laba';
import LinePersenLaba from './chart/line_persenlaba';

export default class SettingsScreen extends React.Component {
  //Setting Screen to show in Setting Option
  render() {
    return (
      <ScrollView
            contentInsetAdjustmentBehavior="automatic">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinePemasukan/>
        <LinePengeluaran/>
        <LineLaba/>
        <LinePersenLaba/>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});