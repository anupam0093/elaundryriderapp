const createExpoWebpackConfig = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfig(env, argv);
  config.devServer.port = 12002;
  return config;
};
