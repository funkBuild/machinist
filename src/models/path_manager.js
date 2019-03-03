import Operation from './operation'
import SceneManager from './scene_manager'
import EventEmitter from 'events'
import Model from './model';

class PathManager extends EventEmitter {
  constructor(){
    super();

    this.operations = [];
    this.model = null;
  }

  getOperation(id){
    return this.operations.find(a => a.id == id);
  }

  addNewOperation(){
    let operation = new Operation({});
    this.operations.push( operation );

    return operation;
  }

  async setModel(modelFile) {
    this.model = await Model.create(modelFile);

    this.emit('modelReady');
  }

  clearOperations(){
    this.operations.forEach(operation => operation.destroy());
    this.operations = [];
  }

  clearModel(){
    this.clearOperations();
    this.model = null;

    SceneManager.removeModel();
  }
}

export default new PathManager();
