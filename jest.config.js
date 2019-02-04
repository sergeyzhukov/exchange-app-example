const doNotIgnoreThesePackages = [
  'react-native',
].join('|')

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    `node_modules/(?!(${doNotIgnoreThesePackages})/)`,
  ],
  testRegex: '(src|scripts)/.*/.*.test.js$',
  setupFiles: [
    './setupJest.js',
  ],
  collectCoverageFrom: [
    'src/actions/**/*.{js,jsx}',
    'src/components/**/*.{js,jsx}',
    'src/reducers/**/*.{js,jsx}',
    'src/utils/**/*.{js,jsx}',
  ],
}
