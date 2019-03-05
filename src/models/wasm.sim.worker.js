//import 'babel-polyfill';
import Simulation from './wasmSimWorker/simulation.js'

self.importScripts('main.js');

Module.onRuntimeInitialized = () => {
  const Worker = new class {
    constructor(){
      onmessage = this.onMessage.bind(this);
      postMessage({ type: 'ready' });
    }

    onMessage(e) {
      let message = e.data;

      switch(message.action) {
        case 'initSimulation':
          this.initSimulation(message);
          break;
        case 'setTool':
          this.setSimTool(message);
          break;
        case 'toolCollision':
          this.doToolCollision(message);
          break;
        case 'getSimPolygons':
          this.getSimPolygons(message);
          break;
        case 'runOperationSimulation':
          this.runOperationSimulation(message);
          break;
        default:
          console.log('Unknown message type');
      }
    }

    async initSimulation({id, params}) {
      let stock = params.stock;
      this.simCore = new Module.SimulateCore(stock.size.x, stock.size.y, stock.size.z);

      postMessage({
        id,
        params: {}
      });       
    }

    async setSimTool({id, params}) {
      this.simCore.setTool(params.tool);

      postMessage({
        id,
        params: {}
      });
    }

    async getSimPolygons({id}) {
      let polygons = this.simCore.getPolygons();

      postMessage({
        id,
        params: polygons
      });       
    }

    async doToolCollision({id, params}) {
      this.simCore.toolCollision(params.toolPosition);

      postMessage({
        id,
        params: {}
      });
    }

    async runOperationSimulation({id, params}){
      let start = Date.now();

      this.simCore.setTool(params.tool);

      postMessage({
        id,
        params: {}
      });

      this.simulation = new Simulation(this, params.pathBuffer, params.updateInterval);

      await this.simulation.run();

      let duration = Date.now() - start;
      console.log(`Sim done in ${duration} ms`);

      postMessage({
        type: 'simFinished',
        params: {}
      });
    }

    async sendPolygonUpdate(polygonBuffer) {
      postMessage({
        event: 'polygonUpdate',
        params: {
          polygonBuffer
        }
      });       
    }
    
  }
};




