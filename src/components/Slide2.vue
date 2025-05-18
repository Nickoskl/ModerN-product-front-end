<script setup lang="ts">
import { watch } from 'vue';
import { useLoadStore } from '../store/loadingStore';
import { storeToRefs } from 'pinia';


// const {currentSlide,slides} = storeToRefs(useLoadStore())

const {currentSlide}=storeToRefs(useLoadStore());

watch(()=>currentSlide.value,()=>{
    if(currentSlide.value==2){
        
        
    }
})

</script>

<template>


<div class="slide">
    <div class="slideAction">
        <h1>@ M<p>oder</p>n</h1>
        <p data-splitting="lines" class="test">We use eco-friendly materials and <mark> recyclable</mark> packaging with safe, <mark>sustainable</mark> inks. Our goal is simple: deliver powerful <mark>energy</mark> while reducing our impact on the planet.</p>
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
    --temp:50%;
    transition: all 2s ease-out;
}

mark{
    padding:0 5px;
    background-color: var(--paletteOrange);
    color: var(--paletteWhite);
    border-radius: 2px;
    transition: all 2s ease-out;
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    opacity: 0;
}

.slideAction{
    width: 40%;
    top:0;
    font-family:Archivo;
    font-size: 24px;
    /* letter-spacing: 1px; */
    font-weight: 400;
    line-height: 25px;
    color: var(--paletteDark);
}


h1 p::after{
    background-color:var(--paletteOrange)
}
</style>