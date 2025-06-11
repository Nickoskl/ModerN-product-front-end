<script setup lang="ts">
// import slide1Canvas from './slide1Canvas.vue';
import { useSlideStore } from '../store/slideStore';
import lottie from 'lottie-web';
import { onMounted } from 'vue';
import type { AnimationItem } from 'lottie-web';
import { storeToRefs } from 'pinia';

import { animate, Timeline } from 'animejs';
import { createTimeline, utils } from 'animejs';


const {gotoSlide} = useSlideStore()
const {currentSlide} = storeToRefs(useSlideStore())

let anim: AnimationItem | null = null;
let timeL:Timeline;

  

  function addClass(event: MouseEvent) {
  const target = event.target as HTMLElement;
    target.classList.add('box');
    target.setAttribute('data-before',target.innerHTML);
    target.addEventListener("animationend", () => {
    target.classList.remove('box');

})}

  

  const testBtn=(elm:HTMLElement)=>{

    timeL.restart();
    // timeL.play();

    console.warn("CLICKED");
  }

onMounted(() => {
    const [ $value ] = utils.$('.value');
    timeL = createTimeline({autoplay:false})
    .label('animate circle', 1000)
    .add('.slideAction h2', {
    translateX: [-100,0],
                opacity: [0,1],
                translate:[-100,0],
                onUpdate: self => $value.innerHTML = self.currentTime.toString(),
                delay:(el,i,total) => 150 *(10-i)},0);
    // const testAnim = animate('.slideAction',{
    //     rotate: [100,0],
    //     opacity: [0,1],
    //     duration: 3600,
    // })

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
        <h2 class="value"></h2>
        <h2>Not Just A Drink</h2>
        <h1>A M<p>oder</p>n Movement.</h1>
        <div class="slideBtn">
            <div class="lottieAnim"></div>
            <a @mouseenter="addClass" @click="(e) => testBtn(e.target as HTMLElement)" class="landingBtn">Fuel Up</a>
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


</style>