import React, { Component } from 'react';
import TabbedSection from '../common/TabbedSection';
import SimManager from '../../models/sim_manager';
import PathManager from '../../models/path_manager';

import './SimulateMenu.css';

class SimulateMenu extends Component {
  constructor(props){
    super(props);
    
    SimManager.initialize();
  }

  test(){
    SimManager.runOperation(PathManager.operations[0]);
/*
    SimManager.runLine(
      {x: 0, y: 0, z: 0},
      {x: 50, y: 50, z: 0},
    );
*/
  }

  get renderContent(){
    return (
      <TabbedSection text="Test">
        <div className="modelInput">
          <button onClick={() => this.test()}>Test</button>
        </div>
      </TabbedSection>
    )
  }

  render() {
    return (
      <div className="SideMenu SimulateMenu">
        <div className="menuHeader">
          <img src={ require('../../images/simulate_icon.svg') } />
          Simulate
        </div>

        { this.renderContent }
      </div>
    );
  }
}

export default SimulateMenu;
