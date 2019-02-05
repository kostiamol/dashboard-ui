function updateTexture(mesh, texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    if(mesh.material.color.getHex() != 16777215){
        //0xffffff == 16777215
        mesh.material.color.setHex(0xffffff);
    }
    
    mesh.material.map = texture;
    mesh.material.needsUpdate = true;    
}

function loadTexture() {	
    let src;
    let loadedModelsCount = 0;
	let loader;

	activeObj.children[0].children.forEach(function (obj, i) {
//        src = `./demo-textures/new-textures/${obj.name}CompleteMap.png`;
        src = `./demo-textures/${obj.name}.png`;
        if (textures[src]) {
            updateTexture(obj, textures[src], src);
        } else {
            textureLoader.load(src, function (texture) {
                updateTexture(obj, texture, src);
                loadedModelsCount++;
                if(loadedModelsCount == activeObj.children[0].children.length){
                    $('#hideScene').hide();
                }
            });
        }  
        
	});
};

//var path = './demo-textures/';
//var textureSrc = ["gramercysofa_deck_001.png", "gramercysofa_legs_001.png", "gramercysofa_deck_001.tga"];
//var deffaultTextures = {
//	deck: path+textureSrc[0],
//	leg: path+textureSrc[1]
//};
//
//function loadTexture() {
//	let src;
//	let loadedModelsCount = 0;
//	let loader;
//
//	textureSrc.forEach(function (fileName) {
//		src = path + fileName;
//		loader = ~src.toLowerCase().indexOf(".tga") ? textureTGALoader : textureLoader;
//		function load()
//		loader.load(src, function (texture) {
//			loadedModelsCount++;
//			textures[src] = texture;
//			if (loadedModelsCount == textureSrc.length) {
//				updateTexture(activeObj.children[0].children[0], textures[deffaultTextures.leg]);
//				updateTexture(activeObj.children[0].children[1], textures[deffaultTextures.deck]);
//				$('#hideScene').hide();
//			}
//		});
//	});
//};