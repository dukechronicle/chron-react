const he = require('he');
const React = require('react-native');
const htmlparser = require('htmlparser2');
const {
  ActivityIndicatorIOS,
} = React;

/**
 * traverseDom takes in an element from he and returns the text from the
 * element, or the text from its children.
 *
 * @param {he element} el
 * @return {String} Text from el or its children.
 */
const traverseDom = (el) => {
  if (el.type === 'text') {
    return he.unescape(el.data);
  } else if (el.type === 'tag' && el.children.length > 0) {
    return el.children.map(traverseDom).join(' ');
  }
};

module.exports = {
  /**
   * Extracts all of the text nodes from a string that contains HTML.
   * @param {String} htmlText A string that contains HTML.
   * @return {String} The text nodes from the HTML concatenated with spaces.
   */
  extractHtmlText: (htmlText) => {
    const handler = new htmlparser.DomHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(htmlText);
    return handler.dom.map(traverseDom).join(' ');
  },
  /**
   * General purpose wrapper for ActivityIndicatorIOS.
   */
  LoadingView: React.createClass({
    render() {
      return (
        <ActivityIndicatorIOS
          hidden="true"
          size="large"
        />
      );
    },
  }),
};
