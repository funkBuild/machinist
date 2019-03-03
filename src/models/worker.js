import WasmWorker from './wasm.worker';
import EventEmitter from 'events'

export default class Worker extends EventEmitter {
  static create(){
    return new Promise((res, rej) => {
      let worker = new Worker(res);
    });
  }

  static async createWithModel(model){
    let worker = await Worker.create();

    await worker.sendCommand(
      'setModel',
      {
        modelBuffer: model.buffer,
        triangles: model.triangles
      }
    );

    return worker;
  }

  constructor(onReady){
    super();

    this.worker = this._createWorker();
    this._onReady = onReady;
    this._cmdId = 0;
    this._callbacks = {};

    this.worker.onmessage = this._onMessage.bind(this);
  }

  _createWorker(){
    return new WasmWorker();
  }

  _onMessage(reply){
    let message = reply.data;

    if(message.type == 'ready'){
      this._onReady(this);
      return;
    }

    if(message.event){
      this.emit(message.event, message.params);
      return;
    }

    if(message.id && this._callbacks[message.id]){
      this._callbacks[message.id](message);
      delete this._callbacks[message.id];
    }
  }

  sendCommand(action, params){
    return new Promise((res, rej) => {
      let id = ++this._cmdId;
      this._callbacks[id] = res;
      this.worker.postMessage({id, action, params});
    });
  }

  destroy(){
    this.worker.terminate();
  }
}
