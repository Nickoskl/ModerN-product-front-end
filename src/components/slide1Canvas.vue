<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { onMounted } from 'vue';

/////////////COMPONENT IMPORT
import {stats, sizes,gui} from '../3d/components/debugTools'
import canObjects from '../3d/components/canModel'


const threeLoad=async()=>{

//////////////////////////////////////////////SCENE INIT
const scene = new THREE.Scene();
let loader
// const textureLoader = new THREE.TextureLoader();//REPLACE WITH  THREE.ImageBitmapLoader();
const DOMCanvas = document.querySelector(".webgl") as HTMLCanvasElement | null;

if (!DOMCanvas) {
    throw new Error("Canvas element with class 'webgl' not found");
}
const renderer = new THREE.WebGLRenderer({
    canvas: DOMCanvas,
    alpha: true,
    antialias:true,
});



const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.01, 1000);
camera.position.z=70;
camera.lookAt(new THREE.Vector3(13,0,0));
camera.worldToLocal(new THREE.Vector3(13,0,0));
scene.add(camera);



canObjects.position.x=13;
canObjects.rotation.y=Math.PI/2.3
scene.add(canObjects);

/////////////////////////////////

var state={
    rotateX:0,
    rotateY:0,
    rotateZ:0
}

loader = new RGBELoader();
loader.load( `/3d/textures/blocky_photo_studio_1k.hdr`, async ( texture ) => {

texture.mapping = THREE.EquirectangularReflectionMapping;
// texture.needsUpdate = true;

// scene.background = texture;
scene.environment = texture;
scene.environmentIntensity=0.8;
scene.castShadow = true;
scene.environmentRotation=new THREE.Euler(0.3, 2, 9.2, 'XYZ' );

} );

// const updateEnvironmentRotation = (rotation:number) => {
//     // Apply rotation to the scene
//     scene.rotation.y = rotation;

// };
// Example: Rotate the environment on GUI change
gui.add(state, 'rotateY', 0, Math.PI * 4, 0.01).onChange(() => {
    scene.rotation.y = state.rotateY;
});

gui.add(state, 'rotateX', 0, Math.PI * 4, 0.01).onChange(() => {
    scene.environmentRotation=new THREE.Euler(state.rotateX, 0, -5, 'XYZ' );
});

// gui.add(state, 'rotateY', 0, Math.PI * 4, 0.01).onChange(() => {
//     scene.rotation.y = state.rotateY;
// });


///////////////ASSIGN TEXTURES
// Array.from(objects as Set<THREE.Object3D>).forEach((obj: THREE.Object3D) => {
//     if (obj instanceof THREE.Mesh) {
//         obj.material = new THREE.MeshBasicMaterial({
//             color:0x000000,
//             wireframe:true
//         });
//     }
// });

/////////////SCENE SETUP
// Array.from(objects as Set<THREE.Object3D>).forEach((obj: THREE.Object3D) => {
//     obj.castShadow=true;
//     obj.receiveShadow=true;
//     console.log("TSET")
//     scene.add(obj);
// });

THREE.ColorManagement.enabled = true; 
// renderer.outputEncoding = THREE.sRGBEncoding;
// THREE.ColorManagement.legacyMode = false;
renderer.setSize(window.innerWidth, window.innerHeight);



const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 0);
light.castShadow = true;
scene.add(light);

const controls = new OrbitControls(camera,DOMCanvas);
controls.enableDamping=true;
controls.enablePan=false;
controls.enableZoom=false;
controls.enableRotate=false;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("mousemove", (event) => {
    const rect = DOMCanvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1; 
    // light.position.set(mouseX*3, mouseY, 2);
    camera.position.set(-mouseX*3,-mouseY*3,70);
    canObjects.position.set(mouseX+10,mouseY,0);
    scene.rotation.y=mouseX/5;
    // canObjects.position.set(mouseX+13,-mouseY,0);
});

const loop = () => {
    controls.update();
    stats.update(); 
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();

}


onMounted(() => {
    threeLoad();
});

</script>
<template>

<canvas class="webgl"></canvas>

</template>

<script lang="ts">




</script>

<style scoped>
/* 
.slide{
    padding: 0 !important;
} */

canvas{

    display: block; 
    position: absolute;
    top: 0;
    right: 0; 
    z-index: 1;
    
}

</style>