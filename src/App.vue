<script setup lang="ts">
import { ref } from 'vue';
import {useLoadStore} from './store/loadingStore'
import {storeToRefs} from 'pinia';

import Navbar from './components/Navbar.vue';
import Pagination from './components/Pagination.vue';
import Slide1 from './components/Slide1.vue';
import Slide2 from './components/Slide2.vue';
import slide1Canvas from './components/mainCanvas.vue';
import { onMounted } from 'vue';

const {isLoaded,currentSlide} = storeToRefs(useLoadStore());

var slide=ref(1);
var active=ref(false);
var scrollTimeout: ReturnType<typeof setTimeout>;
  

onMounted(()=>{
  console.log(isLoaded.value);
})

const anim = async()=>{

  const speed:number=0.1;
  const scrollY = window.scrollY || window.pageYOffset;
  const delta = window.scrollY-(window.scrollY*speed);

  console.log(active.value)
    console.log(window.scrollY*speed)
    console.log(window.scrollY)
    console.log(window.pageYOffset)
    console.log("-----------------------")
  if(window.scrollY<window.innerHeight*0.3){

    if(active.value&&window.scrollY!=0){

      window.scrollTo({
      top: delta,
      left: 0,
      behavior: "instant",
    });

      requestAnimationFrame(anim);
    }else{
      active.value=false;
    }

    

  }else if(window.innerHeight-(scrollY/(slide.value-1))>Math.ceil(window.innerHeight*0.3)){

  }else if(window.innerHeight-(scrollY/(slide.value-1))<Math.ceil(window.innerHeight*0.3)){



  }else{
    console.warn("exeption...............")
  }
  

}

document.addEventListener('scroll', () => {

// console.log(window.innerHeight);
// console.log(`Scroll position Y: ${scrollY}`);

  active.value=true;
  clearTimeout(scrollTimeout);

  if(active.value){
    scrollTimeout= setTimeout(()=>{
    console.log("SCROLLED TO ..........  "+window.scrollY)
    anim();
  },12)


  }

});

</script>

<template>
  <Navbar />
  <Pagination :num="3" :current="currentSlide" />
  <slide1Canvas />
  <Slide1 />
  <Slide2 />
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
</style>
