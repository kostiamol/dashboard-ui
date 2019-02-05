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

// var loaderFBX = new THREE.FBXLoader(manager);
// loaderFBX.load('./models/bar.FBX', function (object) {
// 	console.log(object);
// 	activeObj = object;
// 	activeObj.mixer = new THREE.AnimationMixer(activeObj);
// 	mixers.push(activeObj.mixer);
// //	var action = object.mixer.clipAction(object.animations[0]);
// //	action.play();
// //	onReplaceTexture("./demo-textures/1.jpg");
//     loadTexture();
// 	scene.add(activeObj);
// }, onProgress, onError);

// var loader = new THREE.OBJLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'./models/Kitchen.obj',
// 	// called when resource is loaded
// 	function ( object ) {
// 		activeObj = object;
// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );


global.loadSceneModel = function loadSceneModel() {
	var onProgress = function (xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		}
	};

	var onError = function (xhr) { };

	THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('/models/');
	mtlLoader.load('kitchen2.mtl', function (materials) {
		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('/models/');
		objLoader.load('kitchen2.obj', function (object) {
			object.position.set(0, -35, 25);
			object.rotation.set(.4, 0, 0);

			object.remove(object.children.filter(function (elem) {
				return elem.name == "Group_009";
			})[0]);

			changeFridgeColor(object);
			saveOriginalColor(object);
			

			activeObj = object;
			scene.add(object);
		}, onProgress, onError);

	});
}

function saveOriginalColor(obj) {
	obj.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			child.userData.originalColors = [];
			if(child.material.length){
				child.material.forEach(function(mat){
					child.userData.originalColors.push(mat.color.getHex());
				});
			}
			else{
				child.userData.originalColors.push(child.material.color.getHex());
			}			
		}
	});
}

function changeFridgeColor(object) {
	object.traverse(function(child){
		if(child.name == "Fridge_001"){
			child.material[0].color.setHex(0x696969);
			child.material[2].color.setHex(0x696969);
		}
	});
}

