<script setup lang="ts">
// import { letterTransition } from '../animations/letterTransition';
// import { useLoadStore } from '../store/loadingStore';
// import { storeToRefs } from 'pinia';
// import { onMounted } from 'vue';
const props = defineProps({
    slideId:{required:true,type:Number},
    slideStyle:{required:true,type:String}
})

// const {currentSlide}=storeToRefs(useLoadStore());

// onMounted(()=>{
    

//     letterTransition(currentSlide.value,'p');
//     letterTransition(currentSlide.value,'h1');
//     letterTransition(currentSlide.value,'h2');

// })

</script>

<template>


<div :id="`${props.slideId}`" :style="'background-color:'+props.slideStyle" class="slide">

    <slot>

    </slot>

</div>


</template>

<style scoped>

@import url(../assets/slideGlobals.css);

.slide{
    transition: all 2s ease-out;
}


</style>