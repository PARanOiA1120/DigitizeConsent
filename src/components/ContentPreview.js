import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class ContentPreview extends Component {
  render() {
    const html = this.props.content;
    return <div>{ ReactHtmlParser(html) }</div>;
  }
}

export default ContentPreview