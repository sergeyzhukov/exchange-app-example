import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../../utils/colors'

export default ({ title, onPress, style, disabled = false }) => (
  <TouchableOpacity
    style={[styles.container, style, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BRAND,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.3,
  },
})
