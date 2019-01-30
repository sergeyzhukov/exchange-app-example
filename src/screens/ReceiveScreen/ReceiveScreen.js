import React, { Component } from 'react'
import {
  View, StyleSheet, StatusBar, Text, TextInput
} from 'react-native'
import BlueActionButton from '../../components/BlueActionButton'

export default class ReceiveScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Transactions',
    title: 'Receive',
  }

  state = {
    amount: undefined,
  }

  handleTabFocus = () => {
    StatusBar.setBarStyle('dark-content')
  }

  handleTextChange = (text) => {
    this.setState({ amount: text })
  }

  handleReceivePress = () => {

  }

  render() {
    const { amount } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          keyboardType="decimal-pad"
          placeholder="Enter amount to receive"
          style={styles.input}
          onChangeText={this.handleTextChange}
          value={amount}
        />
        <BlueActionButton title="Receive" style={styles.receiveButton} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  input: {
    height: 44,
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  receiveButton: {
    marginTop: 48,
  },
})
