import React, { Component } from 'react';
import NumberField from './NumberField';

import './ToolField.css'

const fields = {
  diameter: {
    name: 'Diameter',
    type: 'number',
    minValue: 0.1,
    stepValue: 0.01,
    suffix: 'mm'
  },
  length: {
    name: 'Length',
    type: 'number',
    minValue: 0.1,
    stepValue: 0.01,
    suffix: 'mm'
  },
}

class ToolField extends Component {
  onUpdate(){

  }

  render() {
    return (
      <fieldset className="ToolField">
        <legend>Tool</legend>

        <div className="propertyField">
          <span>Endmill Type</span>
          <select
          >
            <option>Flat nose</option>
            <option>Ball nose</option>
          </select>
        </div>

        <NumberField field={ fields.diameter } value={ this.props.tool.diameter } onChange={value => this.props.onFieldChange('diameter', value)} />
        <NumberField field={ fields.length } value={ this.props.tool.length } onChange={value => this.props.onFieldChange('length', value)} />
      </fieldset>
    );
  }
}

export default ToolField;
