import React, { Component } from 'react';

import './TabbedSection.css'

class TabbedSection extends Component {
  constructor(props){
    super(props);

    this.state = { open: true };
  }

  toggleHeader(){
    this.setState({ open: !this.state.open });
  }

  render() {
    let headerClass = "tabbedHeader " + (this.state.open ? "open" : "closed");

    return (
      <div className="TabbedSection">
        <div className="tabbedHeader" onClick={() => this.toggleHeader()}>
          <span>{ this.props.text }</span>
          <span>{ this.state.open ? "▾" : "▴" }</span>
        </div>
        { this.state.open && (
          <div className="tabbedContent">
            { this.props.children }
          </div>
        )}
      </div>
    );
  }
}

export default TabbedSection;
