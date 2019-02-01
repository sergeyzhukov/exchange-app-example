import React from 'react'
import { StyleSheet, View } from 'react-native'

export default () => (
  <View style={styles.separator} />
)

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#C8C7CC',
    height: StyleSheet.hairlineWidth,
    marginLeft: 16,
  },
})
