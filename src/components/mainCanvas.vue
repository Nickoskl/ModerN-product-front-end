<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { onMounted } from 'vue';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

/////////////COMPONENT IMPORT
import {stats, sizes,gui,state} from '../3d/components/debugTools'
import canObjects from '../3d/components/canModel'


const threeLoad=async()=>{

//////////////////////////////////////////////SCENE INIT
const scene = new THREE.Scene();
var loader, mouseX:number, mouseY:number,distX:number,distY:number;
var tempX = canObjects.position.x;
var tempY = canObjects.position.y;
var speed =0.02;

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


// const axisH = new THREE.AxesHelper(15);
// scene.add(axisH)

// const gridHelper = new THREE.GridHelper(50, 50); // Size and divisions
// scene.add(gridHelper);

// canObjects.add(axisH)



canObjects.position.set(10,0,0);
canObjects.rotation.y=Math.PI/2.3
scene.add(canObjects);

/////////////////////////////////

loader = new RGBELoader();
loader.load( `/3d/textures/blocky_photo_studio_1k.hdr`, async ( texture ) => {

texture.mapping = THREE.EquirectangularReflectionMapping;
// texture.needsUpdate = true;

// scene.background = null;
scene.environment = texture;
scene.environmentIntensity=state.hdr.exposure;
scene.castShadow = true;
scene.rotation.y=12;

} );



THREE.ColorManagement.enabled = true; 
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


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// const blendShader = {
//     uniforms: {
//         tDiffuse: { value: null },
//         uColor: { value: new THREE.Color(0x000000) },
//         uAlpha: { value: 1.0 }
//     },
//     vertexShader: `
//         varying vec2 vUv;
//         void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D tDiffuse;
//         uniform vec3 uColor;
//         uniform float uAlpha;
//         varying vec2 vUv;

//         void main() {
//             vec4 base = texture2D(tDiffuse, vUv);
//             // Simple blend without color space conversion
//             vec3 blendedColor = mix(base.rgb, uColor, 0.05); // Reduced blend factor to 0.05
//             gl_FragColor = vec4(blendedColor, base.a * uAlpha);
//         }
//     `
// };
// const blendPass = new ShaderPass(blendShader);
// composer.addPass(blendPass);



gui.add(state.hdr,'exposure',0,1,0.01).onChange(()=>{
    scene.environmentIntensity=state.hdr.exposure;
    // blendPass.uniforms.uAlpha.value=state.hdr.exposure;
    if(state.hdr.exposure>0){
        var canvasObj = document.querySelector('canvas')
        if(canvasObj){
            canvasObj.style = `opacity:${state.hdr.exposure}`
        }
    }else{
        var canvasObj = document.querySelector('canvas')
        if(canvasObj){
            canvasObj.style = `opacity:${state.hdr.exposure}`
        }
    }
})



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("mousemove", (event: MouseEvent) => {
    const rect = DOMCanvas.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1; 
    // light.position.set(mouseX*3, mouseY, 2);    
    // canObjects.position.set(mouseX+13,-mouseY,0);
    if (!shouldAnimate) {
        shouldAnimate = true; // Enable animation
        smoothMouseAnim(); // Start the animation
    }
});

let shouldAnimate = false;
const smoothMouseAnim=()=>{

    if(!isNaN(canObjects.position.x)){
        tempX = canObjects.position.x;
        tempY = canObjects.position.y;
    }else{
        tempX=10;
        tempY=0;
    }

    distX = mouseX*2+10 - tempX;
    distY = mouseY*2 - tempY;
    // console.log((distX)/speed);
    // console.log(scene.rotation.y);
    canObjects.position.set(tempX+(distX*speed),tempY+(distY*speed),0);
    camera.position.set(-mouseX*3,-mouseY*3,70);
    scene.rotation.y=(tempX/5+10+(distX*speed)+(distX*speed));
    requestAnimationFrame(smoothMouseAnim);
}

const loop = () => {
    controls.update();
    stats.update(); 
    // renderer.render(scene, camera);
    // window.requestAnimationFrame(loop);
    requestAnimationFrame(loop);
    composer.render();
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
    position: fixed;
    /* display: block;  */
    /* position: absolute; */
    top: 0;
    right: 0; 
    z-index: 1;
    /* transition: all 1.5s ease-in-out;     */
}

</style>