global.container = undefined;
global.camera = undefined;
global.scene = undefined;
global.renderer = undefined;
global.stats = undefined;
global.controls = {};
global.group = undefined;
global.targetRotation = 0;
global.targetRotationOnMouseDown = 0;
global.mouseX = 0;
global.mouseXOnMouseDown = 0;
global.windowHalfX = window.innerWidth / 2;
global.windowHalfY = window.innerHeight / 2;
global.mixers = [];
global.clock = new THREE.Clock();
global.light = undefined;
global.globalLight = undefined;
global.textures = {};
global.activeObj = undefined;
global.repeatCoef = 10;
global.textureLoader = new THREE.TextureLoader();
global.raycaster = undefined;
global.mouse = undefined;
global.mousePos = undefined;

global.cameraPositions = {
    x: 0,
    y: 0,
    z: 200
}
global.controlsPositions = {
    x: -2.7864855302509497,
    y: -2.7092757632378754,
    z: -12.342000737510856
}
global.cameraRotation = {
    _x: 0,
    _y: 0,
    _z: 0
}
// var textureTGALoader = new THREE.TGALoader();