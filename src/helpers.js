import React from 'react';
import { ActivityIndicator} from 'react-native';

/**
 * General purpose wrapper for ActivityIndicatorIOS.
 */
export const LoadingView = React.createClass({
  render() {
    return (
      <ActivityIndicator
        hidden="true"
        size="large"
      />
    );
  },
});
