import React, { PureComponent } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

export default class ActionButton extends PureComponent {
  render() {
    const { title, onPress, iconName } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name={iconName} size={24} color="white" />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
