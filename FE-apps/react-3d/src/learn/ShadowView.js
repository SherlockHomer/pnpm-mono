/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

class ShadowView extends React.Component {
  constructor() {
    super();
    this.attachShadowRef = React.createRef();
  }

  componentDidMount() {
    const host = this.attachShadowRef.current;
    //  <React.StrictMode> 导致 无法直接挂在 host 上
    const root = document.createElement('div');
    if (host) {
      const shadowRoot = root.attachShadow({ mode: 'open' });
      // 将子元素移动到 Shadow DOM 中
      [].slice.call(host.children).forEach((child) => {
        shadowRoot.appendChild(child);
      });
    }
    host.appendChild(root);
  }

  render() {
    return <div ref={this.attachShadowRef}>{this.props.children}</div>;
  }
}

ShadowView.propTypes = {
  children: PropTypes.node,
};

export default ShadowView;
