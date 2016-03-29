const {
  BATCH_API_KEY,
} = require('../config/push.json');
const React = require('react-native');

export const registerPushIOS = function() {
  React.NativeModules.ChronBatchWrapper.initialize(BATCH_API_KEY);
};
