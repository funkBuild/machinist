import React, { Component } from 'react';

class NumberField extends Component {
  render() {
    return (
      <div className="propertyField">
        <span>{ this.props.field.name }</span>
        <span>
          <input
            type="number"
            value={ this.props.value }
            onChange={e => this.props.onChange(Number(e.target.value))}
            min={this.props.field.minValue}
            max={this.props.field.maxValue}
            step={this.props.field.stepValue}
          />
          <span className="propSuffix">{ this.props.field.suffix }</span>
        </span>
      </div>
    );
  }
}

export default NumberField;
