import React, { Component } from 'react';
import ModelMenu from './ModelMenu';
import OperationsMenu from './OperationsMenu';
import SimulateMenu from './SimulateMenu';
import ExportMenu from './ExportMenu';

import './Sidebar.css';


class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentMenu: 'model'
    };
  }

  onHeaderClick(currentMenu){
    this.setState({currentMenu});
  }

  get currentMenuElement(){
    switch(this.state.currentMenu){
      case 'model':
        return <ModelMenu />;
      case 'operations':
        return <OperationsMenu />;
      case 'simulate':
        return <SimulateMenu />;
      case 'export':
        return <ExportMenu />;
    }
  }

  render() {
    return (
      <div className="Sidebar">
        <div className="headers">
          <div
            onClick={() => this.onHeaderClick('model')}
            style={{ backgroundColor: '#587291'}}
          >
            <img src={ require('../../images/model_icon.svg') } />
            Model
          </div>
          <div
            style={{ backgroundColor: '#2F97C1'}}
            onClick={() => this.onHeaderClick('operations')}
          >
            <img src={ require('../../images/operations_icon.svg') } />
            Operations
          </div>
          <div
            style={{ backgroundColor: '#1CCAD8'}}
            onClick={() => this.onHeaderClick('simulate')}
          >
            <img src={ require('../../images/simulate_icon.svg') } />
            Simulate
          </div>
          <div
            style={{ backgroundColor: '#B4656F'}}
            onClick={() => this.onHeaderClick('export')}
          >
            <img src={ require('../../images/export_icon.svg') } />
            Export
          </div>
        </div>

        <div className="menuItem">
          { this.currentMenuElement }
        </div>
      </div>
    );
  }
}

export default Sidebar;
