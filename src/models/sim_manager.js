import SceneManager from './scene_manager'
import PathManager from './path_manager'
import EventEmitter from 'events'
import SimWorker from './sim_worker';
import SimModel from './sim_model';

export default new class extends EventEmitter {
  constructor() {
    super();

    this.model = new SimModel();

  }

  async initialize(stock){
    SceneManager.removeModel();

    this.stock = {
      size: {
        x: PathManager.model.dimensions.x,
        y: PathManager.model.dimensions.y,
        z: PathManager.model.dimensions.z
      }
    };

    this.simWorker = await SimWorker.createForSimulation(this.stock);
    await this.getFullPolygons();

    this.simWorker.on('polygonUpdate', params => this.updateModelEvent(params.polygonBuffer));
  }

  async runOperation(operation){
    await this.simWorker.runOperationSimulation(operation);
  }

  async getFullPolygons(){
    let polygonUpdate = await this.simWorker.getPolygons();

    this.model.updateModel(polygonUpdate);
  }

  updateModelEvent(polygonUpdate){
    this.model.updateModel(polygonUpdate);
  }

/*
  async runOperation(operation){
    await this.simWorker.setTool({
      diameter: operation.properties.tool.diameter,
      length: operation.properties.tool.length,
      resolution: POSITION_RESOLUTION
    });

    this.startPolygonUpdater();

    let segmentCount = operation.path.length;

    for(let i = 0; i < segmentCount; i++){
      let segment = operation.path[i];
      await this.runLine(segment.start, segment.end);
    }

    this.stopPolygonUpdater();
  }

  async runLine(start, finish){
    let deltas = {
      x: finish.x - start.x,
      y: finish.y - start.y,
      z: finish.z - start.z
    }
    let position = {
      x: start.x,
      y: start.y,
      z: start.z,
    }

    // Distance / resolution
    let totalSteps = Math.sqrt(deltas.x*deltas.x + deltas.y*deltas.y + deltas.z*deltas.z) / POSITION_RESOLUTION;
    deltas.x /= totalSteps;
    deltas.y /= totalSteps;
    deltas.z /= totalSteps;


    for(let step = 0; step < totalSteps; step++){
      position.x += deltas.x;
      position.y += deltas.y;
      position.z += deltas.z;

      await this.simWorker.toolCollision(position);
    };

    let polygons = await this.simWorker.getPolygons();
    SceneManager.modifyModel(polygons);
  }
*/
}
