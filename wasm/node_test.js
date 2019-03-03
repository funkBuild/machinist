const Module = require('./path_finder');

Module.addOnPostRun(() => {
  let data = new Float32Array([
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,1,1,10,10,1,1,1,1,1,1,1,1,10,10,1,1,0,0,
    0,0,1,1,10,10,1,1,1,1,1,1,1,1,10,10,1,1,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
  ]);
  let mapHeight = 20;
  let mapWidth = 10;
  let zMinHeight = 0;
  let startPoint = {x: 0, y: 0};
  let endPoint = {x: 9, y: 19};

  let startTime = new Date();

  var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
  var dataPtr = Module._malloc(nDataBytes);
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));

  const pathFinder = new Module.PathFinder(dataHeap.byteOffset, mapWidth, mapHeight);
  pathFinder.setZHeightMinimum(zMinHeight);
  pathFinder.setStartPoint(startPoint.x, startPoint.y)
  pathFinder.setEndPoint(endPoint.x, endPoint.y)




  let sum;
  for(let i=0; i < 10000; i++) {
      sum = pathFinder.route();
  }

  let totalTime = (new Date()) - startTime;
  console.log(totalTime);
  console.log(totalTime / 10000.0);
  console.log('###');
  //console.dir(sum);
  Module._free(dataHeap.byteOffset);
});

