import Worker from './worker';
import PathManager from './path_manager';
import SceneManager from './scene_manager'
import Path from './path'

const DEFAULT_TYPE = 'sweepline';
const DEFAULTS = {
  sweepline: {
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
  }
}

let count = 0;

class Operation {
  constructor({type, properties}) {
    this.id = ++count;
    this.type = type || DEFAULT_TYPE;
    this.properties = properties || DEFAULTS[this.type];
    this.path = null;
  }

  async generate(){
    PathManager.emit('operationGenerateStart', this);
    SceneManager.removePath(this.id);

    let worker = await Worker.createWithModel(PathManager.model);
    let result = await worker.sendCommand('generatePath', this.properties);

    worker.destroy();

    this.path = new Path(result.params.pathBuffer);
    this.path.show();

    PathManager.emit('operationGenerateStop', this);
    //SceneManager.showPath(this.id, this.path);
  }

  destroy(){
    SceneManager.removePath(this.id);
  }
}

export default Operation
