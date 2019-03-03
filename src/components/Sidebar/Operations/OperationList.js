import React, { Component } from 'react';
import Button from '../../common/Button';
import PathManager from '../../../models/path_manager';

import './OperationList.css'

class OperationList extends Component {
  createNew(){
    let operation = PathManager.addNewOperation();

    this.selectOperation(operation.id);
  }

  selectOperation(selectedOperation){
    this.props.onOperationSelect(selectedOperation)
  }

  get listContent(){
    return PathManager.operations.map( operation => {
      let selected = operation.id === this.props.selectedOperation;

      return (
        <div
          className={'operation' + (selected ? ' selected' : '')}
          key={operation.id} onClick={() => this.selectOperation(operation.id)}
        >
          <span className="opName">{ operation.type }</span>
          <div className="opButtons">
            
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="OperationList">
        <div className="listContainer">
          { this.listContent }
        </div>
        <div className="buttonContainer">
          <Button text="New" onClick={() => this.createNew()} />
        </div>
      </div>
    );
  }
}

export default OperationList;
