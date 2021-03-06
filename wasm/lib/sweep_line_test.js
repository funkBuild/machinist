const Module = require('./main');

Module.addOnPostRun(() => {
  let data = new Float32Array([
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,1,1,10,10,10,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,1,1,10,10,10,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,1,1,10,10,10,1,1,1,1,1,1,1,10,10,1,1,0,0,
    0,0,1,1,10,10,10,1,1,1,1,1,1,1,10,10,1,1,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ]);

  let params = {
    mapXSize: 50,
    mapYSize: 50,
    stepoverDistance: 0.8,
    xStepLength: 0.4,
    yStepLength: 0.4,
    zDepthMax: 0,
    zDepthStart: 25,
    zDepthStep: 10,
    toolDiameter: 6.4
  }

  let startTime = new Date();
  

  var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
  var dataPtr = Module._malloc(nDataBytes);
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));

  const lineCreator = new Module.HsmPathCreator(dataHeap.byteOffset, params);

  let path = lineCreator.getPath();
  Module._free(dataHeap.byteOffset);

  delete lineCreator;

  let deltaTime = (new Date()) - startTime;
  console.dir(path);
  console.log(`${deltaTime} ms`);
});

