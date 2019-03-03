import React, { Component } from 'react';

import './ExportMenu.css';

class ExportMenu extends Component {
  render() {
    return (
      <div className="SideMenu ExportMenu">
        <div className="menuHeader">
          <img src={ require('../../images/export_icon.svg') } />
          Export
        </div>

      </div>
    );
  }
}

export default ExportMenu;
