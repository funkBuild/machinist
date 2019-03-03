//import 'babel-polyfill';
import STLParser from './stl_parser.js'

self.importScripts('/main.js');

Module.onRuntimeInitialized = () => {
  const Worker = new class {
    constructor(){
      onmessage = this.onMessage.bind(this);
      postMessage({ type: 'ready' });
    }

    onMessage(e) {
      let message = e.data;

      switch(message.action) {
        case 'parseModel':
          this.parseModel(message);
          break;
        case 'setModel':
          this.setModel(message);
          break;
        case 'generatePath':
          this.createPath(message);
          break;
        default:
          console.log('Unknown message type');
      }
    }

    async parseModel(message) {
      let startTime = new Date();

      let [modelBuffer, triangles, dimensions] = await STLParser.parseFile(message.params.file);
      let parsingTime = new Date() - startTime;

      postMessage({
        id: message.id,
        type: 'modelParsed',
        params: {
          triangles,
          modelBuffer,
          filename: message.params.file.name,
          parsingTime,
          dimensions
        }
      });
    }

    async setModel(message){
      let {modelBuffer, triangles} = message.params;

      var nDataBytes = modelBuffer.length * modelBuffer.BYTES_PER_ELEMENT;
      var dataPtr = Module._malloc(nDataBytes);
      var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
      dataHeap.set(new Uint8Array(modelBuffer.buffer));

      this.core = new Module.MachinistCore(dataHeap.byteOffset, triangles);

      postMessage({
        id: message.id,
        type: 'modelSet',
        params: {}
      });
    }

    async createPath(message) {
      let startTime = new Date();

      let path = this.core.createSweepLinePath(message.params);

      let timeDelta = (new Date()) - startTime;
      console.log(`Path generated in ${timeDelta}ms`);    

      postMessage({
        id: message.id,
        type: 'pathGenerated',
        params: {
          pathBuffer: path
        }
      });
      
    }
  }
};




