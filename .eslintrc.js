module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    // parser: 'babel-eslint',
   sourceType: 'module',
    // allowImportExportEverywhere: true //ignore eslint error: 'import' and 'export' may only appear at the top level
    allowImportExportEverywhere: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
    // 'global-require': 'off'
  }
}
