const {
  PARSE_APP_ID,
  PARSE_REST_KEY,
} = require('../config/push.json');

export const registerPushIOS = function(deviceToken) {
  const url = 'https://api.parse.com/1/installations';
  const data = {
    deviceType: 'ios',
    deviceToken,
    channels: [''],
  };
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'X-Parse-Application-Id': PARSE_APP_ID,
      'X-Parse-REST-API-Key': PARSE_REST_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(function(res) {
    return res;
  })
  .catch(function(err) {
    console.error('Device registration error:', err);
  });
};
