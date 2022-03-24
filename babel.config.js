module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        allowlist: ['API_KEY_YELP', 'API_KEY_FIREBASE'],
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
