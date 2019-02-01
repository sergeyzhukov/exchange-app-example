import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { formatCurrency } from '../../utils/formatters'

export default class DashboardListItem extends PureComponent {
  render() {
    const { code, balance, nativeSymbol, name, onPress } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
        <Text style={styles.amount}>{formatCurrency(balance)} {nativeSymbol}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#efefef',
  },
  textContainer: {
    flex: 1,
  },
  code: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    color: '#747474',
  },
  amount: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
})
