module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: ['plugin:vue/essential', 'plugin:jest/recommended', '@vue/standard'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'rules': {
      'indent': ['error', 2]
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
      'files': ['*.vue'],
      'rules': {
        'indent': 'off',
        'vue/script-indent': ['error', 2, {'baseIndent': 1}]
      }
    }
  ],
  globals: {
    'jest/globals': true,
    jasmine: true
  }
}
