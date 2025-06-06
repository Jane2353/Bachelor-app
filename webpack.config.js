const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add alias for react-native-svg
  config.resolve.alias['react-native-svg'] = 'react-native-svg-web';

  return config;
};