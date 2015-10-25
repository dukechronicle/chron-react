const React = require('react-native');
const {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  WebView,
} = React;
const { postPropTypes } = require('../utils/Post');
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

/**
 * TODO: FIX STYLE
 * @type {string}
 */
const innerStyles = "#title { flex: 1; font-weight: 600; font-size: 24px; }" +
  "#image { flex: 1; width: 375px; margin-top: 15px; margin-bottom: 5px; margin-left: -15px;margin-right: -15px;}" +
  "body{ font-family: 'Helvetica'; font-size: 12px;}" +
  "#caption {color: '#999999'; font-size: 12px; font-style: italic; margin-bottom: 25px,}"+
  "#byline {margin-top: 15px; margin-bottom: 14px}";

/**
 * PostDetail is a component that renders a post.
 */
const PostDetail = React.createClass({
  propTypes: {
    post: postPropTypes.isRequired,
  },

  getInitialState: function() {
    return {
      masterHTML: ""
    };
  },

  componentDidMount: function(){
    const post = this.props.post;
    let titleHTML, captionHTML, bylineHTML, imageHTML, masterHTML;
    titleHTML = "<p id='title'>" + post.title + '</p>';
    if (post.images.length > 0 && post.images[0].caption !== '') {
        captionHTML = "<p id='caption'>" + post.images[0].caption + '</p>';
    }
    if (post.authors) {
          bylineHTML = "<p id='byline'>By " + post.authors.join(', ') + '</p>';
    }
    if (post.images.length > 0) {
      imageHTML = "<img id='image' src='" + post.images[0].previewUrl + "'>"
    }
    const headHTML = '<!DOCTYPE html><html>';
    const styleHTML = "<head> <style>" + innerStyles + "</style> </head>";
    const endHTML = '</html>';
    masterHTML = headHTML.concat(styleHTML, titleHTML,bylineHTML, imageHTML, captionHTML, post.body, this.embedCommentsHTML(post.url), endHTML);
    this.updateHTML(masterHTML);
  },

  embedCommentsHTML: function(url){
    const sHTML = "<div id='disqus_thread'></div><script type ='text/javascript'>";
    const urlHTML = "var disqus_url ='" + url + "';";
    const jsHTML = "(function(){ var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;" +
        "dsq.src = 'http://dukechronicle.disqus.com/embed.js';" +
        "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })(); "
    const fHTML = "</script>";
    return sHTML.concat(urlHTML,jsHTML, fHTML);
  },

  updateHTML: function(html){
    this.setState({
      masterHTML: html
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <WebView
          html={this.state.masterHTML}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabledAndroid={true}
          startInLoadingState={false}
        />
      </View>
    );
  },
});

module.exports = PostDetail;
