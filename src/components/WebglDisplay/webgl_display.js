export default new class WebglDisplay {
  init() {
    this.clock = new THREE.Clock();

    //Detector.addGetWebGLMessage();
    this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.x = 100;
    this.camera.position.y = 100;
    this.camera.position.z = 100;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		//this.controls.addEventListener( 'change', this.render.bind(this) );


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

    this.renderer = new THREE.WebGLRenderer(); //new THREE.CanvasRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.addControls();
  }

  addControls(){
    let container = document.getElementById('display');
    container.appendChild( this.renderer.domElement );

		this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		this.controls.rotateSpeed = 1.0;
		this.controls.zoomSpeed = 1.2;
		this.controls.panSpeed = 0.8;

		this.controls.noZoom = false;
		this.controls.noPan = false;

		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.3;

		this.controls.keys = [ 65, 83, 68 ];
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
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }

  addGrid() {
    let grid = new THREE.GridHelper(300, 10);
    this.scene.add(grid);
  }

  showModel(meshBuffer) {
    let geometry = new THREE.BufferGeometry();
    
    geometry.addAttribute( 'position', new THREE.BufferAttribute( meshBuffer, 3 ) );
    geometry.computeVertexNormals();
    
    let material = new THREE.MeshStandardMaterial( { ambient: 0x050505, color: 0x335cff, specular: 0x555555, shininess: 100 } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.rotation.x = -Math.PI / 2;

    var box = new THREE.Box3().setFromObject( this.mesh );
    let minVector = box.min;
    this.mesh.position.set(-1 * minVector.x, -1 * minVector.y, -1 * minVector.z);


    this.scene.add(this.mesh);
  }

  showPath(path_id, toolpath) {
    //let path_name = `path_${path_id}`;
    //let selectedObject = this.scene.getObjectByName(path_name);
    //this.scene.remove( selectedObject );

    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let geometry = new THREE.Geometry();
    let currentPathType = toolpath[0].pathType;

    for(let i = 0; i < toolpath.length; i++) {
      let thisPath = toolpath[i];
      geometry.vertices.push(new THREE.Vector3(thisPath.start.x, thisPath.start.z, thisPath.start.y));
      
      if( currentPathType != thisPath.pathType) {
        let line = new THREE.Line(geometry, material);
        this.scene.add(line);
        
        currentPathType = thisPath.pathType;
        geometry = new THREE.Geometry();
        let nextColor = currentPathType == 0 ? 0x0000ff : 0x00ffff;
        material = new THREE.MeshBasicMaterial({ color: nextColor });
        
        geometry.vertices.push(new THREE.Vector3(thisPath.start.x, thisPath.start.z, thisPath.start.y));
      }
    };
    let line = new THREE.Line(geometry, material);
    
    //line.name = path_name;
    
    this.scene.add(line);
  }
}


