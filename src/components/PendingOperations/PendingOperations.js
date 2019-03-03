import React, { Component } from 'react';
import PathManager from '../../models/path_manager';

import './PendingOperations.css';

class PendingOperations extends Component {
  constructor(props){
    super(props);

    this.state = {
      operations: [],
      completedOperations: []
    };
    this.removeCompletedTimer = null;
  }

  componentDidMount(){
    PathManager.on('operationGenerateStart', this.addOperation.bind(this));
    PathManager.on('operationGenerateStop', this.stopOperation.bind(this));
  }

  addOperation(operation){
    this.state.operations.push(operation);
    this.forceUpdate();
  }

  stopOperation(operation){
    clearTimeout(this.removeCompletedTimer);

    this.state.completedOperations.push(this.state.operations.find(op => op.id == operation.id));
    this.state.operations = this.state.operations.filter(op => op.id != operation.id);
    this.forceUpdate();

    this.removeCompletedTimer = setTimeout(() => {
      this.state.completedOperations = [];
    }, 300);
  }

  cancelOperation(operation){

  }

  get active(){
    return this.state.operations.length > 0;
  }

  operationElement(operation){
    return (
      <div className="pendingOp">
        <div>
          <span>Generating { operation.name }</span>
          <span onClick={() => this.cancelOperation(operation)}>cancel</span>
        </div>
        <div className="loadingSpinner"></div>
      </div>
    );
  }

  render() {
    return (
      <div className={ this.active ? "PendingOperations active" :"PendingOperations inactive" }> 
        { this.state.operations.map(operation => this.operationElement(operation)) }
        { this.state.completedOperations.map(operation => this.operationElement(operation)) }
      </div>
    );
  }
}
// style={{right: this.state.position}}>
export default PendingOperations;
