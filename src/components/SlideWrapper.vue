<script setup lang="ts">
const props = defineProps({
    slideId:{required:true,type:Number},
    slideStyle:{required:true,type:String}
})
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