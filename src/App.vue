<script setup lang="ts">
import { ref,watch,onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Pagination from './components/Pagination.vue';
import nextSlide from './components/NextSlide.vue';
import SlideWrapper from './components/SlideWrapper.vue';
import Slide1 from './components/Slide1.vue';
import Slide2 from './components/Slide2.vue';
import mainCanvas from './components/mainCanvas.vue';

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import { createTimeline } from 'animejs'
import {animate,utils,createTimer } from 'animejs';;

import {useLoadStore} from './store/loadingStore'
import {storeToRefs} from 'pinia';

import {snap} from './animations/scrollSnapp';

const slidesArr=[Slide1,Slide2];
const {isLoaded,currentSlide,slides} = storeToRefs(useLoadStore());
const {setColInit} = useLoadStore();

// var slide=ref(1);

var scrollTimeout: ReturnType<typeof setTimeout>;
  

onMounted(()=>{
  // console.log(isLoaded.value);
  setColInit();
  
  document.addEventListener('scroll', () => {

  clearTimeout(scrollTimeout);
    // active.value=true;
    

    // if(active.value){
      scrollTimeout= setTimeout(()=>{
      // console.log("SCROLLED TO ..........  "+window.scrollY)
      snap();

    },12)


    // }

  });

})

watch(() => currentSlide.value, () => {
  console.warn("TRIGGER");

//   animate('.slideAction p',{
//     scale: [
//     { to: 1.25, ease: 'inOut(3)', duration: 200 },
//     { to: 1, ease: createSpring({ stiffness: 300 }) }
//   ],
//   loop: true,
//   loopDelay: 250,
// });
const [ $timer01,$timer02,$timer03 ] = utils.$('.timer');

const timer1 = createTimer({
  duration: 500,
  // onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
});

const timeline = createTimeline()
.sync(timer1)

// .add({
//   onUpdate: self => $timer03.innerHTML = self.currentTime.toString(),
//   duration: 1000
// });

const text:Element|null = document.querySelector('.slideAction > p');


if(!text){
  return
}

const split = Splitting({ target: text, by: 'lines' });
console.log(split[0].lines)
if (text.textContent) {
  console.log(text.textContent?.split(/\r?\n/))
  // text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  var letters = document.querySelectorAll('letter'); 
}
const lines = split[0].lines;
// console.log(text);
// console.log(text.textContent);

if(!lines){
  return
}

var maxLineLen= 0;

lines.forEach((elm)=>maxLineLen = Math.max(elm.length,maxLineLen));

const marksAnim = document.querySelectorAll('.slideAction mark');

if(!marksAnim){return}

marksAnim.forEach((elm,i)=>{
  
  setTimeout(()=>{
      (elm as HTMLElement).style='clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);opacity:1;';
  },1550 )

})

lines.forEach((elm,i)=>{
  // var iter =i;
  console.log(elm);
  console.log(i+"----------")
  const circleAnimation = animate(elm, {
  translateX: [-100,0],
  opacity: [0,1],
  duration: 1600,
  onUpdate: self => $timer01.innerHTML = self.currentTime.toString(),
  delay: (el, i) => 150 * (((maxLineLen-elm.length)+1)*(elm.length-(i+1)+1.5))
});

// timeline.sync(circleAnimation)

})

});



// window.addEventListener('mousedown', (e) => {
//     if (e.button === 2) { 
//       e.preventDefault();
//     }
    
//   });

//   window.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//   });

</script>

<template>
  <Navbar :navPrimColor="(slides[currentSlide-1].primCol as string)" :navSecColor="(slides[currentSlide-1].seconCol as string)"/>
  <Pagination :slides="slides" :current="currentSlide" :navPrimColor="(slides[currentSlide-1].primCol as string)" :navSecColor="(slides[currentSlide-1].seconCol as string)"/>
  <nextSlide :navText="slides[currentSlide].name" :navColor="(slides[currentSlide-1].seconCol as string)"/>
  <mainCanvas />
    <SlideWrapper v-for="(slide,idx) in slidesArr" :key="idx" :slideStyle="(slides[idx].primCol as string)" :slideId="slides[idx].id">
      <component :is="slide" />
    </SlideWrapper>
  <div class="timer">
    TIMER
  </div>
  <!-- <Slide2 /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.timer{
  position: fixed;
  top:10%;
  left:10%;
}
</style>
