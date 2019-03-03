import * as THREE from 'three';
import SceneManager from './scene_manager';


class SubObject {
  constructor(id, vertices){
    this.id = id;

    let paddedVertexes = new Float32Array(300000);
    paddedVertexes.fill(0);
    paddedVertexes.set(vertices);

    this.vertexAttribute = new THREE.BufferAttribute(paddedVertexes, 3).setDynamic(true);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', this.vertexAttribute );
    geometry.computeVertexNormals();

    let material = new THREE.MeshStandardMaterial( { ambient: 0x050505, color: 0x335cff, specular: 0x555555, shininess: 100 } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = -Math.PI / 2;

    let box = new THREE.Box3().setFromObject( mesh );
    let minVector = box.min;
    mesh.position.set(-1 * minVector.x, -1 * minVector.y, -1 * minVector.z);

    SceneManager.scene.add(mesh);

    this.mesh = mesh;
  }
  
  update(vertices){

    let vertexArray = this.vertexAttribute.array;
    vertexArray.fill(0);
    vertexArray.set(vertices);

    this.vertexAttribute.needsUpdate = true;
    this.mesh.geometry.computeVertexNormals();
  }
}

class SimModel {
  constructor(){
    this.subObjects = {};
  }

  updateModel(fullArray){
    fullArray.forEach( polyGroup => this.updateGroup(polyGroup) );
  }

  updateGroup({id, vertices}){

    if(this.subObjects[id]){
      this.subObjects[id].update(vertices);
    } else {
      this.subObjects[id] = new SubObject(id, vertices);
    }
  }
}

export default SimModel;
