import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4072B8',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
})
