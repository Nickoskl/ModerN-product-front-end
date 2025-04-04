<script setup lang="ts">

const props = defineProps({
  navText: {
    type: String,
    required: true,
  },
  navColor: {
    type: String,
    default: '--paletteWhite',
  },
})

</script>
<template>

<div class="nextSlide">
        <img :class="navColor=='--paletteOrange'?'svgOrange':''" src="../assets/graphics/arrow-down.svg" alt="">
        <h6 :style="{ color: 'var('+navColor+')' }">{{ props.navText }}</h6>
    </div>

</template>

<style scoped>

@import url(../assets/slideGlobals.css);


</style>