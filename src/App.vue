<script setup lang="ts">
import { ref } from 'vue';
import {useLoadStore} from './store/loadingStore'
import {storeToRefs} from 'pinia';

import Navbar from './components/Navbar.vue';
import Pagination from './components/Pagination.vue';
import Slide1 from './components/Slide1.vue';
import Slide2 from './components/Slide2.vue';
import mainCanvas from './components/mainCanvas.vue';
import { onMounted } from 'vue';

const {isLoaded,currentSlide,slides} = storeToRefs(useLoadStore());
const {gotoSlide} = useLoadStore();

var slide=ref(1);
var active=ref(false);
var scrollTimeout: ReturnType<typeof setTimeout>;
  

onMounted(()=>{
  console.log(isLoaded.value);
})

const snap=()=>{
  // active.value=false;
  const speed = 0.2;
  // var tempCurrentSlide = currentSlide.value;

  if(window.scrollY>(window.innerHeight*(currentSlide.value-1))){
  active.value=false;
  var tempCurrentSlide = currentSlide.value;
  gotoSlide(currentSlide.value+1);
    
    const animDown=()=>{
      
          let target = (window.innerHeight * tempCurrentSlide);
          let current = window.scrollY;
          let distance = target - current;
          let step = distance * speed / 2; 

          console.log(target)
          console.log(current+"+"+step)
          console.log(active.value)

              if (Math.abs(distance) < 1) {
                window.scrollTo({ top: target, left: 0 });
                active.value=true;
                return;
              }

          window.scrollTo({
            top:current+step+1
          })
          
          requestAnimationFrame(animDown)
        }
    animDown();
    


  console.log("DOWNNNNNNNNNNNNNNNNNNNNNNNNN   "+currentSlide.value)
  }else if(window.scrollY<(window.innerHeight*(currentSlide.value-1))){
    active.value=false;
    var tempCurrentSlide = currentSlide.value;
    gotoSlide(currentSlide.value-1);
    
    const animUp=()=>{
      
          let target = (window.innerHeight * (tempCurrentSlide-2));
          let current = window.scrollY;
          let distance = current - target;
          let step = distance * speed / 2; 

          console.log(target)
          console.log(current+"+"+step)
          console.log(active.value)

              if (Math.abs(distance) < 1) {
                window.scrollTo({ top: target, left: 0 });
                active.value=true;
                return;
              }

          window.scrollTo({
            top:current-step-1
          })
          
          requestAnimationFrame(animUp)
        }
    animUp();
    

    console.log("UPPPPPPPPPPPPPPPPPPPPPPPPPPP   "+currentSlide.value)
  }else if(window.scrollY%window.innerHeight==0){
        // active.value=true;
    console.info("STOPPED   "+currentSlide.value)
    console.log(active.value)
  }else{
    console.warn("EXEPTIONN   "+currentSlide.value)
    console.log(active.value)
  }

}

document.addEventListener('scroll', () => {

// console.log(window.innerHeight);
// console.log(`Scroll position Y: ${scrollY}`);
clearTimeout(scrollTimeout);
  active.value=true;
  

  if(active.value){
    // clearTimeout(scrollTimeout);
    // active.value=true;
    scrollTimeout= setTimeout(()=>{
    console.log("SCROLLED TO ..........  "+window.scrollY)
    snap();

  },12)


  }

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
  <Navbar />
  <Pagination :slides="slides" :current="currentSlide" />
  <mainCanvas />
  <Slide1 />
  <Slide2 />
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
