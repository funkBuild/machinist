import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols');


export default new class SceneManager {
  init(canvas) {
    console.dir(canvas);
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    let light = new THREE.PointLight( 0xffffff, 1, 0 );
    light.position.set(500, 150, 0 );
    this.scene.add( light );

    let light2 = new THREE.PointLight( 0xffffff, 1, 0 );
    light2.position.set( -500, 150, 0);
    this.scene.add( light2 );

    let light3 = new THREE.PointLight( 0xffffff, 1, 0 );
    light3.position.set( 0, -150, 500 );
    this.scene.add( light3 );

    let light4 = new THREE.PointLight( 0xffffff, 1, 0 );
    light4.position.set( 0, -150, -500 );
    this.scene.add( light4 );

    let light5 = new THREE.PointLight( 0xffffff, 1, 0 );
    light5.position.set( 0, 100, 0 );
    this.scene.add( light4 );

    this.addGrid();

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.animate();
  }

  addControls(){

  }

  onWindowResize(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  animate() {
    this.render();
  }

  render() {
    requestAnimationFrame( this.render.bind(this) );
    //this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }

  addGrid(xDimension = 200, yDimension = 200, divisionStep = 20, subDivisions = 5) {
    //let grid = new THREE.GridHelper(300, 10);
    //this.scene.add(grid);

    let gridGroup = new THREE.Group();
    let thinLineMaterial = new THREE.LineBasicMaterial( {
	    color: 0x333333,
	    linewidth: 0.1
    } );
    let thickLineMaterial = new THREE.LineBasicMaterial( {
	    color: 0x666666,
	    linewidth: 2
    } );
    let subDivisionInterval = divisionStep / subDivisions;

    for(let x=0; x <= xDimension; x += subDivisionInterval){
      let geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3( x, 0, 0) );
      geometry.vertices.push(new THREE.Vector3( x, 0, yDimension) );

      let line = new THREE.Line( geometry, ( x % divisionStep == 0 ? thickLineMaterial : thinLineMaterial) );
      gridGroup.add(line);
    }

    for(let y=0; y <= yDimension; y += subDivisionInterval){
      let geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3( 0, 0, y) );
      geometry.vertices.push(new THREE.Vector3( xDimension, 0, y) );

      let line = new THREE.Line( geometry, ( y % divisionStep == 0 ? thickLineMaterial : thinLineMaterial) );
      gridGroup.add(line);
    }

    this.scene.add(gridGroup);
  }

  showModel(meshBuffer) {
    let geometry = new THREE.BufferGeometry();
    
    geometry.addAttribute( 'position', new THREE.BufferAttribute( meshBuffer, 3 ) );
    geometry.computeVertexNormals();
    
    let material = new THREE.MeshStandardMaterial( { ambient: 0x050505, color: 0x335cff, specular: 0x555555, shininess: 100 } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.rotation.x = -Math.PI / 2;

    let box = new THREE.Box3().setFromObject( this.mesh );
    let minVector = box.min;
    this.mesh.position.set(-1 * minVector.x, -1 * minVector.y, -1 * minVector.z);

    this.scene.add(this.mesh);
  }

  removeModel(){
    this.scene.remove(this.mesh);
    delete this.mesh;
  }

  modifyModel(meshBuffer){
    //let newSize = meshBuffer.length;

    this.mesh.geometry.attributes.position.array.fill(0);
    this.mesh.geometry.attributes.position.array.set(meshBuffer);
    //this.mesh.geometry.attributes.position.array = meshBuffer;
    this.mesh.geometry.attributes.position.needsUpdate = true;
    this.mesh.geometry.computeVertexNormals();
  }

  removePath(pathId){
    let pathName = `Path::${pathId}`;
    let selectedObject = this.scene.getObjectByName(pathName);

    this.scene.remove( selectedObject );
  }

  showPath(pathId, toolpath) {
    let pathName = `Path::${pathId}`;
    let pathGroup = new THREE.Group();
    pathGroup.name = pathName;

    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let geometry = new THREE.Geometry();
    let currentPathType = toolpath[0].pathType;

    for(let i = 0; i < toolpath.length; i++) {
      let thisPath = toolpath[i];
      geometry.vertices.push(new THREE.Vector3(thisPath.start.x, thisPath.start.z, thisPath.start.y));
      
      if( currentPathType != thisPath.pathType) {
        let line = new THREE.Line(geometry, material);
        pathGroup.add(line);
        
        currentPathType = thisPath.pathType;
        geometry = new THREE.Geometry();
        let nextColor = currentPathType == 0 ? 0x0000ff : 0x00ffff;
        material = new THREE.MeshBasicMaterial({ color: nextColor });
        
        geometry.vertices.push(new THREE.Vector3(thisPath.start.x, thisPath.start.z, thisPath.start.y));
      }
    };
    let line = new THREE.Line(geometry, material);
    pathGroup.add(line)
    
    this.scene.add(pathGroup);
  }
}


