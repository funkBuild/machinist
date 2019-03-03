import React, { Component } from 'react';
import SweeplineProperties from './OperationProperties/SweeplineProperties';
import PathManager from '../../../models/path_manager';

import './OperationProperties.css'

class OperationProperties extends Component {
  get propertiesContent(){
    let operation = PathManager.getOperation(this.props.selectedOperation);

    switch(operation.type){
      case 'sweepline':
        return <SweeplineProperties operation={ operation } />

    }
  }

  render() {
    let content;

    if(this.props.selectedOperation == null)
      return (
        <div className="OperationProperties">
          <div className="message">Select an operation to edit</div>
        </div>
      );
    else
      return (
        <div className="OperationProperties">
          { this.propertiesContent }
        </div>
      );
  }
}

export default OperationProperties;
