<script setup lang="ts">
import nextSlide from './NextSlide.vue';
import { useLoadStore } from '../store/loadingStore';
import { storeToRefs } from 'pinia';


const {currentSlide,slides} = storeToRefs(useLoadStore())

</script>

<template>


<div class="slide">
    <nextSlide :navText="slides[2].name" navColor="--paletteOrange" />
    <div class="slideAction">
        <h1>@ M<p>oder</p>n</h1>
        <p class="test">we use eco-friendly materials and <mark> recyclable</mark> packaging with safe, <mark>sustainable</mark> inks. Our goal is simple: deliver powerful <mark>energy</mark> while reducing our impact on the planet.</p>
    </div>
    <div class="slideCanvas">
        <!-- <img src="../../design/product1.jpg" alt=""> -->
    </div>
</div>


</template>

<style scoped>

@import url(../assets/slideGlobals.css);

h1,h2,h6{
    color:var(--paletteOrange);
}



.slide{
    background-color: var(--paletteWhite);
}

mark{
    padding:0 5px;
    background-color: var(--paletteOrange);
    color: var(--paletteWhite);
    border-radius: 2px;
}

.test{
    font-family:Archivo;
    font-size: 24px;
    /* letter-spacing: 1px; */
    font-weight: 400;
    line-height: 25px;
    color: var(--paletteDark);
}

.slideAction{
    width: 40%;
    top:0;
}

h1 p::after{
    background-color:var(--paletteOrange)
}
</style>