global.findRaycasterPoint = function findRaycasterPoint(event) {
	var parentOffset = container.parentElement,
		touches = event.changedTouches,
		usedEvent = event.changedTouches ? event.changedTouches[0] : event;

	mouse.x = ((usedEvent.clientX - container.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = -((usedEvent.clientY - container.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
}

global.findMousePositionOnScene = function findMousePositionOnScene() {
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject(camera);
	var dir = vector.sub(camera.position).normalize(),
		distance = -camera.position.z / dir.z;
	mousePos = camera.position.clone().add(dir.multiplyScalar(distance));
}

global.checkIntersection = function checkIntersection() {    
	var intersects = raycaster.intersectObjects(scene.children, true);
	var intersectedObj = {};
	
	if (intersects.length > 0) {
		intersectedObj = intersects[0].object;
	}
	
	return intersectedObj;
}