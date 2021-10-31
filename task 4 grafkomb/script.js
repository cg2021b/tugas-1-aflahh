import * as THREE from './js/three.module.js';
import {OrbitControls} from './js/OrbitControls.js';
import {GLTFLoader} from './js/GLTFLoader.js';
import {Reflector} from './jsm/objects/Reflector.js';


// Canvas
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene();
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
camera.position.x = -15;
camera.position.y = 10;
camera.position.z = 20;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.render(scene, camera, controls);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaOutput = true;

// Panorama
const panorama = new THREE.CubeTextureLoader();
const textureSun = panorama.load([
  'panorama/px.png',
  'panorama/nx.png',
  'panorama/py.png',
  'panorama/ny.png',
  'panorama/pz.png',
  'panorama/nz.png'
]);
scene.background = textureSun;

// Road
const loader4 = new THREE.TextureLoader();
const road = loader4.load('https://source.unsplash.com/aHWWOJjPBmY');
let roadPlane = new THREE.BoxGeometry(20, 40);
let roadMaterial = new THREE.MeshLambertMaterial({
    map:road
});

let plane = new THREE.Mesh(roadPlane,roadMaterial);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Car
const loader = new GLTFLoader()
loader.load('car/scene.gltf', function(gltf){
        const root = gltf.scene;
        root.scale.x = 50;
        root.scale.y = 50;
        root.scale.z = 50;
        scene.add(root);
        
        root.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
        }});

})

// Lights
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 10, 30 );
spotLight.castShadow = true;
spotLight.intensity = 2;

scene.add( spotLight );

// Fog
scene.fog = new THREE.Fog('black', 20, 50);

// Reflective Sphere
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
let sphereCamera = new THREE.CubeCamera(1,100,cubeRenderTarget);
sphereCamera.position.set(0, 5, 15);
scene.add(sphereCamera);
const sphereMirror = new THREE.MeshBasicMaterial({
  envMap: sphereCamera.renderTarget.texture,
});
const sphereGeo = new THREE.SphereGeometry(1.5, 32 , 16);
const mirrorBall = new THREE.Mesh( sphereGeo, sphereMirror);
mirrorBall.position.y = 5;
mirrorBall.position.z = 15;
scene.add(mirrorBall);


// Mirror
let planeMirror = new THREE.PlaneGeometry( 20, 10 );
const verticalMirror = new Reflector( planeMirror, {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0xffffff
} );
verticalMirror.position.y = 5;
verticalMirror.position.z = -20;
scene.add( verticalMirror );

// Animation
const animate = () =>
{
    controls.update();
    renderer.render(scene, camera);
    sphereCamera.update(renderer, scene);
    window.requestAnimationFrame(animate);
}
animate();