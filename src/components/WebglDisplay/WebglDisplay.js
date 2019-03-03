import React, { Component } from 'react';
import SceneManager from '../../models/scene_manager';

import './WebglDisplay.css';

class WebglDisplay extends Component {
  componentDidMount() {
    window.onresize = this.resizeCanvas.bind(this);

    SceneManager.init(this.canvasElement);
    this.resizeCanvas();
  }

  resizeCanvas(){
    this.canvasElement.style.width = '100%';
    this.canvasElement.style.height= '100%';
    this.canvasElement.width = this.canvasElement.offsetWidth;
    this.canvasElement.height = this.canvasElement.offsetHeight;

    SceneManager.onWindowResize();
  }

  render() {
    return (
      <canvas
        className="WebglDisplay"
        ref={element => this.canvasElement = element}
      />
    );
  }
}

export default WebglDisplay;
