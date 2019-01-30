import React, { PureComponent } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'

export default class ActionButton extends PureComponent {
  render() {
    const { title, onPress } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'grey',
  },
  title: {
    marginTop: 12,
    color: '#efefef',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: -0.2,
    textAlign: 'center',
  },
})
