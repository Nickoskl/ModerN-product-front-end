<script setup lang="ts">

const props = defineProps({
  navText: {
    type: String,
    required: true,
  },
  navColor: {
    type: String,
    default: '#f8eded',
  },
})

</script>
<template>

<div class="nextSlide">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 583.33"><defs></defs><title>arrow-down</title><path :style="{fill:props.navColor ,stroke:props.navColor}" class="cls-1" d="M400,666.67l200-200m-200,200-200-200m200,200v-350m0-183.34v83.34" transform="translate(-175 -108.33)"/></svg>
        <h6 :style="{ color: navColor }">{{ props.navText }}</h6>
    </div>

</template>

<style scoped>

@import url(../assets/slideGlobals.css);

.cls-1{
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:50px;
  transition: all .6s ease-in-out;
  }
</style>