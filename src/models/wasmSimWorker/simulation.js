const POSITION_RESOLUTION = 0.1;

function delay(t){
  return new Promise( res => setTimeout(res, t));
}

class Simulation {
  constructor(worker, pathBuffer, updateInterval){
    this.worker = worker;
    this.simCore = worker.simCore;
    this.pathBuffer = pathBuffer;
    this.updateInterval = updateInterval;
    this.totalSegments = this.pathBuffer.length / 4;
    this.running = false;
  }

  async run(){
    this.startPolygonEmitter();

    for(let i = 0; i < this.totalSegments; i++){
      await this.runSegment(i);
    }

    this.stopPolygonEmitter();
  }

  startPolygonEmitter(){
    this._polygoneEmitter = setInterval(() => {
      let polygonBuffer = this.simCore.getPolygons();
      this.worker.sendPolygonUpdate(polygonBuffer);
    }, this.updateInterval);
  }

  stopPolygonEmitter(){
    clearInterval(this._polygoneEmitter);
  }

  getSegment(i){
    let sOffset = 4 * (i - 1);
    let fOffset = 4 * i;

    return {
      start: {
        x: this.pathBuffer[sOffset + 1],
        y: this.pathBuffer[sOffset + 2],
        z: this.pathBuffer[sOffset + 3]
      },
      end: {
        x: this.pathBuffer[fOffset + 1],
        y: this.pathBuffer[fOffset + 2],
        z: this.pathBuffer[fOffset + 3]
      }
    }
  }

  async runSegment(segmentNumber){
    let {start, end} = this.getSegment(segmentNumber);

    let deltas = {
      x: end.x - start.x,
      y: end.y - start.y,
      z: end.z - start.z
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

      this.worker.simCore.toolCollision(position);

      await delay(1);
    };
  }

  
}

export default Simulation;
