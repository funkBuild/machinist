import React, { Component } from 'react';
import OperationList from './Operations/OperationList';
import OperationProperties from './Operations/OperationProperties';
import TabbedSection from '../common/TabbedSection';
import PathManager from '../../models/path_manager';

import './OperationsMenu.css'

class OperationsMenu extends Component {
  constructor(props){
    super(props);

    let selectedOperation = PathManager.operations.length > 0 ? PathManager.operations[0].id : null;
    this.state = {selectedOperation};
  }

  openOperation(selectedOperation){
    this.setState({selectedOperation});
  }

  render() {
    return (
      <div className="SideMenu OperationsMenu">
        <div className="menuHeader">
          <img src={ require('../../images/operations_icon.svg') } />
          Operations
        </div>

        <TabbedSection text="Operations">
          <OperationList onOperationSelect={id => this.openOperation(id)} selectedOperation={ this.state.selectedOperation } />
        </TabbedSection>

        <TabbedSection text="Properties">
          <OperationProperties selectedOperation={ this.state.selectedOperation } />
        </TabbedSection>
      </div>
    );
  }
}

export default OperationsMenu;
