import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; //beimportolás

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene(); //Scene -> container fogja az összes cuccomat, object, lights, camera


const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 7;
camera.position.y = 0;
camera.position.x = 10;
//(75fokos szögben látjuk,360 fokig,AspectRatio ami a felbontáson alapul hogy mennyit jelenít meg, view festrum milyen messze vannak a kamerától a dolgok
//mimikálja hogy mit látnánk emberi szemmel, (FOV mennyi látszik a világnak hány fokos)

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')}); //kirenderelje a rendesen a grafikát

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth,window.innerHeight); //fullscreen
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera,renderer.domElement); //meg kell hívni a főbe

const raycaster = new THREE.Raycaster();


renderer.render(scene,camera); //render rajzol
//eddig háttér
//világítás
/*const light = new THREE.AmbientLight( 0x404040 ); */
/*const light = new THREE.DirectionalLight( 0xffffff, 0.5 );*/
const light = new THREE.SpotLight(0xffa95c,2);
light.position.set(-50,50,50);
light.castShadow = true;
scene.add( light );
var hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemiLight);

var light3 = new THREE.DirectionalLight( 0xffffff );
        light3.position.set( 0, 200, 100 );
        light3.castShadow = true;
        light3.shadow.mapSize.width = 2048; 
        light3.shadow.mapSize.height = 2048;
        light3.shadow.camera.top = 3000;
        light3.shadow.camera.bottom = -3000;
        light3.shadow.camera.left = -3000;
        light3.shadow.camera.right = 3000;
        light3.shadow.camera.far = 3000;
        scene.add( light3 );


//background
const loader = new GLTFLoader();
/*
loader.load('model/classroom.glb', function ( glb ) {
  
  console.log(glb)
  const root = glb.scene;
  glb.scene.rotateOnAxis(new THREE.Vector3(0,-1,0),2)
  glb.scene.position.set(2,-4,8)
  scene.add(root);
 

},function ( xhr ) {

	console.log((xhr.loaded/xhr.total * 100) + "% loaded");

},function(error)
{
  console.group("An error has occured");
} );
*/

/*
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;*/
for(let i=0;i<101;i++)
{
  const[x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100)); 
  loader.load('model/router.glb', function ( glb ) { //router
    
    console.log(glb)
    const router = glb.scene;
    
    function addRouter()
    {
      //milyen messze legyenek egymástól
      router.position.set(x,y,z);
      scene.add(router);
    }
    Array(100).fill().forEach(addRouter);

  });
  loader.load('model/pc.glb', function ( glb ) { //router
    
    console.log(glb)
    const pc = glb.scene;
    
    function addPc()
    {
      //milyen messze legyenek egymástól
      pc.position.set(x,y-5,z);
      scene.add(pc);
    }
    Array(100).fill().forEach(addPc);

  });


  loader.load('model/hub.glb', function ( glb ) { //hub
    
    console.log(glb)
    const hub = glb.scene;
    
    function addHub()
    {
      //milyen messze legyenek egymástól
      hub.position.set(x,y-2.5,z);
      scene.add(hub);
    }
    Array(100).fill().forEach(addHub);


  }
  
  ,function ( xhr ) {

    console.log((xhr.loaded/xhr.total * 100) + "% loaded");

  },function(error)
  {
    console.group("An error has occured");
  } );
}

//GLTF
/*
for(let i=0;i<101;i++)
{
  
  loader.load('model/router.glb', function ( glb ) {
    
    console.log(glb)
    const router = glb.scene;
    
    function addRouter()
    {
      const[x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100)); //milyen messze legyenek egymástól
      router.position.set(x,y,z);
      scene.add(router);
    }
    Array(100).fill().forEach(addRouter);


  });
}*/





function animate()
{
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}

animate();