import FileExporter from './file_reader.js'

class STLParser {
  static async parseFile(file) {
    let fileBuffer = await FileExporter.readFile(file);
    let parser = new STLParser(fileBuffer);
    let dimensions = parser.normalize();

    return [parser.meshArray, parser.triangleNum, dimensions];
  }

  constructor(fileBuffer){
    this.fileBuffer = fileBuffer;
    this.parseToMeshBuffer();
  }

  parseToMeshBuffer() {
    let isLittleEndian = true;
    let dv = new DataView(this.fileBuffer, 80);

    this.triangleNum = dv.getUint32(0, isLittleEndian);
    this.meshArray = new Float32Array(3*3 * this.triangleNum);

    for(let i=0; i < this.triangleNum; i++){
      let triangleOffset = 3 * 3 * i;
      let offset = 4 + i * (12 * 4 + 2);

      offset += 12;

      for(let j = 0; j < 3; j++) {
        let pointOffset = triangleOffset + 3*j;
        this.meshArray[pointOffset++] = dv.getFloat32(offset, isLittleEndian);
        this.meshArray[pointOffset++] = dv.getFloat32(offset+4, isLittleEndian);
        this.meshArray[pointOffset++] = dv.getFloat32(offset+8, isLittleEndian);
        
        offset += 12
      }
    };
  }

  normalize(){
    let minimums = {x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER, z: Number.MAX_SAFE_INTEGER};
    let maximums = {x: -1 * Number.MAX_SAFE_INTEGER, y: -1 * Number.MAX_SAFE_INTEGER, z: -1 * Number.MAX_SAFE_INTEGER};

    for(let i=0; i < this.meshArray.length; i++){
      if(this.meshArray[3*i] < minimums.x) minimums.x = this.meshArray[3*i];
      if(this.meshArray[3*i + 1] < minimums.y) minimums.y = this.meshArray[3*i + 1];
      if(this.meshArray[3*i + 2] < minimums.z) minimums.z = this.meshArray[3*i + 2];

      if(this.meshArray[3*i] > maximums.x) maximums.x = this.meshArray[3*i];
      if(this.meshArray[3*i + 1] > maximums.y) maximums.y = this.meshArray[3*i + 1];
      if(this.meshArray[3*i + 2] > maximums.z) maximums.z = this.meshArray[3*i + 2];
    }

    for(let i=0; i < this.meshArray.length; i++){
      this.meshArray[3*i] -= minimums.x;
      this.meshArray[3*i + 1] -= minimums.y;
      this.meshArray[3*i + 2] -= minimums.z;
    }

    // Dimension of the model
    maximums.x -= minimums.x;
    maximums.y -= minimums.y;
    maximums.z -= minimums.z;

    return maximums;
  }
}
export default STLParser;
