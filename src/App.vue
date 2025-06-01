<script setup lang="ts">
import { ref,watch,onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Pagination from './components/Pagination.vue';
import nextSlide from './components/NextSlide.vue';
import SlideWrapper from './components/SlideWrapper.vue';
import Slide1 from './components/Slide1.vue';
import Slide2 from './components/Slide2.vue';
import mainCanvas from './components/mainCanvas.vue';

import {useLoadStore} from './store/loadingStore'
import {storeToRefs} from 'pinia';

import {snap} from './animations/scrollSnapp';
import { letterTransition } from './animations/letterTransition';
import letterFloat from './animations/letterFloat';

const slidesArr=[Slide1,Slide2];
const {isLoaded,currentSlide,slides} = storeToRefs(useLoadStore());
const {setColInit} = useLoadStore();

// var slide=ref(1);

var scrollTimeout: ReturnType<typeof setTimeout>;
  

onMounted(()=>{
  // console.log(isLoaded.value);
  setColInit();
    const slideAction = document.querySelectorAll('.slideAction')
    if(slideAction){
    const letters = new letterFloat(slideAction as NodeListOf<HTMLElement>);
    // letters.loop();
  }
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

  letterTransition(currentSlide.value,'p');
  letterTransition(currentSlide.value,'h1');

})

watch(() => currentSlide.value, () => {
  console.warn("TRIGGER");
  letterTransition(currentSlide.value,'p');
  letterTransition(currentSlide.value,'h1');

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
