<script setup lang="ts">
import nextSlide from './nextSlide.vue';
import slide1Canvas from './slide1Canvas.vue';

</script>

<template>


<div class="slide">
    <nextSlide navText="Why" />
    <div class="slideAction">
        <h2>Not Just A Drink</h2>
        <h1>A M<p>oder</p>n M<p>ovemen</p>t.</h1>
        <div class="slideBtn">
            <a href="#">Fuel Up</a>
        </div>
    </div>
    <div class="slideCanvas">
        <!-- <img src="../../design/product1.jpg" alt=""> -->
         <slide1Canvas />
    </div>
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
    top:55%;
}


h1 p::after{
    background-color:var(--paletteWhite)
}

</style>