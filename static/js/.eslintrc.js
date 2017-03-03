module.exports = {
  env: {
    browser: true
  },
  // parser: 'babel-eslint',
  extends: "eslint:recommended",
  rules: {
    quotes: [2, 'single'],
    semi: 2,
    'max-len': [1, 150, 2],
    'comma-dangle': [2, 'never'],
    'object-curly-spacing': 0,
    'no-console': 1,
    'no-param-reassign': [1, { props: false }],
    'no-underscore-dangle': [2, { allowAfterThis: true, allowAfterSuper: false }],
    'consistent-return': 1,
    "no-mixed-operators": [2,{
      "groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]],
      "allowSamePrecedence": true
    }]
  }
};