var gui, guiElements, param = {
    color: '0xffffff'
};

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
	document.getElementsByClassName('ac')[0].style.zIndex = 999;
}



function buildGui() {
    clearGui();
    addGui('light posX', light.position.x, function (val) {
        light.position.x = val;
        render();
    }, false, -5000, 5000);
	addGui('light posY', light.position.y, function (val) {
        light.position.y = val;
        render();
    }, false, -5000, 5000);
	addGui('light posZ', light.position.z, function (val) {
        light.position.z = val;
        render();
    }, false, -5000, 5000);
	

    addGui('light color', light.color.getHex(), function (val) {
        light.color.setHex(val);
        render();
    }, true);
	addGui('globalLight intensity', globalLight.intensity, function (val) {
         globalLight.intensity = val;
        render();
    }, false, 0, 5);
	
	
    addGui('intensity', light.intensity, function (val) {
        light.intensity = val;
        render();
    }, false, 0, 2);
    addGui('angle', light.angle, function (val) {
        light.angle = val;
        render();
    }, false, 0, Math.PI / 3);
    addGui('penumbra', light.penumbra, function (val) {
        light.penumbra = val;
        render();
    }, false, 0, 1);
	
	addGui('textureRepeat', repeatCoef, function (val) {
        repeatCoef = val;
		updateTextureRepeat();
        render();
    }, false, 1, 20);
}

function addGui(name, value, callback, isColor, min, max) {
    var node;
    param[name] = value;
    if (isColor) {
        node = gui.addColor(param, name).onChange(function () {
            callback(param[name]);
        });
    } else if (typeof value == 'object') {
        node = gui.add(param, name, value).onChange(function () {
            callback(param[name]);
        });
    } else {
        node = gui.add(param, name, min, max).onChange(function () {
            callback(param[name]);
        });
    }
    return node;
}

//http://www.eponalabs.com/experiments/FBXReplaceTexture/fbx_replace_texture.html

//buildGui();