module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: ['plugin:vue/recommended', 'plugin:jest/recommended', 'standard' ],
  plugins: [
    'jest',
    'vue'
  ],
  rules: {
    // Allow paren-less arrow functions
    'arrow-parens': 0,
    // Allow async-await
    'generator-star-spacing': 0,
    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // Do not allow console.logs etc...
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    "rules": {
      "indent": ["error", 2]
    },
    'vue/max-attributes-per-line': [2, {
      'singleline': 4,
      'multiline': {
        'max': 4,
        'allowFirstLine': true
      }
    }],
    'vue/order-in-components': 0,
    'vue/attributes-order': 0,
    'vue/require-default-prop': 0
  },
  overrides: [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off",
        "vue/script-indent": ["error", 2, { "baseIndent": 1 }]
      }
    }
  ],
  globals: {
    'jest/globals': true,
    jasmine: true
  }
}
