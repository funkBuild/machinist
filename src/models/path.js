import * as THREE from 'three';
import SceneManager from './scene_manager'

let id = 0;

class Path {
  constructor(pathBuffer){
    this.pathBuffer = pathBuffer;
    this.lineCount = pathBuffer.length / 4;
    this.id = id++;
  }

  toThreeObject(){
    let lineBuffer = new Float32Array(3 * this.lineCount);
    let colorBuffer = new Float32Array(3 * this.lineCount);
    let indices = [];

    for(let n=0; n < this.lineCount; n++){
      if(n > 0) indices.push(n - 1, n);

      let pathBufOffset = 4*n;
      let bufOffset = 3*n;

      lineBuffer[bufOffset] = this.pathBuffer[pathBufOffset+1];
      lineBuffer[bufOffset+1] = this.pathBuffer[pathBufOffset+3];
      lineBuffer[bufOffset+2] = this.pathBuffer[pathBufOffset+2];

      switch( this.pathBuffer[pathBufOffset] ){
        case 0:
          colorBuffer[bufOffset] = 255;
          colorBuffer[bufOffset+1] = 255;
          colorBuffer[bufOffset+2] = 255;
          break;
        case 1:
          colorBuffer[bufOffset] = 0;
          colorBuffer[bufOffset+1] = 255;
          colorBuffer[bufOffset+2] = 0;
          break;
      }
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setIndex( indices );
    geometry.addAttribute( 'position', new THREE.BufferAttribute( lineBuffer, 3 ) );
    geometry.addAttribute( 'color', new THREE.BufferAttribute( colorBuffer, 3 ) );

    let material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
//TODO: Set ID and add hide method
    return new THREE.LineSegments( geometry, material );
  }

  show(){
    SceneManager.scene.add(this.toThreeObject());
  }
}

export default Path;
