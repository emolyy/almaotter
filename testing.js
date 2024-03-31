import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let text = 'Do you want your drink in\nplastic cup or reusable cup?\n\nPress green button\nfor reusable cup.';
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const urlParams = new URLSearchParams(window.location.search);
let errorMessage = urlParams.get('state');
let game_end = false;
console.log(errorMessage);
if (errorMessage == 'timeout') {
	text = "Great Job! You successfully\nearned the reusuable cup";
	game_end = true;
} else if (errorMessage == 'collied') {
	text = "Oh no! Play the game again\nto earn the reusuable cup";
}

const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d')
function changeCanvas(text) {
	ctx.font = '16pt Tahoma'
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = 'black'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	const lines = text.split('\n');
	const lineHeight = 20; // Adjust this value to set the spacing between lines
	lines.forEach((line, index) => {
		ctx.fillText(line, canvas.width / 2, canvas.height / 2 - (lines.length - 1) / 2 * lineHeight + index * lineHeight);
	});
}

const coffee_scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(coffee_scene, camera);

const texture = new THREE.Texture(canvas)

var materialText = [
	new THREE.MeshStandardMaterial({color: 0xFFFFFF}),
	new THREE.MeshStandardMaterial({map: texture}),
	new THREE.MeshStandardMaterial({color: 0xFFFFFF}),
	new THREE.MeshStandardMaterial({color: 0xFFFFFF}),
	new THREE.MeshStandardMaterial({color: 0xFFFFFF}),
	new THREE.MeshStandardMaterial({color: 0xFFFFFF})
];

const geo = new THREE.BoxGeometry(2, 10, 20);
const mesh = new THREE.Mesh(geo, materialText);
mesh.position.set(25,8,5);
coffee_scene.add(mesh)

const geometry = new THREE.BoxGeometry( 100, 100, 0.1 );
const material = new THREE.MeshPhongMaterial({ color: 0xe4d8c7 });
const cube = new THREE.Mesh( geometry, material );
coffee_scene.add(cube);

cube.rotation.x = (Math.PI) / 2;
cube.position.y = -29.95;

const wallHeight = 60;
const wallGeometry = new THREE.BoxGeometry(100, wallHeight, 0.1);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xece4d8 });
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.z = -50;
coffee_scene.add(backWall);

const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.z = 50;
coffee_scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.x = 50;
rightWall.rotation.y = Math.PI / 2;
coffee_scene.add(rightWall);

const counterMaterial = new THREE.MeshStandardMaterial({ color: 0x754207 });
const counterTopGeo = new THREE.BoxGeometry(80, 1, 10);
const counterTop = new THREE.Mesh(counterTopGeo, counterMaterial);
counterTop.position.x = 15;
counterTop.position.y = -9.4;
counterTop.position.z = 10;
counterTop.rotation.y = Math.PI / 2;
coffee_scene.add(counterTop);

var textureLoader = new THREE.TextureLoader();                             
var texture0 = textureLoader.load('chalkboard.jpeg');  

var menuMaterial = [
	new THREE.MeshStandardMaterial({color: 0x1b3627}),
	new THREE.MeshStandardMaterial({color: 0x1b3627}),
	new THREE.MeshStandardMaterial({color: 0x1b3627}),
	new THREE.MeshStandardMaterial({color: 0x1b3627}),
	new THREE.MeshStandardMaterial({color: 0x1b3627}),
	new THREE.MeshStandardMaterial({map: texture0})
];

const menuGeometry = new THREE.BoxGeometry(80, 20, 1);
const menu = new THREE.Mesh(menuGeometry, menuMaterial);
menu.position.x = 49;
menu.position.y = 15;
menu.rotation.y = Math.PI / 2;
coffee_scene.add(menu);

const tablegeo = new THREE.CylinderGeometry(15, 15, 3.0, 32, 32, false);
const table = new THREE.Mesh(tablegeo, counterMaterial);
table.position.x = -22.5;
table.position.y = -10;
table.position.z = -22.5;
coffee_scene.add(table);

const tableLegGeo = new THREE.CylinderGeometry(5, 5, 20, 32, 32, false);
const tableLeg = new THREE.Mesh(tableLegGeo, counterMaterial);
tableLeg.position.x = -22.5;
tableLeg.position.y = -19;
tableLeg.position.z = -22.5;
coffee_scene.add(tableLeg);

const chair1Geo = new THREE.BoxGeometry(10, 10, 10);
const chair1 = new THREE.Mesh(chair1Geo, counterMaterial);
chair1.position.x = -35;
chair1.position.y = -24;
chair1.position.z = -35;
coffee_scene.add(chair1);

const chair2 = new THREE.Mesh(chair1Geo, counterMaterial);
chair2.position.x = -11.25;
chair2.position.y = -24;
chair2.position.z = -11.25;
coffee_scene.add(chair2);

