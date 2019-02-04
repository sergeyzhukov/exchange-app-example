import React from 'react'
import renderer from 'react-test-renderer'
import ActionButton from './ActionButton'

jest.mock('react-native-vector-icons/Entypo', () => 'Icon')

test('renders correctly', () => {
  const tree = renderer.create(<ActionButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
