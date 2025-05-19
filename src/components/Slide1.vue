<script setup lang="ts">
// import slide1Canvas from './slide1Canvas.vue';
import { useLoadStore } from '../store/loadingStore';
import lottie from 'lottie-web';
import { onMounted } from 'vue';
import type { AnimationItem } from 'lottie-web';
import { storeToRefs } from 'pinia';

import letterFloat from '../animations/letterFloat';
const {gotoSlide} = useLoadStore()
const {currentSlide} = storeToRefs(useLoadStore())

let anim: AnimationItem | null = null;

  

  function addClass(event: MouseEvent) {
  const target = event.target as HTMLElement;
    target.classList.add('box');
    target.setAttribute('data-before',target.innerHTML);
    target.addEventListener("animationend", () => {
    target.classList.remove('box');

})}

  

onMounted(() => {


  const slideAction = document.querySelectorAll('.slideAction')
  if(slideAction){
    const letters = new letterFloat(slideAction as NodeListOf<HTMLElement>);
    // letters.loop();
  }


  const container = document.querySelector('.lottieAnim');
  if (container) {
    anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/lottie/mainActionBtn.json'
    });
  }
  const btn = document.querySelector('.landingBtn');
  btn?.addEventListener('mouseenter', () => {
    anim?.setDirection(1); // Forward direction
    anim?.play();
    console.log('Total frames:', anim?.totalFrames);
  });
  
  btn?.addEventListener('mouseleave', () => {
    anim?.setDirection(-1); // Reverse direction
    anim?.play();
  });






  

});
</script>

<template>


    <div class="slideAction">
        <h2>Not Just A Drink</h2>
        <h1>A M<p>oder</p>n Movement.</h1>
        <div class="slideBtn">
            <div class="lottieAnim"></div>
            <a @mouseenter="addClass" @click="gotoSlide(currentSlide-1)" class="landingBtn" href="#">Fuel Up</a>
        </div>
    </div>


</template>

<style scoped>

@import url(../assets/slideGlobals.css);

@keyframes lineIn{
    0%{
        /* left: 0;
        width:0%; */
        clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
        animation-timing-function: ease-in-out;
    }
    50%{
        animation-timing-function: none;
        /* right: 0;
        width: 100%; */
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
    100%{
        animation-timing-function: ease-in-out;
        /* right: 0;
        width:0%; */
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);

    }
}

h1,h2,h6{
    color:var(--paletteWhite);
}


.slideAction{
    top:0;
}
/* 
.slideBtn::before{
    background-color: var(--paletteWhite);
    border-radius: 3px;
    content: '';
    width: 500px;
    height:5px;
    position: absolute;
    top:50%;
    left:-30dvw;
    z-index: -1;
} */

.lottieAnim{
    position: absolute;
    top:55%;
    left:-650px;
    width:400%;
    transform: translate(0,-50%);
}
h1 p::after{
    background-color:var(--paletteWhite)
}

.landingBtn{
  overflow: hidden;
}


</style>