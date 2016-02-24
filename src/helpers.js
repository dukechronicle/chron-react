const React = require('react-native');
const {
  ActivityIndicatorIOS,
} = React;

/**
 * General purpose wrapper for ActivityIndicatorIOS.
 */
export const LoadingView = React.createClass({
  render() {
    return (
      <ActivityIndicatorIOS
        hidden="true"
        size="large"
      />
    );
  },
});
