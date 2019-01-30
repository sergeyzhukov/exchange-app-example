module.exports = {
  'extends': [
    'plugin:flowtype/recommended',
    'airbnb'
  ],
  'plugins': [
    'flowtype'
  ],
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
  },
  'globals': {
    "fetch": false
  }
}