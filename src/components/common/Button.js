import React, { Component } from 'react';

import './Button.css'

class Button extends Component {
  static defaultProps = {
    enabled: true
  }

  render() {
    let className = `Button${ this.props.enabled ? '' : ' disabled' }`;

    return (
      <div
        className={ className }
        onClick={() => { this.props.enabled && this.props.onClick() }}
      >
        { this.props.text }
      </div>
    );
  }
}

export default Button;
