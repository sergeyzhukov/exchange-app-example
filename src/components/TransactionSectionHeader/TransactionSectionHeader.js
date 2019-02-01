import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: 24,
    justifyContent: 'center',
    backgroundColor: '#F0F1F2',
    paddingHorizontal: 16,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 12,
    color: '#343434',
  },
})
