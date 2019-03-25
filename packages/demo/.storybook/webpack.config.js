module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      rootMode: 'upward'
    }
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
