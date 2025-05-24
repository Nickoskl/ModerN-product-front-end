import { ref } from 'vue';

import * as THREE from 'three';
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { CSM } from 'three/addons/csm/CSM.js';

import {stats, sizes,gui,state} from '../3d/components/debugTools'
import canObjects from '../3d/components/canModel'

export var camera:THREE.PerspectiveCamera;
export const scene = new THREE.Scene();
export var shouldAnimate = ref(true);
export var floor:THREE.Mesh;
export var csm:CSM;
export var slideTransition=ref(false);

export const animState = {
    camera:{
        position:{
            x:0,
            y:0,
            z:70,
        }
    }
};



export const threeLoad=async()=>{

//////////////////////////////////////////////SCENE INIT

var loader:RGBELoader, mouseX:number, mouseY:number,distX:number,distY:number;
var tempX:number = canObjects.position.x;
var tempY:number = canObjects.position.y;
var speed:number =0.02;



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


camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.01, 1000);
camera.position.z=70;
scene.add(camera);

// Add a reactive object for light direction
const lightDirectionParams = {
    x: -0.9,
    y: -1,
    z: 0.6
};

// var csm = new CSM( {
//     maxFar: 200,
//     cascades: 4,
//     mode: 'logarithmic',
//     parent: scene,
//     shadowMapSize: 2048,
//     lightDirection: new THREE.Vector3(lightDirectionParams.x, lightDirectionParams.y, lightDirectionParams.z).normalize(),
//     camera: camera,
// } );

//                 csm.fade=true;
//                 csm.lightIntensity=1;

//                 gui.add(csm, 'lightIntensity', 0, 1, 0.01).onChange((value) => {
//                     csm.lights.forEach(light => {
//                         light.intensity = value;
//                     });
//                     });

//                 // var csmHelper = new CSMHelper( csm );
// 				// csmHelper.visible = true;
// 				// scene.add( csmHelper );


// // GUI for light direction
// (['x', 'y', 'z'] as const).forEach(axis => {
//     gui.add(lightDirectionParams, axis, -2, 2, 0.01).onChange(() => {
//         csm.lightDirection.set(
//             lightDirectionParams.x,
//             lightDirectionParams.y,
//             lightDirectionParams.z
//         ).normalize();
//         csm.updateFrustums(); // update CSM with new direction
//     });
// });

                const groundMaterial = new THREE.ShadowMaterial( { color: '#222222',opacity:0.7} );

				const ground = new THREE.Mesh( new THREE.PlaneGeometry( 200, 200, 8, 8 ), groundMaterial );
                ground.position.y=-10.8;
				ground.rotation.x = - Math.PI / 2;
				ground.receiveShadow = true;
                // csm.setupMaterial( groundMaterial );
				scene.add( ground );


// const light = new THREE.PointLight(0xf8eded, 1000);
// light.position.set(50, 55, 0);
// light.lookAt(new THREE.Vector3(0,0,0))
// light.castShadow = false;
// light.shadow.bias = -0.001;
// light.shadow.mapSize.width = 2048;
// light.shadow.mapSize.height = 2048;
// scene.add(light);

// const helll = new THREE.PointLightHelper(light)
// scene.add(helll)




const axisH = new THREE.AxesHelper(15);
scene.add(axisH);
canObjects.add(axisH);
// const gridHelper = new THREE.GridHelper(50, 50); // Size and divisions
// scene.add(gridHelper);


canObjects.position.set(10,0,0);
canObjects.rotation.y=Math.PI/2.3;
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




// const lightPH = new THREE.PointLightHelper(light)
// scene.add(lightPH)

// const transformControls = new TransformControls(camera, renderer.domElement);
// transformControls.attach(light);
// scene.add(transformControls);

// // Optional: Disable OrbitControls while using TransformControls
// transformControls.addEventListener('dragging-changed', function (event) {
//   controls.enabled = !event.value;
// });


const controls = new OrbitControls(camera,DOMCanvas);
controls.enableDamping=true;
// controls.enablePan=false;
// controls.enableZoom=false;
// controls.enableRotate=false;


const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;



////IMAGE BLENDING SHADER


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
    // if(state.hdr.exposure>0){
    //     var canvasObj = document.querySelector('canvas');
    //     if(canvasObj){
    //         canvasObj.style = `opacity:${state.hdr.exposure}`;
    //     }
    // }else{
    //     var canvasObj = document.querySelector('canvas');
    //     if(canvasObj){
    //         canvasObj.style = `opacity:${state.hdr.exposure}`;
    //     }
    // }
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

    if (shouldAnimate) {
        shouldAnimate.value = false;
        smoothMouseAnim();
    }
});


const smoothMouseAnim=()=>{
    if(slideTransition.value){return}
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
    // canObjects.position.set(tempX+(distX*speed),tempY+(distY*speed),0);
    camera.position.set(-animState.camera.position.y-mouseX*3,animState.camera.position.y-mouseY*3,animState.camera.position.z);
    scene.rotation.y=(tempX/5+10+(distX*speed)+(distX*speed));
    requestAnimationFrame(smoothMouseAnim);
}

const loop = () => {
    controls.update();
    // csm.update();
    stats.update(); 
    // console.log(camera.position)
    // console.log(camera.rotation)
    // renderer.render(scene, camera);
    requestAnimationFrame(loop);
    composer.render();
};
loop();
      
}