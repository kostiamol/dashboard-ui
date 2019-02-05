global.resetCamera = function resetCamera(positionZ) {
//	camera.lookAt( newWardrobe.THREEobj );
	camera.position.copy(cameraPositions);
	// camera.rotation.copy(cameraRotation);
	camera.updateProjectionMatrix();
	updateLightPosition();
	light.position.y = 0;
	light.position.x = 0;
}

global.createLight = function createLight() {
	globalLight = new THREE.AmbientLight(0xf0f0f0, .8);
	scene.add(globalLight);

	light = new THREE.SpotLight(0xffffff, 0);
	light.position.set(-160, 30, -800);
//	light.intensity = 2;
	
//	var spotLightHelper = new THREE.SpotLightHelper( light );
//	scene.add( spotLightHelper );
	
	light.castShadow = true;
	light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
	light.shadow.bias = -0.000222;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
//	light.shadowCameraVisible = true;
	light.intensity = .2;
	light.shadowMapDarkness = 1;
	
	scene.add(light);
}

var x = 0,y = 0,z = 0;

global.updateLightPosition = function updateLightPosition(){
	light.position.copy(camera.position);	 
//	light.position.x += 200;		
//	light.position.z += 500;		
//	light.position.y -= 100;
//	light.position.z += 200;
	
	light.position.x += x;		
	light.position.z += y;		
	light.position.y += z;
}

global.resetControlsPotision = function resetControlsPotision() {
	devModules.controls.center.copy(controlsPositions);
}