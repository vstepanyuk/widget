
module.exports = (config) => {

  config.output = {
    ...config.output,
    library: 'Subscription',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'static/[name].js',
  }

  config.optimization.splitChunks = false
  config.optimization.runtimeChunk = false

  config.plugins[0].options.inject = 'head'
  config.plugins[5].options.filename = 'static/[name].css'
  config.plugins[5].options.moduleFilename = () => 'static/standard.css'

  return config
}