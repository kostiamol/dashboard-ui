import { setTimeout } from "timers";

global.onWindowResize = function onWindowResize() {
	windowHalfX = container.offsetWidth / 2;
	windowHalfY = container.offsetHeight / 2;

	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.offsetWidth, container.offsetHeight);
}

global.onDocumentMouseDown = function onDocumentMouseDown(event) {
	event.preventDefault();
	// document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

	findRaycasterPoint(event);
	findMousePositionOnScene();
	activeObj = checkIntersection();
	console.log(activeObj);

	if(activeObj.name == "Fridge_001"){
		reactHistory.push('/devices/FF-FF-FF-FF-FF-FF');
		window.setTimeout(function(){
			$('body, html').animate({ scrollTop: $('#details').offset().top }, 1000);
		},100);		
	}
}

global.onDocumentMouseMove = function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	updateLightPosition();
	targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

	findRaycasterPoint(event);
	findMousePositionOnScene();
	hoverObject(checkIntersection());
}

global.onDocumentMouseUp = function onDocumentMouseUp(event) {
	// document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}
global.onDocumentMouseOut = function onDocumentMouseOut(event) {
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

global.onDocumentTouchStart = function onDocumentTouchStart(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

global.onDocumentTouchMove = function onDocumentTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
	}
}

global.addEvenetListeners = function addEvenetListeners() {
	container.addEventListener('mousedown', onDocumentMouseDown, false);
	container.addEventListener('touchstart', onDocumentTouchStart, false);
	container.addEventListener('touchmove', onDocumentTouchMove, false);
	container.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
}

global.addControls = function addControls() {
	if (controls) {
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.addEventListener('change', render);
//		controls.maxPolarAngle = Math.PI / 2;
		// controls.maxPolarAngle = 0;
		// controls.minPolarAngle = Math.PI / 2.5;
		// controls.noZoom = true;
		controls.maxDistance = 2000;
        controls.center.set(-3.375785988589292, 28.355674105473646, -22.628869891076807);
	}
}

global.addStats = function addStats() {
	stats = new Stats();
	container.appendChild(stats.dom);
}