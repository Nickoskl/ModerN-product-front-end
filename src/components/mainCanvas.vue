<script setup lang="ts">
import * as THREE from 'three';
import { onMounted,watch } from 'vue';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { CSM } from 'three/addons/csm/CSM.js';

///////////// 3D COMPONENT IMPORT

import {threeLoad,camera,scene,slideTransition,shouldAnimate,animState} from '../3d/index';
import canObjects from '../3d/components/canModel'

///////////// Animation

import {animate } from 'animejs';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

///////////// Animation Store

import {useSlideStore} from '../store/slideStore';
import { storeToRefs } from 'pinia';




const {currentSlide} = storeToRefs(useSlideStore());





onMounted(async() => {
    await threeLoad();
    // console.log(canObjects.position);
    // console.log(camera.rotation);
    // console.log(camera.position);
    // console.log(scene.rotation.y);

});

watch(() => currentSlide.value ,()=>{
 slideTransition.value=true;


    if(currentSlide.value==2){


        const slide2Cans=new THREE.Group();
        const can2 = canObjects.clone(true);
        can2.children.forEach((obj)=>{
            if((obj as THREE.Mesh).isMesh&&(obj as THREE.Mesh).name=='polySurface1'){
                var newMat=new THREE.MeshStandardMaterial({color:'#f8eded',roughness:0});
                (obj as THREE.Mesh).material=newMat;
                // if (csm && typeof csm.setupMaterial === 'function') {
                //     csm.setupMaterial(newMat);
                //     }
            }
        })
        can2.position.set(0,-6.5,0);
        can2.rotation.z=Math.PI/2;
        can2.rotation.y=-Math.PI/2.6;
        console.log(can2);
        slide2Cans.add(can2);

        const can3=can2.clone(true);
        can3.children.forEach((obj)=>{
            if((obj as THREE.Mesh).isMesh&&(obj as THREE.Mesh).name=='polySurface1'){
                var newMat=new THREE.MeshStandardMaterial({color:'#f8eded',roughness:0,wireframe:true});
                (obj as THREE.Mesh).material=newMat;
            // if (csm && typeof csm.setupMaterial === 'function') {
            // csm.setupMaterial(newMat);
            // }
            }
        })
        can3.rotation.y=-Math.PI+Math.PI/4;
        can3.position.x=-10;
        can3.position.y=-2.2;
        can3.rotation.x=Math.PI/4;
        can2.rotation.y=Math.PI*2.6;
        slide2Cans.add(can3);

        slide2Cans.position.set(9,0,80)

        scene.add(slide2Cans);

        animate(animState.camera.position,{
            x:{to:-6.36,
            duration:1000,
            },
            y:{to:16.17,
            duration:1000,
            },
            z:{to:86.32,
            duration:1000,
            },
        // loop:true,
        // alternate: true,
        ease: 'inOut(1.675)',
        onUpdate:()=>{
            camera.position.x=animState.camera.position.x;
            camera.position.y=animState.camera.position.y;
            camera.position.z=animState.camera.position.z;
            // console.log(animState.camera.position.x,camera.position.x+"---------");
            // console.log(animState.camera.position.y,camera.position.y+"---------")
            // console.log(animState.camera.position.z,camera.position.z+"---------")
        },
        onComplete:()=>{slideTransition.value=false;shouldAnimate.value = true}
        })

        animate(camera.rotation,{
            x:{to:-0.289,
            duration:1000,
            },
            y:{to:-0.091,
            duration:1000,
            },
            z:{to:-0.027,
            duration:1000,
            },
        // loop:true,
        // alternate: true,
        ease: 'inOut(1.675)',
        onUpdate:()=>{
            // camera.position.x=animState.camera.position.x;
            // camera.position.y=animState.camera.position.y;
            // camera.position.z=animState.camera.position.z;
            // console.log(animState.camera.position.x,camera.position.x+"---------");
            // console.log(animState.camera.position.y,camera.position.y+"---------")
            // console.log(animState.camera.position.z,camera.position.z+"---------")
        },
        onComplete:()=>{slideTransition.value=false;shouldAnimate.value = true}
        })

        animate(canObjects.position,{
            x:{to:19,
            duration:1000,
            },
            y:{to:0,
            duration:1000,
            },
            z:{to:-80,
            duration:1000,
            },
        // loop:true,
        // alternate: true,
        ease: 'inOut(1.675)',
        onComplete:()=>{slideTransition.value=false;shouldAnimate.value = true}
        })

        animate(slide2Cans.position,{
            x:{to:15,
            duration:1000,
            },
            y:{to:0,
            duration:1000,
            },
            z:{to:0,
            duration:1000,
            },
        // loop:true,
        // alternate: true,
        ease: 'inOut(1.675)',
        onComplete:()=>{slideTransition.value=false;shouldAnimate.value = true}
        })
        
    }

})

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
    top: 0;
    right: 0; 
    z-index: 1;
    /* transition: all 1.5s ease-in-out;     */
}

</style>