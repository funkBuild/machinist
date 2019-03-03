import React, { Component } from 'react';
import PathManager from '../../models/path_manager';
import Button from '../common/Button';
import TabbedSection from '../common/TabbedSection';

import './ModelMenu.css'

class ModelMenu extends Component {
  componentDidMount(){
    PathManager.on('modelReady', () => this.forceUpdate());
  }

  async onChange(e){
    let file = e.target.files[0];
    await PathManager.setModel(file);
  }

  async clearModel(){
    PathManager.clearModel();
    this.forceUpdate();
  }

  get renderContent(){
    if(PathManager.model){
      const model = PathManager.model;

      return (
        <div>
          <TabbedSection text="Model">
            <div className="modelProperties">
              <div>
                <span>Filename</span>
                <span>{ model.filename }</span>
              </div>
              <div>
                <span>Polygons</span>
                <span>{ model.triangles }</span>
              </div>

              <fieldset className="dimensionsField">
                <legend>Dimensions</legend>

                <div>
                  <span>X</span>
                  <span>{ model.dimensions.x } mm</span>
                </div>
                <div>
                  <span>Y</span>
                  <span>{ model.dimensions.y } mm</span>
                </div>
                <div>
                  <span>Z</span>
                  <span>{ model.dimensions.z } mm</span>
                </div>
              </fieldset>

              <div>
                <Button text="Clear" onClick={() => this.clearModel()}/>
              </div>
            </div>
          </TabbedSection>
        </div>
      )
    } else {
      return (
        <TabbedSection text="Model">
          <div className="modelInput">
            <input type="file" onChange={ this.onChange.bind(this) } accept=".stl" />
          </div>
        </TabbedSection>
      )
    }
  }

  render() {
    return (
      <div className="SideMenu ModelMenu">
        <div className="menuHeader">
          <img src={ require('../../images/model_icon.svg') } />
          Model
        </div>

        { this.renderContent }
      </div>
    );
  }
}

export default ModelMenu;
