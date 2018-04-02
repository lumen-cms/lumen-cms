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
    'no-console': 2,
    "rules": {
      "indent": ["error", 2]
    }
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
