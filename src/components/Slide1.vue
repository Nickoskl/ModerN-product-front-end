<script setup lang="ts">
import nextSlide from './NextSlide.vue';
// import slide1Canvas from './slide1Canvas.vue';
import { useLoadStore } from '../store/loadingStore';
import lottie from 'lottie-web';
import { onMounted } from 'vue';
import type { AnimationItem } from 'lottie-web';
import { storeToRefs } from 'pinia';

const {gotoSlide} = useLoadStore()
const {currentSlide,slides} = storeToRefs(useLoadStore())

let anim: AnimationItem | null = null;

var mouseX:number,mouseY:number,deltaX:number,deltaY:number;
  const speed:number = 0.02;
  var shouldAnimate:boolean = true;

  function addClass(event: MouseEvent) {
  const target = event.target as HTMLElement;
    target.classList.add('box');
    target.setAttribute('data-before',target.innerHTML);
    target.addEventListener("animationend", () => {
    target.classList.remove('box');

})}

const letterAnim=()=>{
  const slideAction = document.querySelector('.slideAction')
  const style = window.getComputedStyle(slideAction as HTMLElement);
  const matrix = new WebKitCSSMatrix(style.transform);
  // const rect = (slideAction as HTMLElement).getBoundingClientRect();

    if(deltaX && deltaY){

      deltaX = (Math.ceil(mouseX*3) - (matrix.m41)-100);
      deltaY = (Math.ceil(-mouseY*3) - matrix.m42+200);


    }else{
      deltaX=1; 
      deltaY=1;
    }


    const slideActionLetter = document.querySelector('.slideAction h1')
    const landingBtn = document.querySelector('.slideBtn')

    if(Math.ceil(mouseX)>40){

      
      (slideActionLetter as HTMLElement).style.letterSpacing=`calc(var(--mainFontMediumLetterSpacing) + (${mouseX/13-3}px))`;
      (landingBtn as HTMLElement).style.transform=`translate(${mouseX}px,0)`
    }

    if(Math.abs(mouseY)>20){

      (slideActionLetter as HTMLElement).style.lineHeight=`${110+Math.abs(mouseY)/5-4}px`

    }

    
    (slideAction as HTMLElement).style.transform = `translate(
    ${(matrix.m41 + (deltaX * speed))}px, 
    calc(${Math.abs(matrix.m42 + (deltaY * speed))}px)
    )`;

  requestAnimationFrame(letterAnim);

  }

  

onMounted(() => {
  const slideAction = document.querySelector('.slideAction')
  const rect = (slideAction as HTMLElement).getBoundingClientRect();


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





  if(slideAction){
    
    window.addEventListener('mousemove',(event:MouseEvent)=>{
      // console.log(rect)
    mouseX = ((event.clientX - rect.left) / rect.width) * 30 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 30 + 1; 

    if(shouldAnimate){
      shouldAnimate=false;
      letterAnim()
    }

    })

  }
  

});
</script>

<template>


<div class="slide">
    <nextSlide :navText="slides[1].name" />
    <div class="slideAction">
        <h2>Not Just A Drink</h2>
        <h1>A M<p>oder</p>n Movement.</h1>
        <div class="slideBtn">
            <div class="lottieAnim"></div>
            <a @mouseenter="addClass" @click="gotoSlide(currentSlide-1)" class="landingBtn" href="#">Fuel Up</a>
        </div>
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

.slide{
    background-color: var(--paletteOrange);
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