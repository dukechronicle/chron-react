const he = require('he');
const React = require('react-native');
const htmlparser = require('htmlparser2');
const DomHandler = require('domhandler');
const {
  ActivityIndicatorIOS
} = React;

const traverseDom = (el) => {
  if (el.type === 'text') {
    return he.unescape(el.data);
  } else if (el.type === 'tag' && el.children.length > 0) {
    return el.children.map(traverseDom).join(' ');
  }
};

module.exports = {
  extractHtmlText: (htmlText) => {
    const handler = new htmlparser.DomHandler();
    const parser = new htmlparser.Parser(handler);
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
