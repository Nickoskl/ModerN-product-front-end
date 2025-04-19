<script setup lang="ts">
import nextSlide from './NextSlide.vue';
// import slide1Canvas from './slide1Canvas.vue';
import lottie from 'lottie-web';
import { onMounted } from 'vue';
import type { AnimationItem } from 'lottie-web';

let anim: AnimationItem | null = null;
// Optionally, add a mouseenter event listener inside onMounted if needed:
onMounted(() => {
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
  });
  
  btn?.addEventListener('mouseleave', () => {
    anim?.setDirection(-1); // Reverse direction
    anim?.play();
  });
});
</script>

<template>


<div class="slide">
    <nextSlide navText="Why" />
    <div class="slideAction">
        <h2>Not Just A Drink</h2>
        <h1>A M<p>oder</p>n Movement.</h1>
        <div class="slideBtn">
            <div class="lottieAnim"></div>
            <a class="landingBtn" href="#">Fuel Up</a>
        </div>
    </div>
    <!-- <div class="slideCanvas">
         <slide1Canvas />
    </div> -->
</div>


</template>

<style scoped>

@import url(../assets/slideGlobals.css);

h1,h2,h6{
    color:var(--paletteWhite);
}

.slide{
    background-color: var(--paletteOrange);
}

.slideAction{
    top:50%;
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