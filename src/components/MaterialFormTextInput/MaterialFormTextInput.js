import React from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Colors from '../../utils/colors'

export default ({ input, title, meta, ...inputProps }) => {
  const { touched, error } = meta

  return (
    <View>
      {input.value.length > 0 && <Text style={styles.placeholder}>{title}</Text>}
      <TextInput
        {...inputProps}
        style={styles.input}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    color: Colors.BRAND,
    fontWeight: '500',
    fontSize: 13,
  },
  error: {
    fontSize: 13,
    color: 'red',
    marginTop: 4,
  },
  input: {
    paddingBottom: 6,
    paddingTop: 4,
    fontSize: 17,
    borderBottomColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
