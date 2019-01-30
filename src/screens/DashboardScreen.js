import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

export default class DashboardScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'About',
  }

  render() {
    return (
      <SafeAreaView style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
})
