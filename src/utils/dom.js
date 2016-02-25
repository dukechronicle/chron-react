const _ = require('underscore');
const he = require('he');
const htmlparser = require('htmlparser2');
const html = require('htmlparser-to-html');

/**
 * traverseDom takes in an element from he and returns the text from the
 * element, or the text from its children.
 *
 * @param {htmlparser element} el
 * @return {String} Text from el or its children.
 */
const traverseDom = (el) => {
  if (el.type === 'text') {
    return he.unescape(el.data);
  } else if (el.type === 'tag' && el.children.length > 0) {
    return el.children.map(traverseDom).join(' ');
  }
};

const parseHtml = (htmlText) => {
  const handler = new htmlparser.DomHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(htmlText);
  return handler.dom;
};

/**
 * Extracts all of the text nodes from a string that contains HTML.
 * @param {String} htmlText A string that contains HTML.
 * @return {String} The text nodes from the HTML concatenated with spaces.
 */
export const extractHtmlText = (htmlText) => {
  const dom = parseHtml(htmlText);
  return dom.map(traverseDom).join(' ');
};

/**
 * Inserts an element el at the idx-th spot in htmlText.
 * @param {String} htmlText A string that contains HTML with adjacent elements
 *   at the root.
 * @param {String} el A string that contains the HTML element to insert.
 * @param {Integer} idx The index at which the new element will appear.
 * @return {String} The text nodes from the HTML concatenated with spaces.
 */
export const insertElAt = (htmlText, el, idx) => {
  const newElDom = parseHtml(el.trim());
  const dom = parseHtml(htmlText);
  const allTags = _.all(dom, (elem) => elem.type === 'tag');
  if (allTags) {
    Array.prototype.splice.apply(dom, [idx, 0].concat(newElDom));
    dom[idx].prev = dom[idx - 1];
    dom[idx].next = dom[idx + 1];
    return html(dom);
  } else {
    return htmlText;
  }
};
