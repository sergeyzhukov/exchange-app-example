import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class DashboardListItem extends PureComponent {
  render() {
    const { base, amount, onPress } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{base}</Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 64,
    marginHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  valuesContainer: {
    alignItems: 'flex-end',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: '#333333',
  },
  amount: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },

  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 10,
    marginLeft: 2,
    color: '#777777',
  },
  indicatorUp: {
    tintColor: 'green',
    transform: [
      { scaleY: -1 },
    ],
  },
  indicatorDown: {
    tintColor: 'red',
  },
  last: {
    fontSize: 15,
    marginBottom: 4,
    color: '#333333',
  },
  high: {
    fontSize: 10,
    color: '#777777',
  },
})
