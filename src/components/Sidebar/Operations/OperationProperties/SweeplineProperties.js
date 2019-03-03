/*
    resolution: 0.1,
    boundryOffset: 5,
    direction: 'X',
    tool: {
      diameter: 3,
      length: 40
    },
    stepoverPercent: 50,
    zDepthMax: 0,
    zDepthStart: 50,
    zDepthStep: 25
*/
import React, { Component } from 'react';
import Button from '../../../common/Button';
import PathManager from '../../../../models/path_manager';
import NumberField from './NumberField';
import ToolField from './ToolField';

const fields = {
  resolution: {
    name: 'Resolution',
    type: 'number',
    minValue: 0.01,
    maxValue: 5,
    stepValue: 0.01,
    suffix: 'mm'
  },
  boundryOffset: {
    name: "Boundry Offset",
    type: 'number',
    minValue: 0,
    suffix: 'mm'
  },
  direction: {
    name: 'Direction',
    options: ['x', 'y']
  },
  stepoverPercent: {
    name: "Stepover",
    type: 'number',
    minValue: 1,
    maxValue: 100,
    stepValue: 1,
    suffix: '%'
  },
  zDepthMax: {
    name: "Z Depth Stop",
    type: 'number',
    minValue: 0,
    suffix: 'mm'
  },
  zDepthStart: {
    name: "Z Depth Start",
    type: 'number',
    minValue: 0,
    suffix: 'mm'
  },
  zDepthStep: {
    name: "Z Depth Stepdown",
    type: 'number',
    minValue: 0.01,
    suffix: 'mm'
  }
}

// TODO: Min max on number fields
// TODO: Dropdown fields
// TODO: Text name field
// TODO: Generate button

class SweeplineProperties extends Component {
  constructor(props){
    super(props);
  
    this.state = Object.assign(
      { hasBeenUpdated: false },
      this.props.operation.properties
    );
  }

  save(){
    let fieldNames = Object.keys(fields);
    fieldNames.forEach(key => { this.props.operation.properties[key] = this.state[key] });

    this.setState({ hasBeenUpdated: false });  
  }

  generate(){
    this.save();

    this.props.operation.generate(this.props.operation.id);
  }

  updateToolValue(propertyName, value){
    let update = { hasBeenUpdated: true, tool: this.state.tool };
    update.tool[propertyName] = value;

    this.setState(update);
  }

  updateFieldValue(propertyName, value){
    let update = { hasBeenUpdated: true };
    update[propertyName] = value;

    this.setState(update);
  }

  dropdownFieldFor(propertyName){
    const field = fields[propertyName];

    return (
      <div className="propertyField">
        <span>{ field.name }</span>
        <span>
          <select
            value={this.state[propertyName]}
            onChange={e => this.updateFieldValue(propertyName, e.target.value)}
          >
            { field.options.map( (option, i) => {
               return <option value={ option } key={ i }>{ option.toUpperCase() }</option>
              })
            }
          </select>
        </span>
      </div>
    );
  }

  get buttonContent(){
    return (
      <div className="buttonContainer">
        <Button text="Save" onClick={() => this.save()} enabled={ this.state.hasBeenUpdated }/>
        <Button text="Generate" onClick={() => this.generate()} />
      </div>
    );
  }

  render() {
    let operation = this.props.operation;

    return (
      <div className="SubProperties">
        <ToolField tool={ this.state.tool } onFieldChange={(field, value) => this.updateToolValue(field, value)} />

        <NumberField field={ fields.resolution } value={this.state.resolution} onChange={value => this.updateFieldValue('resolution', value)} />
        { this.dropdownFieldFor('direction') }
        <NumberField field={ fields.boundryOffset } value={this.state.boundryOffset} onChange={value => this.updateFieldValue('boundryOffset', value)} />
        <NumberField field={ fields.stepoverPercent } value={this.state.stepoverPercent} onChange={value => this.updateFieldValue('stepoverPercent', value)} />
        <NumberField field={ fields.zDepthStart } value={this.state.zDepthStart} onChange={value => this.updateFieldValue('zDepthStart', value)} />
        <NumberField field={ fields.zDepthMax } value={this.state.zDepthMax} onChange={value => this.updateFieldValue('zDepthMax', value)} />
        <NumberField field={ fields.zDepthStep } value={this.state.zDepthStep} onChange={value => this.updateFieldValue('zDepthStep', value)} />

        { this.buttonContent }
      </div>
    );
  }
}

export default SweeplineProperties;
