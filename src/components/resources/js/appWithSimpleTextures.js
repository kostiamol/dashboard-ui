var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
	console.log(item, loaded, total);
};

var onProgress = function (xhr) {
	if (xhr.lengthComputable) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log(Math.round(percentComplete, 2) + '% downloaded');
	}
};

var onError = function (xhr) {
	console.log(xhr);
};

var loader = new THREE.FBXLoader(manager);
loader.load('./models/sofa_ascii.FBX', function (object) {
	console.log(object);
	activeObj = object;
	activeObj.mixer = new THREE.AnimationMixer(activeObj);
	mixers.push(activeObj.mixer);
//	var action = object.mixer.clipAction(object.animations[0]);
//	action.play();
	onReplaceTexture("./demo-textures/1.jpg");
	scene.add(activeObj);
}, onProgress, onError);

function onReplaceTexture(src) {
	var index = 0;
	activeObj.traverse(function (child) {		
		if (child instanceof THREE.Mesh) {
			if(index == 0){
				child.material.map = textures["./demo-textures/wood.jpg"];
			}
			else{
				child.material.map = textures[src];
			}
			
			child.material.needsUpdate = true;
			child.castShadow = true;
			child.receiveShadow = true;
			child.material.map.repeat.x = repeatCoef;
			child.material.map.repeat.y = repeatCoef;
			index++;
		}
	});
}

function updateTextureRepeat() {
	activeObj.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			child.material.map.repeat.x = repeatCoef;
			child.material.map.repeat.y = repeatCoef;
		}
	});		
}

(function loadTexture() {
	var textureLoader = new THREE.TextureLoader(),
		texturesSrc = ["./demo-textures/1.jpg", "./demo-textures/2.jpg", "./demo-textures/3.jpg" , "./demo-textures/4.jpg" , "./demo-textures/5.jpg", "./demo-textures/wood.jpg"];
	
	texturesSrc.forEach(function (src) {
		textureLoader.load(src, function (texture) {
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			textures[src] = texture;
		});
	});
})();

$('.buttonImg').click(function(){
	onReplaceTexture($(this).attr('src'));
	
	$('.buttonImg').each(function(i){
		$('.buttonImg').eq(i).css({opacity: .7, border: "2px solid white"});
	});
	
	$(this).css({opacity: 1, border: "2px solid #3891ff"});
});



