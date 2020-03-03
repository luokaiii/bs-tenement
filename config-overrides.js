/* eslint-disable no-unused-vars */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  useEslintRc,
  addWebpackAlias
} = require('customize-cra')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = override(
  addDecoratorsLegacy(),
  useEslintRc(),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom'
  }),
  addLessLoader({
    modifyVars: {
      '@primary-color': 'rgb(238, 80, 80)'
    },
    javascriptEnabled: true
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
  }
)
