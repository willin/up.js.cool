module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // parser: 'babel-eslint',
  rules: {
    quotes: [2, 'single'],
    semi: 2,
    'max-len': [1, 150, 2],
    'arrow-body-style': [1, 'as-needed'],
    'comma-dangle': [2, 'never'],
    'object-curly-spacing': 0,
    'no-console': 1,
    'no-confusing-arrow': 0,
    'no-param-reassign': [1, { props: false }],
    'no-underscore-dangle': [2, { allowAfterThis: true, allowAfterSuper: false }],
    'consistent-return': 1,
    "no-mixed-operators": [2,{
      "groups": [["&", "|", "^", "~", "<<", ">>", ">>>"], ["&&", "||"]],
      "allowSamePrecedence": true
    }],
    'import/no-dynamic-require': 0,
    'import/extensions': [2, 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'import/no-extraneous-dependencies': 0
  },
  extends: 'airbnb'
};