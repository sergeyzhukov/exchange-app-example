
import React from 'react'
import { Button } from 'react-native'
import Colors from '../../utils/colors'

export default ({ onPress }) => (
  <Button
    onPress={onPress}
    title="Cancel"
    color={Colors.BRAND}
  />
)