const counterTopGeo1 = new THREE.BoxGeometry(100, 1, 10);
const counterTop1 = new THREE.Mesh(counterTopGeo1, counterMaterial);
counterTop1.position.x = 45;
counterTop1.position.y = -9.4;
counterTop1.rotation.y = Math.PI / 2;
coffee_scene.add(counterTop1);

const counterMat = new THREE.MeshStandardMaterial({color: 0xefefed});
const counterGeo = new THREE.BoxGeometry(80, 20, 10);
const counter = new THREE.Mesh(counterGeo, counterMat);
counter.position.x = 15;
counter.position.y = -19.9;
counter.position.z = 10;
counter.rotation.y = Math.PI / 2;
coffee_scene.add(counter);

const counterGeo1 = new THREE.BoxGeometry(100, 20, 10);
const counter1 = new THREE.Mesh(counterGeo1, counterMat);
counter1.position.x = 45;
counter1.position.y = -19.9;
counter1.rotation.y = Math.PI / 2;
coffee_scene.add(counter1);

renderer.setClearColor(0xffffff); // Set background color to white

coffee_scene.add(camera);

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set(-125,0,0)
controls.update();

const buttonGeometry = new THREE.BoxGeometry(4, 2, 4);
const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
buttonMesh.position.set(14, -8, 0);
coffee_scene.add(buttonMesh);

const buttonGeometry1 = new THREE.BoxGeometry(4, 2, 4);
const buttonMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const buttonMesh1 = new THREE.Mesh(buttonGeometry1, buttonMaterial1);
buttonMesh1.position.set(14, -8, 10);
coffee_scene.add(buttonMesh1);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

var green_clicked = false;
var red_clicked = false;
let redButtonClickedCount = 0;

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects([buttonMesh, buttonMesh1]);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
      if (intersectedObject == buttonMesh) {
        green_clicked = true;
      } else if (intersectedObject == buttonMesh1) {
        red_clicked = true;
      }
    }
}

function handleButtonClick() {
	window.location.href = 'game.html';
	green_clicked = false;
}

function handleButtonClickRed() {
	if (redButtonClickedCount == 0) {
		text = "oh.... you sure?\n almost 1.5 billion plastic \nbottles per day!\n\nif you changed your mind, \npress green button";
	} else if (redButtonClickedCount == 1) {
		text = "great job! \nyou just contributed to \nglobal warming"
		game_end = true;
	} else {
		game_end = true;
		window.location.href = "final.html";
	}
	redButtonClickedCount++
	red_clicked = false;
}

function animate() {
	requestAnimationFrame( animate );
	texture.needsUpdate = true
    controls.update();
	window.addEventListener('click', onMouseClick, false);
	if (green_clicked) {
		handleButtonClick();
	} else if (red_clicked) {
		handleButtonClickRed();
	}
	changeCanvas(text)
	if (game_end) {
		setTimeout(function() {
			window.location.href = 'final.html';
		}, 5000); // 5000 milliseconds = 5 seconds
	}
	renderer.render( coffee_scene, camera );
}

animate();

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();
  }

  _LoadModels() {
    const loader = new FBXLoader();
    loader.setPath('./resources/zombie/');
    loader.load('person.fbx', (fbx) => {
      fbx.scale.setScalar(0.3);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      this._target = fbx;
      fbx.position.set(-50,-30,0);
      fbx.rotation.y = Math.PI/2;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');


        const brianLoader = new FBXLoader();
        
        brianLoader.setPath('./resources/zombie/');
        brianLoader.load('brian.fbx', (brianFbx) => {
            brianFbx.scale.setScalar(0.25);
            brianFbx.traverse(c => {
                c.castShadow = true;
            });
            brianFbx.position.set(30, -30, 25); 
            brianFbx.rotateY((3 * Math.PI)/2);
            this._params.scene.add(brianFbx);
        });
       
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
        console.log("walked")
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('./resources/zombie/');
      loader.load('walking.fbx', (a) => { _OnLsoad('walk', a); });
      loader.load('running.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
    });
  }

  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};


class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};


class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }
      
      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }
//used to be 0.5
      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('dance');
    }
  }
};


class CharacterControllerDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    coffee_scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    coffee_scene.add(light);

    const controls = new OrbitControls(camera, renderer.domElement);
  
    controls.target.set(0, 10, 0);
    controls.update();
 
    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
  }

  _LoadAnimatedModel() {
    const params = {
      camera: camera,
      scene: coffee_scene,
    }
    this._controls = new BasicCharacterController(params);
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      coffee_scene.add(fbx);
    });
  }

  _LoadModel() {
    const loader = new GLTFLoader();
    loader.load('./resources/thing.glb', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = true;
      });
      coffee_scene.add(gltf.scene);
    });
  }

  _OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      renderer.render(coffee_scene, camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    //0.001
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
      
    }
  }
}



let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});