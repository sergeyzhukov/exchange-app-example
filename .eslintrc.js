module.exports = {
  extends: ["airbnb"],
  parser: "babel-eslint",
  env: {
    jest: true
  },
  rules: {
    "no-use-before-define": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "react/prefer-stateless-function": "off",
    "object-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "never"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never"
      }
    ]
  },
  globals: {
    fetch: false
  }
};
