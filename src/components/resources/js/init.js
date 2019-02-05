setTimeout(function(){
	init();
	animate();
},1000);

// Vector3 {x: -10, y: -5, z: 100}
// _x: 0.3141592653589793, _y: 0, _z: -0,

function init() {
	container = document.getElementById('workspace');
	container.style.height = '100%';
	container.style.width = '100%';
	//	document.body.appendChild(container);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 1, 1000);
//	camera.position.set(12.561613790163392, 54.76783378787454, 88.8254051458957);
//	camera.rotation.set(-0.45372286765658487, 0.16202745496201043, 0.07850653397272163);
//	camera.position.set(54.03780730399402, 137.15450847016032, 164.0208123178499);
	// camera.position.set(33.85090095460269, 139.84513133746017, 170.1865621586835);
	// camera.rotation.set(-0.5451813255935941, 0.15685887765787435, 0.09446245707019528);
    raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	scene.add(camera);

	//	var light = new THREE.PointLight(0xffffff, 0.8);
	//	camera.add(light);
	createLight();

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	// renderer.setClearColor(0xf0f0f0);
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	container.appendChild(renderer.domElement);

//	addStats();
	// addControls();
	resetCamera();
	addEvenetListeners();
	loadSceneModel();
	addMirror();
}

global.animate = function animate() {
	requestAnimationFrame(animate);
	render();

	if (stats) {
		stats.update();
	}
	if (controls) {
		// controls.update();
	}

}

global.render = function render() {
	renderer.render(scene, camera);
}

function addMirror() {
	var geometry = new THREE.PlaneBufferGeometry( 106, 106 );
	global.floor = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
		color: 0x889999,
		transparent: true,
		opacity: .8
	}));

	global.mirror = new THREE.Reflector( geometry, {
		clipBias: 0.003,
		textureWidth: container.offsetWidth * window.devicePixelRatio,
		textureHeight: container.offsetHeight * window.devicePixelRatio,
		color: 0x889999,
		recursion: 1,
	} );
	mirror.position.set(0,-29,25);
	mirror.rotation.x = -1.18;

	floor.position.set(0,-29,25);
	floor.rotation.x = -1.18;
	scene.add( mirror, floor );
}