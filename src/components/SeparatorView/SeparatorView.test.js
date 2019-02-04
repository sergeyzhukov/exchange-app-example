import React from 'react'
import renderer from 'react-test-renderer'
import SeparatorView from './SeparatorView'

test('renders correctly', () => {
  const component = <SeparatorView onPress={() => {}} />
  const tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()
})
