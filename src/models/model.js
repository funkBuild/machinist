
import SceneManager from './scene_manager'
import Worker from './worker';

export default class Model {
  static async create(modelFile){
    let worker = await Worker.create();
    let result = await worker.sendCommand(
      'parseModel',
      {
        file: modelFile
      }
    );

    worker.destroy();
    return new Model(result.params);
  }

  constructor(params){
    this.buffer = params.modelBuffer;
    this.filename = params.filename;
    this.triangles = params.triangles;
    this.dimensions = params.dimensions;

    SceneManager.showModel(this.buffer);
  } 
}
