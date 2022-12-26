const renderer = new THREE.WebGLRenderer();
renderer.setSize( 500, 200 );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 1, window.innerWidth / window.innerHeight, 1, 100 );
const controls = new THREE.OrbitControls( camera, renderer.domElement );	

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 1, 1, 100 );
controls.update();

function animate() {

	requestAnimationFrame( animate );

	light.position.set( 
		camera.position.x + 10,
		camera.position.y + 10,
		camera.position.z + 10,
	  );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}



const loader = new THREE.GLTFLoader();

loader.load( 'model/water_bottel_turbo.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);

light = new THREE.SpotLight(0xffa95c,4);
light.position.set(-50,50,50);
light.castShadow = false;
scene.add( light );

scene.traverse(n => { if ( n.isMesh ) {
	n.castShadow = true; 
	n.receiveShadow = true;
	if(n.material.map) n.material.map.anisotropy = 16; 
  }});

  renderer.shadowMap.enabled = true;




function update() {
    renderer.render(scene,camera);
    requestAnimationFrame(update);
}
update();
