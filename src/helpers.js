var he = require('he');
var React = require('react-native');
var htmlparser = require('htmlparser2');
var DomHandler = require('domhandler');
var {
  ActivityIndicatorIOS
} = React;

var traverseDom = (el) => {
  if (el.type === 'text') {
    return he.unescape(el.data);
  } else if (el.type === 'tag' && el.children.length > 0) {
    return el.children.map(traverseDom).join(' ');
  }
};

module.exports = {
  extractHtmlText: (htmlText) => {
    var handler = new htmlparser.DomHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(htmlText);
    return handler.dom.map(traverseDom).join(' ');
  },
  LoadingView: React.createClass({
      render() {
        return (
          <ActivityIndicatorIOS
            hidden='true'
            size='large'
          />
        );
      }
    })
};
