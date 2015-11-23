const _ = require('underscore');
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
const WEBVIEW_REF = 'webview';

const innerStyles = `
  #title {
    flex: 1;
    font-weight: 600;
    font-size: 24px;
  }
  #image {
    flex: 1;
    width: 375px;
    margin-top: 15px;
    margin-bottom: 5px;
    margin-left: -15px;
    margin-right: -15px;
  }
  body {
    font-family: 'Helvetica';
    font-size: 12px;
  }
  #caption {
    color: '#999999';
    font-size: 12px;
    font-style: italic;
    margin-bottom: 25px;
  }
  #byline {
    margin-top: 15px;
    margin-bottom: 14px
  };`;

/**
 * PostDetail is a component that renders a post.
 */
const PostDetail = React.createClass({
  propTypes: {
    post: postPropTypes.isRequired,
    navigator: postPropTypes.isRequired,
  },

  getHTML: function(){
    const post = this.props.post;

    const headHTML = '<!DOCTYPE html><html>';
    const styleHTML = `<head> <style> ${innerStyles} </style> </head>`;
    const titleHTML = `<p id='title'> ${post.title} </p>`;
    const captionHTML = (post.images.length > 0 && post.images[0].caption !== '') ? `<p id='caption'> ${post.images[0].caption} </p>` : '';
    const bylineHTML = (post.authors) ? `<p id='byline'>By ${post.authors.join(', ')} </p>` : '';
    const imageHTML = (post.images.length > 0) ? `<img id='image' src=' ${post.images[0].previewUrl} '>` : '';
    const contentHTML = post.body;
    const embedHTML = this.getEmbedHTML(post.url);
    const endHTML = '</html>';

    return [
      headHTML,
      styleHTML,
      titleHTML,
      captionHTML,
      bylineHTML,
      imageHTML,
      contentHTML,
      embedHTML,
      endHTML
    ].join('');
  },

  getEmbedHTML: function(url){
    const sHTML = `<div id='disqus_thread'></div><script type ='text/javascript'>`;
    const urlHTML = `var disqus_url ='${url}';`;
    const jsHTML = `
        (function(){ var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://dukechronicle.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq); })();
        `;
    const fHTML = `</script>`;
    return `${sHTML} ${urlHTML} ${jsHTML} ${fHTML}`;
  },

  redirect: function(navState){
    if(navState.loading == true){
      return;
    }
    const url = navState.url;
    const successes = [
      "disqus.com/next/login-success",
      "disqus.com/_ax/google/complete",
      "disqus.com/_ax/twitter/complete",
      "disqus.com/_ax/facebook/complete"
    ];
    if((url.split('.com'))[0].contains('disqus') && _.some(successes, (success) => {return url.contains(success)})){
      this.props.navigator.push({
        title: this.props.title,
        component: PostDetail,
        passProps: {post: this.props.post, navigator: this.props.navigator}
      });
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <WebView
          ref={WEBVIEW_REF}
          html={this.getHTML()}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabledAndroid={true}
          startInLoadingState={false}
          onNavigationStateChange={this.redirect}
        />
      </View>
    );
  },
});

module.exports = PostDetail;
