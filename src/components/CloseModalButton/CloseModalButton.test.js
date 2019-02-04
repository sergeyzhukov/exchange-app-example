import React from 'react'
import renderer from 'react-test-renderer'
import CloseModalButton from './CloseModalButton'

test('renders correctly', () => {
  const component = <CloseModalButton onPress={() => {}} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})
