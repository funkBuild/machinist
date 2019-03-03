import Worker from './worker';
import WasmSimWorker from './wasm.sim.worker';

const POSITION_RESOLUTION = 0.1;

class SimWorker extends Worker {
  static create(){
    return new Promise((res, rej) => {
      let worker = new SimWorker(res);
    });
  }

  static async createForSimulation(stock){
    let worker = await SimWorker.create();

    await worker.sendCommand(
      'initSimulation',
      {
        stock
      }
    );

    return worker;
  }

  _createWorker(){
    return new WasmSimWorker();
  }

  async setTool(tool){
    let result = await this.sendCommand(
      'setTool',
      {tool}
    );
  }

  async toolCollision(toolPosition){
    let result = await this.sendCommand(
      'toolCollision',
      {toolPosition}
    );
  }

  async getPolygons(){
    let result = await this.sendCommand(
      'getSimPolygons',
      {}
    );

    return result.params;
  }

  async runOperationSimulation(operation){
    let result = await this.sendCommand(
      'runOperationSimulation',
      {
        tool: {
          diameter: operation.properties.tool.diameter,
          length: operation.properties.tool.length,
          resolution: POSITION_RESOLUTION
        },
        pathBuffer: operation.path.pathBuffer,
        updateInterval: Math.floor(1000 / 15) 
      }
    );
  }
}

export default SimWorker;
