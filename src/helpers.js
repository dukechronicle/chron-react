var React = require('react-native');
var {
  ActivityIndicatorIOS
} = React;

module.exports = {
  LoadingView: React.createClass({
      render() {
        return (
          <ActivityIndicatorIOS
            hidden='true'
            size='large'
            style={this.props.style}
          />
        );
      }
    })
};
